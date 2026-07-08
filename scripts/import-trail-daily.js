const fs = require("fs");
const path = require("path");

const today = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/New_York",
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
}).format(new Date());

const manifestPath = path.resolve(__dirname, "..", "work", "daily", "display_case_dates.json");

console.log(`Trail import check started for ${today}.`);

if (!process.env.TRAIL_IMPORT_SOURCE_URL && !process.env.TRAIL_API_TOKEN) {
  console.log("No Trail import source is configured yet.");
  console.log("Set TRAIL_IMPORT_SOURCE_URL or TRAIL_API_TOKEN after a supported Trail export/API flow is available.");
  process.exit(0);
}

if (!fs.existsSync(manifestPath)) {
  console.log(`Date manifest not found at ${manifestPath}.`);
  process.exit(1);
}

console.log("Trail import credentials/source detected, but importer implementation is not connected yet.");
console.log("Current manifest remains unchanged:", manifestPath);
