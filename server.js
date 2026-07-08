const crypto = require("crypto");
const fs = require("fs");
const http = require("http");
const path = require("path");

const PORT = Number(process.env.PORT || 8787);
const ROOT = __dirname;
const SESSION_COOKIE = "photoComplianceSession";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12;
const sessions = new Map();

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8"
};

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);

    if (url.pathname.startsWith("/api/")) {
      await handleApi(req, res, url);
      return;
    }

    if (url.pathname.startsWith("/work/") && !getSession(req)) {
      sendJson(res, 401, { error: "Authentication required" });
      return;
    }

    serveStatic(req, res, url.pathname);
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { error: "Server error" });
  }
});

server.listen(PORT, () => {
  console.log(`Photo Compliance app listening on port ${PORT}`);
});

async function handleApi(req, res, url) {
  if (req.method === "GET" && url.pathname === "/api/health") {
    sendJson(res, 200, { ok: true });
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/session") {
    const session = getSession(req);
    sendJson(res, 200, session
      ? { authenticated: true, email: session.email, signedInAt: session.signedInAt }
      : { authenticated: false, configured: configuredUsers().length > 0 });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/login") {
    const users = configuredUsers();
    if (!users.length) {
      sendJson(res, 503, { authenticated: false, configured: false });
      return;
    }

    const body = await readJsonBody(req);
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    const user = users.find((entry) => entry.email.toLowerCase() === email && safeEqual(entry.password, password));

    if (!user) {
      sendJson(res, 401, { authenticated: false });
      return;
    }

    const token = crypto.randomBytes(32).toString("hex");
    const signedInAt = new Date().toISOString();
    sessions.set(token, { email: user.email, signedInAt, expiresAt: Date.now() + SESSION_TTL_MS });
    res.setHeader("Set-Cookie", cookieHeader(token));
    sendJson(res, 200, { authenticated: true, email: user.email, signedInAt });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/logout") {
    const token = parseCookies(req)[SESSION_COOKIE];
    if (token) sessions.delete(token);
    res.setHeader("Set-Cookie", `${SESSION_COOKIE}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`);
    sendJson(res, 200, { ok: true });
    return;
  }

  sendJson(res, 404, { error: "Not found" });
}

function configuredUsers() {
  const json = process.env.APP_USERS_JSON;
  if (json) {
    try {
      const parsed = JSON.parse(json);
      if (Array.isArray(parsed)) return normalizeUsers(parsed);
    } catch (error) {
      console.error("APP_USERS_JSON is not valid JSON.");
    }
  }

  const compact = process.env.APP_USERS;
  if (compact) {
    return normalizeUsers(compact.split(",").map((entry) => {
      const [email, ...passwordParts] = entry.split(":");
      return { email, password: passwordParts.join(":") };
    }));
  }

  return normalizeUsers([
    { email: process.env.APP_USER_1_EMAIL, password: process.env.APP_USER_1_PASSWORD },
    { email: process.env.APP_USER_2_EMAIL, password: process.env.APP_USER_2_PASSWORD }
  ]);
}

function normalizeUsers(users) {
  return users
    .map((user) => ({
      email: String(user.email || "").trim(),
      password: String(user.password || "")
    }))
    .filter((user) => user.email && user.password);
}

function getSession(req) {
  pruneSessions();
  const token = parseCookies(req)[SESSION_COOKIE];
  if (!token) return null;
  const session = sessions.get(token);
  if (!session || session.expiresAt < Date.now()) {
    sessions.delete(token);
    return null;
  }
  session.expiresAt = Date.now() + SESSION_TTL_MS;
  return session;
}

function parseCookies(req) {
  return String(req.headers.cookie || "")
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .reduce((cookies, part) => {
      const index = part.indexOf("=");
      if (index === -1) return cookies;
      cookies[decodeURIComponent(part.slice(0, index))] = decodeURIComponent(part.slice(index + 1));
      return cookies;
    }, {});
}

function cookieHeader(token) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${SESSION_COOKIE}=${encodeURIComponent(token)}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${Math.floor(SESSION_TTL_MS / 1000)}${secure}`;
}

function pruneSessions() {
  const now = Date.now();
  for (const [token, session] of sessions.entries()) {
    if (session.expiresAt < now) sessions.delete(token);
  }
}

function safeEqual(a, b) {
  const first = Buffer.from(String(a));
  const second = Buffer.from(String(b));
  return first.length === second.length && crypto.timingSafeEqual(first, second);
}

function readJsonBody(req) {
  return new Promise((resolve) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 20_000) req.destroy();
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve({});
      }
    });
    req.on("error", () => resolve({}));
  });
}

function serveStatic(req, res, pathname) {
  let relativePath = decodeURIComponent(pathname);
  if (relativePath === "/") relativePath = "/index.html";
  if (relativePath.endsWith("/")) relativePath += "index.html";

  const filePath = path.resolve(ROOT, `.${relativePath}`);
  if (!filePath.startsWith(ROOT)) {
    sendJson(res, 403, { error: "Forbidden" });
    return;
  }

  fs.stat(filePath, (statError, stats) => {
    if (statError || !stats.isFile()) {
      sendJson(res, 404, { error: "Not found" });
      return;
    }

    const type = MIME_TYPES[path.extname(filePath).toLowerCase()] || "application/octet-stream";
    res.writeHead(200, {
      "Content-Type": type,
      "Cache-Control": type.includes("html") ? "no-store" : "public, max-age=300"
    });
    fs.createReadStream(filePath).pipe(res);
  });
}

function sendJson(res, status, body) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(body));
}
