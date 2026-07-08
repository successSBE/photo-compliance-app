const DATA_URL = "../work/display_case_photo_rows.json";
const DATA_MANIFEST_URL = "../work/daily/display_case_dates.json";
const PRECOMPUTED_REVIEWS_URL = "../work/precomputed_reviews.json";
const SESSION_KEY = "photoComplianceSession";
const REVIEW_KEY = "photoComplianceReviews";
const REFERENCE_KEY = "photoComplianceReferences";
const BUILT_IN_SELECTION_KEY = "photoComplianceBuiltInSelection";
const TRAIL_CONNECTION_KEY = "photoComplianceTrailConnection";
const LOCATION_EMAILS_KEY = "photoComplianceLocationEmails";
const FRUIT_SIZE_KEY = "photoComplianceFruitSizes";
const TRAIL_BASE_URL = "https://us.trailapp.com";
const LOCAL_DEV_HOSTS = new Set(["localhost", "127.0.0.1", ""]);
const BUILT_IN_REFERENCES = {
  display: [
    {
      id: "display-4ft-fruit",
      name: "4ft Fruit Case",
      src: "assets/display-case-4ft-fruit-100-compliant.jpeg",
      photoSrc: "assets/display-case-4ft-fruit-100-compliant-photo-backup.jpeg",
      label: "Built-in 100% compliant 4ft Fruit Case reference"
    },
    {
      id: "display-4ft-vegetable",
      name: "4ft Vegetable Case",
      src: "assets/display-case-4ft-vegetable-100-compliant.jpeg",
      photoSrc: "assets/display-case-4ft-vegetable-100-compliant-photo-backup.jpeg",
      label: "Built-in 100% compliant 4ft Vegetable Case reference"
    },
    {
      id: "display-6ft-fruit",
      name: "6ft Fruit Case",
      src: "assets/display-case-6ft-fruit-100-compliant.jpeg",
      photoSrc: "assets/display-case-6ft-fruit-100-compliant-photo-backup.jpeg",
      label: "Built-in 100% compliant 6ft Fruit Case reference"
    },
    {
      id: "display-8ft-fruit",
      name: "8ft Fruit Case",
      src: "assets/display-case-8ft-fruit-100-compliant.jpeg",
      photoSrc: "assets/display-case-8ft-fruit-100-compliant-photo-backup.jpeg",
      label: "Built-in 100% compliant 8ft Fruit Case reference"
    }
  ],
  bunker: [
    {
      id: "destination-bunker",
      name: "Destination Bunker",
      src: "assets/destination-bunker-100-compliant.jpeg",
      label: "Built-in 100% compliant Destination Bunker reference"
    }
  ]
};
const ITEMS = [
  "Correct display case",
  "Clean glass and shelving",
  "Product is faced and organized",
  "Tags and pricing are visible",
  "No visible out of stocks",
  "No clutter or misplaced items"
];
const IMAGE_FEATURE_CACHE = new Map();
const MISSING_ITEM_DEDUCTION = 10;
const PLANOGRAM_ITEM_DEDUCTION = 1;
const PLANOGRAMS = {
  "display-4ft-fruit": {
    title: "4ft Fruit Planogram",
    shelves: [
      {
        shelf: 6,
        items: [
          "Fresh Cut Strawberry & Whipped Topping",
          "Fresh Cut Pineapple, Strawberry & Kiwi",
          "Fresh Cut Mandarin, Strawberry & Kiwi",
          "Fresh Cut Strawberry, Grape & Mandarin",
          "Fresh Cut Grapes, Cheese & Pretzels",
          "Fresh Cut Strawberry, Cheese & Grape",
          "Fresh Cut Charcuterie Mix",
          "Fresh Cut Mango & Papaya",
          "Fresh Cut Whip Topping"
        ]
      },
      {
        shelf: 5,
        items: [
          "Fresh Cut Pineapple Cup",
          "Fresh Cut Watermelon Cup",
          "Fresh Cut Mixed Melon Cup",
          "Fresh Cut Cantaloupe Cup",
          "Fresh Cut Mixed Berries Cup",
          "Fresh Cut Strawberry Cup",
          "Fresh Cut Pineapple, Kiwi & Papaya",
          "Fresh Cut Watermelon Spears",
          "Fresh Cut Pineapple Spears"
        ]
      },
      {
        shelf: 4,
        items: [
          "Fresh Cut Watermelon Bowl",
          "Fresh Cut Mixed Melon Bowl",
          "Fresh Cut Mixed Melon w/ Grapes",
          "Fresh Cut Mango Bowl",
          "Fresh Cut Mandarin Bowl",
          "Fresh Cut Rainbow Mix Bowl",
          "Fresh Cut Mixed Fruit w/ Berry Bowl"
        ]
      },
      {
        shelf: 3,
        items: [
          "Fresh Cut Cantaloupe Bowl",
          "Fresh Cut Honeydew Bowl",
          "Fresh Cut Mixed Grape Bowl",
          "Fresh Cut Pineapple Bowl",
          "Fresh Cut Pineapple/Strawberry/Kiwi Bowl",
          "Fresh Cut Tropical Fruit Mix Bowl",
          "Fresh Cut Mixed Berries"
        ]
      },
      {
        shelf: 2,
        items: [
          "Fresh Cut Watermelon",
          "Fresh Cut Mixed Melon",
          "Fresh Cut Cantaloupe",
          "Fresh Cut Pineapple",
          "Fresh Cut Strawberry/Pineapple/Blueberry"
        ]
      },
      {
        shelf: 1,
        items: [
          "Fresh Cut Watermelon Slices",
          "Fresh Cut Watermelon Quarters",
          "Fresh Cut Mixed Fruit",
          "Fresh Cut Small Party Tray",
          "Fresh Cut Large Tray"
        ]
      }
    ]
  },
  "display-8ft-fruit": {
    title: "8ft Fruit Planogram",
    shelves: [
      {
        shelf: 6,
        items: [
          "Fresh Cut Strawberry & Whipped Topping x2",
          "Fresh Cut Pineapple, Strawberry & Kiwi x2",
          "Fresh Cut Mandarin, Strawberry & Kiwi x2",
          "Fresh Cut Strawberry, Grape & Mandarin x2",
          "Fresh Cut Grapes, Cheese & Pretzels",
          "Fresh Cut Strawberry, Cheese & Grape",
          "Fresh Cut Charcuterie Mix",
          "Fresh Cut Mango & Papaya",
          "Fresh Cut Parfait Strawberry",
          "Fresh Cut Parfait Blueberry",
          "Fresh Cut Parfait Mixed Berry",
          "Fresh Cut Whip Topping x2"
        ]
      },
      {
        shelf: 5,
        items: [
          "Fresh Cut Watermelon Cup x2",
          "Fresh Cut Mixed Melon Cup x2",
          "Fresh Cut Cantaloupe Cup",
          "Fresh Cut Pineapple Cup x2",
          "Fresh Cut Tropical Fruit Cup",
          "Fresh Cut Mixed Berries Cup x2",
          "Fresh Cut Berry/Kiwi Cup",
          "Fresh Cut Dragon Fruit/Kiwi Cup",
          "Fresh Cut Strawberry Cup x2",
          "Fresh Cut Pineapple, Kiwi & Papaya",
          "Fresh Cut Watermelon Spears x2",
          "Fresh Cut Pineapple Spears x2"
        ]
      },
      {
        shelf: 4,
        items: [
          "Fresh Cut Watermelon Bowl x2",
          "Fresh Cut Mixed Melon Bowl x2",
          "Fresh Cut Cantaloupe Bowl x2",
          "Fresh Cut Pineapple Bowl",
          "Fresh Cut Mandarin Bowl",
          "Fresh Cut Mixed Grape Bowl",
          "Fresh Cut Mango Bowl",
          "Fresh Cut Mixed Berries",
          "Fresh Cut Honeydew Bowl",
          "Fresh Cut Mixed Fruit w/ Berry Bowl",
          "Fresh Cut Rainbow Mix Bowl"
        ]
      },
      {
        shelf: 3,
        items: [
          "Fresh Cut Watermelon Bowl x2",
          "Fresh Cut Mixed Melon Bowl x2",
          "Fresh Cut Cantaloupe Bowl x2",
          "Fresh Cut Pineapple Bowl",
          "Fresh Cut Mandarin Bowl",
          "Fresh Cut Mixed Grape Bowl",
          "Fresh Cut Mango Bowl",
          "Fresh Cut Mixed Berries",
          "Fresh Cut Mixed Melon w/ Grapes",
          "Fresh Cut Pineapple/Strawberry/Kiwi Bowl",
          "Fresh Cut Tropical Fruit Mix Bowl"
        ]
      },
      {
        shelf: 2,
        items: [
          "Fresh Cut Watermelon 60oz x2",
          "Fresh Cut Watermelon x2",
          "Fresh Cut Mixed Melon",
          "Fresh Cut Cantaloupe",
          "Fresh Cut Pineapple",
          "Fresh Cut Strawberry/Pineapple/Blueberry",
          "Fresh Cut Mixed Fruit w/ Berries",
          "Fresh Cut Mixed Berries"
        ]
      },
      {
        shelf: 1,
        items: [
          "Fresh Cut Watermelon Slices x4",
          "Fresh Cut Watermelon Quarters",
          "Fresh Cut Mixed Fruit x2",
          "Fresh Cut Small Party Tray",
          "Fresh Cut Large Tray",
          "Fresh Cut Large Tray w/ Dip"
        ]
      }
    ]
  },
  "display-6ft-fruit": {
    title: "6ft Fruit Planogram",
    shelves: [
      {
        shelf: 6,
        items: [
          "Fresh Cut Strawberry & Whipped Topping",
          "Fresh Cut Pineapple, Strawberry & Kiwi",
          "Fresh Cut Mandarin, Strawberry & Kiwi",
          "Fresh Cut Strawberry, Grape & Mandarin",
          "Fresh Cut Grapes, Cheese & Pretzels",
          "Fresh Cut Strawberry, Cheese & Grape",
          "Fresh Cut Charcuterie Mix",
          "Fresh Cut Mango & Papaya",
          "Fresh Cut Parfait Strawberry",
          "Fresh Cut Parfait Blueberry",
          "Fresh Cut Parfait Mixed Berry",
          "Fresh Cut Whip Topping x2"
        ]
      },
      {
        shelf: 5,
        items: [
          "Fresh Cut Watermelon Cup x2",
          "Fresh Cut Mixed Melon Cup x2",
          "Fresh Cut Cantaloupe Cup",
          "Fresh Cut Pineapple Cup",
          "Fresh Cut Mixed Berries Cup",
          "Fresh Cut Berry/Kiwi Cup",
          "Fresh Cut Dragon Fruit/Kiwi Cup",
          "Fresh Cut Strawberry Cup",
          "Fresh Cut Pineapple, Kiwi & Papaya",
          "Fresh Cut Watermelon Spears x2",
          "Fresh Cut Pineapple Spears"
        ]
      },
      {
        shelf: 4,
        items: [
          "Fresh Cut Watermelon Bowl x2",
          "Fresh Cut Mixed Melon Bowl x2",
          "Fresh Cut Mixed Grape Bowl",
          "Fresh Cut Pineapple Bowl",
          "Fresh Cut Honeydew Bowl",
          "Fresh Cut Mandarin Bowl",
          "Fresh Cut Rainbow Mix Bowl",
          "Fresh Cut Mixed Berries"
        ]
      },
      {
        shelf: 3,
        items: [
          "Fresh Cut Watermelon Bowl x2",
          "Fresh Cut Cantaloupe Bowl x2",
          "Fresh Cut Mixed Melon w/ Grapes",
          "Fresh Cut Pineapple Bowl",
          "Fresh Cut Pineapple/Strawberry/Kiwi Bowl",
          "Fresh Cut Mango Bowl",
          "Fresh Cut Tropical Fruit Mix Bowl",
          "Fresh Cut Mixed Fruit w/ Berry Bowl"
        ]
      },
      {
        shelf: 2,
        items: [
          "Fresh Cut Watermelon",
          "Fresh Cut Mixed Melon",
          "Fresh Cut Cantaloupe",
          "Fresh Cut Pineapple",
          "Fresh Cut Strawberry/Pineapple/Blueberry",
          "Fresh Cut Mixed Fruit w/ Berries",
          "Fresh Cut Mixed Berries"
        ]
      },
      {
        shelf: 1,
        items: [
          "Fresh Cut Watermelon Slices x2",
          "Fresh Cut Watermelon Quarters",
          "Fresh Cut Watermelon 60oz",
          "Fresh Cut Mixed Fruit",
          "Fresh Cut Small Party Tray",
          "Fresh Cut Large Tray",
          "Fresh Cut Large Tray w/ Dip"
        ]
      }
    ]
  },
  "display-4ft-vegetable": {
    title: "4ft Vegetable Planogram",
    shelves: [
      {
        shelf: 6,
        items: [
          "Fresh Cut Diced Yellow Onions x2",
          "Fresh Cut Red Onions",
          "Fresh Cut Diced Celery",
          "Fresh Cut Mirepoix Cup",
          "Fresh Cut Diced Onion & Celery",
          "Fresh Cut Diced Pepper Tri-Blend",
          "Fresh Cut Diced Pepper W/ White Onions",
          "Fresh Cut Chopped Cilantro w/ White Onions"
        ]
      },
      {
        shelf: 5,
        items: [
          "Fresh Cut Guacamole Personal Mild",
          "Fresh Cut Avocado Smash",
          "Fresh Cut Guacamole Chunky Mild",
          "Fresh Cut Guacamole Chunky Medium",
          "Fresh Cut Guacamole/Pico Combo",
          "Fresh Cut Pico de Gallo Mild",
          "Fresh Cut Pico de Gallo Medium",
          "Fresh Cut Pico de Gallo Hot",
          "Fresh Cut Pico de Gallo Mango"
        ]
      },
      {
        shelf: 4,
        items: [
          "Fresh Cut Salsa Mild",
          "Fresh Cut Salsa Medium",
          "Fresh Cut Carrot & Cucumber Ranch",
          "Fresh Cut Carrot & Snap Peas Ranch",
          "Fresh Cut Carrot, Snap Pea, Celery Ranch",
          "Fresh Cut Carrot, Broc, Grape Tomato Ranch",
          "Fresh Cut Mini Peppers w/ Guac"
        ]
      },
      {
        shelf: 3,
        items: [
          "Fresh Cut Brussel Sprouts",
          "Fresh Cut Butternut Squash",
          "Fresh Cut Carrot & Celery Sticks",
          "Fresh Cut Snacking Peppers",
          "Fresh Cut Fajita Mix Mild",
          "Fresh Cut Julienne Yellow Onion",
          "Fresh Cut Hamburger Fixins"
        ]
      },
      {
        shelf: 2,
        items: [
          "Fresh Cut Mirepoix",
          "Fresh Cut Squash",
          "Fresh Cut Steak Topper",
          "Fresh Cut Small Veg Bowl",
          "Fresh Cut Cucumber Ranch Bowl",
          "Fresh Cut Large Veg Bowl"
        ]
      },
      {
        shelf: 1,
        items: [
          "Fresh Cut Small Veg Tray",
          "Fresh Cut Fruit/Veg Tray Large",
          "Fresh Cut Veg Tray Large",
          "Fresh Cut Veg Tray w/ Dip Large"
        ]
      }
    ]
  }
};

const state = {
  rows: [],
  availableDates: [],
  selectedDate: "",
  activeView: "review",
  selectedSite: null,
  taskType: "display",
  search: "",
  filter: "all",
  reviews: loadJson(REVIEW_KEY, {}),
  references: loadJson(REFERENCE_KEY, {}),
  builtInSelection: loadJson(BUILT_IN_SELECTION_KEY, {}),
  trailConnection: loadJson(TRAIL_CONNECTION_KEY, { connected: false }),
  locationEmails: loadJson(LOCATION_EMAILS_KEY, {}),
  fruitSizes: loadJson(FRUIT_SIZE_KEY, {})
};

window.photoComplianceApp = {
  exportReviews() {
    return {
      generatedAt: new Date().toISOString(),
      selectedDate: state.selectedDate,
      reviews: state.reviews
    };
  }
};

const els = {};

document.addEventListener("DOMContentLoaded", async () => {
  resetLocalStateWhenRequested();
  cacheElements();
  wireEvents();

  if (await hasAllowedSession()) {
    await showWorkspace();
  }
});

async function hasAllowedSession() {
  const serverSession = await authRequest("/api/session");
  if (serverSession?.authenticated) {
    saveJson(SESSION_KEY, { email: serverSession.email, signedInAt: serverSession.signedInAt || new Date().toISOString() });
    return true;
  }
  if (serverSession?.available === false && isLocalDevHost()) {
    return Boolean(loadJson(SESSION_KEY, null)?.email);
  }
  window.localStorage?.removeItem(SESSION_KEY);
  return false;
}

function resetLocalStateWhenRequested() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("reset") !== "1") return;
  window.localStorage?.removeItem(SESSION_KEY);
  window.localStorage?.removeItem(REVIEW_KEY);
  state.reviews = {};
  history.replaceState(null, "", window.location.pathname);
}

function cacheElements() {
  [
    "loginView",
    "workspaceView",
    "loginForm",
    "emailInput",
    "passwordInput",
    "logoutButton",
    "runAllChecksButton",
    "batchStatus",
    "exportButton",
    "exportEmailDraftsButton",
    "dateRange",
    "reviewAppTab",
    "scoresAppTab",
    "calendarAppTab",
    "trailAppTab",
    "reviewContent",
    "scoresView",
    "scoresSummary",
    "scoresList",
    "calendarView",
    "trailView",
    "uploadDateInput",
    "loadDateButton",
    "calendarStatus",
    "availableDateList",
    "trailStatus",
    "openTrailLoginButton",
    "markTrailConnectedButton",
    "disconnectTrailButton",
    "trailImportDateInput",
    "openTrailReportButton",
    "metricStores",
    "metricComplete",
    "metricLate",
    "metricAverage",
    "searchInput",
    "statusFilter",
    "storeList",
    "selectedStatus",
    "selectedStore",
    "scoreValue",
    "categoryScores",
    "fruitScoreValue",
    "vegetableScoreValue",
    "displayTab",
    "bunkerTab",
    "actualPhoto",
    "actualEmpty",
    "openActualFullButton",
    "photoCountLabel",
    "photoGallery",
    "assignFruitPhotoButton",
    "assignVegetablePhotoButton",
    "photoAssignmentStatus",
    "photoLink",
    "referenceLabel",
    "referenceSelect",
    "fruitSizeSelect",
    "fruitSizeStatus",
    "referencePhoto",
    "referenceEmpty",
    "originalReferencePanel",
    "originalReferenceSelect",
    "originalReferenceLabel",
    "originalReferencePhoto",
    "originalReferenceEmpty",
    "openOriginalReferenceFullButton",
    "referenceUpload",
    "openReferenceFullButton",
    "actualUpload",
    "clearReference",
    "taskStatus",
    "taskOnTime",
    "taskDue",
    "taskTiming",
    "locationEmailInput",
    "saveLocationEmailButton",
    "emailStatus",
    "checklist",
    "planogramSection",
    "planogramTitle",
    "planogramList",
    "markPlanogramPresentButton",
    "clearPlanogramButton",
    "resetChecklist",
    "findingsList",
    "assistantForm",
    "assistantPrompt",
    "assistantStatus",
    "compareButton",
    "scoreButton",
    "emailLocationButton",
    "downloadStoreReportButton",
    "taskLink"
  ].forEach((id) => {
    els[id] = document.getElementById(id);
  });
}

function wireEvents() {
  els.loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = els.emailInput.value.trim().toLowerCase();
    const password = els.passwordInput.value.trim();
    if (!email || !password) return;
    const login = await authRequest("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (login?.authenticated) {
      showLoginError("");
      saveJson(SESSION_KEY, { email: login.email, signedInAt: login.signedInAt || new Date().toISOString() });
      await showWorkspace();
      return;
    }

    if (login?.available === false && isLocalDevHost()) {
      showLoginError("");
      saveJson(SESSION_KEY, { email, signedInAt: new Date().toISOString(), localDev: true });
      await showWorkspace();
      return;
    }

    if (login?.configured === false) {
      showLoginError("Server login is not configured yet. Set APP_USERS_JSON in Render.");
      return;
    }

    if (!login?.authenticated) {
      showLoginError("Email or password is incorrect.");
      return;
    }
  });

  els.logoutButton.addEventListener("click", async () => {
    await authRequest("/api/logout", { method: "POST" });
    window.localStorage?.removeItem(SESSION_KEY);
    els.workspaceView.classList.add("hidden");
    els.loginView.classList.remove("hidden");
  });

  els.searchInput.addEventListener("input", (event) => {
    state.search = event.target.value.toLowerCase();
    renderStoreList();
  });

  els.reviewAppTab.addEventListener("click", () => selectAppView("review"));
  els.scoresAppTab.addEventListener("click", () => selectAppView("scores"));
  els.calendarAppTab.addEventListener("click", () => selectAppView("calendar"));
  els.trailAppTab.addEventListener("click", () => selectAppView("trail"));
  els.loadDateButton.addEventListener("click", () => {
    if (els.uploadDateInput.value) loadDataForDate(els.uploadDateInput.value);
  });
  els.uploadDateInput.addEventListener("change", (event) => {
    if (event.target.value) loadDataForDate(event.target.value);
  });
  els.openTrailLoginButton.addEventListener("click", openTrailLogin);
  els.markTrailConnectedButton.addEventListener("click", markTrailConnected);
  els.disconnectTrailButton.addEventListener("click", disconnectTrail);
  els.openTrailReportButton.addEventListener("click", openTrailPhotoReport);

  els.storeList.addEventListener("click", (event) => {
    const storeButton = event.target.closest(".store-item");
    if (!storeButton) return;
    selectStore(storeButton.dataset.site, true);
  });

  els.scoresList.addEventListener("click", (event) => {
    const scoreButton = event.target.closest(".score-row");
    if (!scoreButton) return;
    selectStore(scoreButton.dataset.site, true);
    selectAppView("review");
  });

  els.statusFilter.addEventListener("change", (event) => {
    state.filter = event.target.value;
    renderStoreList();
  });

  els.displayTab.addEventListener("click", () => selectTaskType("display"));
  els.bunkerTab.addEventListener("click", () => selectTaskType("bunker"));
  els.referenceUpload.addEventListener("change", (event) => readUpload(event, saveReference));
  els.referenceSelect.addEventListener("change", (event) => selectBuiltInReference(event.target.value));
  els.fruitSizeSelect.addEventListener("change", saveSelectedFruitSize);
  els.openReferenceFullButton.addEventListener("click", openReferenceFullSize);
  els.openOriginalReferenceFullButton.addEventListener("click", openOriginalReferenceFullSize);
  els.openActualFullButton.addEventListener("click", openActualFullSize);
  els.assignFruitPhotoButton.addEventListener("click", () => assignSelectedPhotoToCategory("fruit"));
  els.assignVegetablePhotoButton.addEventListener("click", () => assignSelectedPhotoToCategory("vegetable"));
  els.actualUpload.addEventListener("change", (event) => readUpload(event, saveActualOverride));
  els.clearReference.addEventListener("click", clearReference);
  els.markPlanogramPresentButton.addEventListener("click", markAllPlanogramPresent);
  els.clearPlanogramButton.addEventListener("click", clearPlanogramPresent);
  els.resetChecklist.addEventListener("click", resetChecklist);
  els.assistantForm.addEventListener("submit", applyAssistantPrompt);
  els.compareButton.addEventListener("click", scoreSelectedTask);
  els.scoreButton.addEventListener("click", scoreSelectedTask);
  els.runAllChecksButton.addEventListener("click", runAllStoreChecks);
  els.saveLocationEmailButton.addEventListener("click", saveSelectedLocationEmail);
  els.emailLocationButton.addEventListener("click", emailSelectedLocationReport);
  els.downloadStoreReportButton.addEventListener("click", downloadSelectedStoreReport);
  els.exportButton.addEventListener("click", exportScores);
  els.exportEmailDraftsButton.addEventListener("click", exportComplianceEmailDrafts);
}

function showLoginError(message) {
  let error = document.getElementById("loginError");
  if (!error) {
    error = document.createElement("p");
    error.id = "loginError";
    error.className = "login-error";
    els.loginForm.appendChild(error);
  }
  error.textContent = message;
}

async function showWorkspace() {
  els.loginView.classList.add("hidden");
  els.workspaceView.classList.remove("hidden");

  if (!state.rows.length) {
    await loadManifest();
    await loadDataForDate(state.selectedDate || latestAvailableDate());
  }
}

async function loadManifest() {
  try {
    const response = await fetch(`${DATA_MANIFEST_URL}?v=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error("No date manifest");
    const manifest = await response.json();
    state.availableDates = Array.isArray(manifest.dates) ? manifest.dates : [];
    state.selectedDate = manifest.latestDate || latestAvailableDate() || "";
    els.trailImportDateInput.value = state.selectedDate || todayIsoDate();
  } catch {
    state.availableDates = [{
      date: "",
      label: "Current report",
      path: DATA_URL,
      sourceDateRange: "Current report"
    }];
    state.selectedDate = "";
    els.trailImportDateInput.value = todayIsoDate();
  }
  renderCalendar();
  renderTrailConnection();
}

async function loadDataForDate(date) {
  let entry = findDateEntry(date);
  if (date && !entry) {
    state.selectedDate = date;
    els.uploadDateInput.value = date;
    els.calendarStatus.textContent = `No imported Trail photo upload data found for ${date}.`;
    renderCalendar();
    selectAppView("calendar");
    return;
  }
  entry = entry || state.availableDates[0] || { path: DATA_URL, date: "", label: "Current report" };
  const url = entry.path || DATA_URL;
  const response = await fetch(`${url}?v=${Date.now()}`, { cache: "no-store" });
  if (!response.ok) throw new Error("Unable to load photo upload data");
  const data = await response.json();
  state.rows = data.rows;
  state.selectedDate = entry.date || date || "";
  els.dateRange.textContent = `${entry.label || state.selectedDate || "Current report"} | ${data.sourceDateRange || entry.sourceDateRange || "Current report"}`;
  els.uploadDateInput.value = state.selectedDate || "";
  els.trailImportDateInput.value = state.selectedDate || todayIsoDate();
  state.selectedSite = state.rows[0]?.site || null;
  state.search = "";
  state.filter = "all";
  els.searchInput.value = "";
  els.statusFilter.value = "all";
  await loadPrecomputedReviews();
  renderAll();
  renderCalendar();
  selectAppView("review");
}

async function loadPrecomputedReviews() {
  try {
    const response = await fetch(`${PRECOMPUTED_REVIEWS_URL}?v=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) return;
    const data = await response.json();
    const bundledReviews = data.reviews || data;
    if (!bundledReviews || typeof bundledReviews !== "object" || Array.isArray(bundledReviews)) return;
    state.reviews = { ...state.reviews, ...bundledReviews };
    persistReviews();
  } catch {
    // Precomputed reviews are optional for local and live deployments.
  }
}

function findDateEntry(date) {
  return state.availableDates.find((entry) => entry.date === date);
}

function latestAvailableDate() {
  return state.availableDates[0]?.date || "";
}

function selectAppView(view) {
  state.activeView = view;
  const isCalendar = view === "calendar";
  const isTrail = view === "trail";
  const isScores = view === "scores";
  els.calendarView.classList.toggle("hidden", !isCalendar);
  els.trailView.classList.toggle("hidden", !isTrail);
  els.scoresView.classList.toggle("hidden", !isScores);
  els.reviewContent.classList.toggle("hidden", isCalendar || isTrail || isScores);
  els.calendarAppTab.classList.toggle("active", isCalendar);
  els.trailAppTab.classList.toggle("active", isTrail);
  els.scoresAppTab.classList.toggle("active", isScores);
  els.reviewAppTab.classList.toggle("active", !isCalendar && !isTrail && !isScores);
  if (isTrail) renderTrailConnection();
  if (isScores) renderScoresList();
}

function renderCalendar() {
  if (!els.availableDateList) return;
  els.availableDateList.innerHTML = "";
  els.uploadDateInput.value = state.selectedDate || "";

  const activeEntry = findDateEntry(state.selectedDate);
  if (activeEntry) {
    els.calendarStatus.textContent = `${activeEntry.label}: ${activeEntry.stores || 0} stores, ${activeEntry.displayPhotos || 0} loaded display photos.`;
  } else if (state.selectedDate) {
    els.calendarStatus.textContent = `No imported Trail photo upload data found for ${state.selectedDate}.`;
  } else {
    els.calendarStatus.textContent = "Choose a date with imported Trail photo upload data.";
  }

  state.availableDates.forEach((entry) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `date-option ${entry.date === state.selectedDate ? "active" : ""}`;
    button.textContent = entry.label || entry.date || "Current report";
    button.addEventListener("click", () => loadDataForDate(entry.date));
    els.availableDateList.appendChild(button);
  });
}

function renderTrailConnection() {
  const connection = state.trailConnection || { connected: false };
  const connectedAt = connection.connectedAt ? new Date(connection.connectedAt).toLocaleString() : "";
  els.trailStatus.textContent = connection.connected
    ? `Trail marked connected${connectedAt ? ` on ${connectedAt}` : ""}.`
    : "Trail is not connected yet. Open Trail Login and sign in first.";
  els.trailImportDateInput.value = els.trailImportDateInput.value || state.selectedDate || todayIsoDate();
}

function openTrailLogin() {
  window.open(`${TRAIL_BASE_URL}/`, "_blank", "noopener,noreferrer");
}

function markTrailConnected() {
  state.trailConnection = {
    connected: true,
    connectedAt: new Date().toISOString(),
    baseUrl: TRAIL_BASE_URL
  };
  saveJson(TRAIL_CONNECTION_KEY, state.trailConnection);
  renderTrailConnection();
}

function disconnectTrail() {
  state.trailConnection = { connected: false };
  saveJson(TRAIL_CONNECTION_KEY, state.trailConnection);
  renderTrailConnection();
}

function openTrailPhotoReport() {
  const date = els.trailImportDateInput.value || state.selectedDate || todayIsoDate();
  const search = encodeURIComponent("Kroger Display Case Photo");
  window.open(`${TRAIL_BASE_URL}/reports#/tasks?search=${search}&dates=${date}..${date}`, "_blank", "noopener,noreferrer");
}

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function renderAll() {
  renderMetrics();
  renderStoreList();
  renderScoresList();
  renderDetail();
}

function renderMetrics() {
  const complete = state.rows.filter((row) => isComplete(row.display) || isComplete(row.bunker)).length;
  const late = state.rows.filter((row) => isLate(row.display) || isLate(row.bunker)).length;
  const scores = state.rows.map((row) => scoreSummaryForRow(row).overall).filter((score) => Number.isFinite(score));
  const average = scores.length ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length) : null;

  els.metricStores.textContent = state.rows.length;
  els.metricComplete.textContent = complete;
  els.metricLate.textContent = late;
  els.metricAverage.textContent = average === null ? "--" : average;
}

function renderStoreList() {
  const rows = state.rows.filter((row) => {
    const matchesSearch = row.site.toLowerCase().includes(state.search);
    const status = getRowStatus(row);
    const matchesFilter = state.filter === "all" || status === state.filter;
    return matchesSearch && matchesFilter;
  });

  els.storeList.innerHTML = "";
  rows.forEach((row) => {
    const button = document.createElement("button");
    const status = getRowStatus(row);
    button.type = "button";
    button.className = `store-item ${row.site === state.selectedSite ? "active" : ""}`;
    button.dataset.site = row.site;
    button.setAttribute("aria-pressed", row.site === state.selectedSite ? "true" : "false");
    button.innerHTML = `
      <span>
        <strong>${row.site}</strong>
        <span>${getStoreSubtext(row)}</span>
      </span>
      <i class="dot ${statusColor(status)}"></i>
    `;
    els.storeList.appendChild(button);
  });
}

function renderScoresList() {
  if (!els.scoresList) return;
  const ranked = state.rows.map(scoreSummaryForRow).sort((a, b) => {
    if (a.overall === null && b.overall === null) return a.site.localeCompare(b.site);
    if (a.overall === null) return 1;
    if (b.overall === null) return -1;
    return a.overall - b.overall || a.site.localeCompare(b.site);
  });
  const scoredCount = ranked.filter((row) => row.overall !== null).length;
  els.scoresSummary.textContent = `${scoredCount}/${ranked.length} scored`;
  els.scoresList.innerHTML = "";

  ranked.forEach((row, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `score-row ${row.overall === null ? "unscored" : ""}`;
    button.dataset.site = row.site;
    button.innerHTML = `
      <span class="score-rank">${row.overall === null ? "--" : index + 1}</span>
      <span class="score-store">
        <strong>${row.site}</strong>
        <span>${row.referenceLabel}</span>
      </span>
      <span class="score-score">${row.overall === null ? "--" : row.overall}</span>
      <span class="score-detail">
        <strong>Display</strong>
        <span>${row.displayScore === null ? "--" : row.displayScore}</span>
      </span>
      <span class="score-detail">
        <strong>Fruit</strong>
        <span>${row.fruitScore === null ? "--" : row.fruitScore}</span>
      </span>
      <span class="score-detail">
        <strong>Veg</strong>
        <span>${row.vegetableScore === null ? "--" : row.vegetableScore}</span>
      </span>
      <span class="score-detail">
        <strong>Bunker</strong>
        <span>${row.bunkerScore === null ? "--" : row.bunkerScore}</span>
      </span>
      <span class="score-detail">
        <strong>Missing</strong>
        <span>${row.missingCount}</span>
      </span>
    `;
    els.scoresList.appendChild(button);
  });
}

function scoreSummaryForRow(row) {
  const displayReview = state.reviews[`${row.site}:display`] || {};
  const bunkerReview = state.reviews[`${row.site}:bunker`] || {};
  const displayScore = effectiveTaskScore(row.display, displayReview);
  const bunkerScore = row.bunker ? effectiveTaskScore(row.bunker, bunkerReview) : null;
  const overall = Number.isFinite(displayScore) ? displayScore : Number.isFinite(bunkerScore) ? bunkerScore : null;
  const reference = (BUILT_IN_REFERENCES.display || []).find((item) => item.id === displayReview.referenceId);
  const missingCount = (displayReview.missingItems?.length || 0) +
    getMissingPlanogramLabelsForReview(displayReview).length +
    (bunkerReview.missingItems?.length || 0) +
    getMissingPlanogramLabelsForReview(bunkerReview).length;

  return {
    site: row.site,
    overall,
    displayScore,
    fruitScore: isComplete(row.display) && Number.isFinite(displayReview.categoryScores?.fruit?.score) ? displayReview.categoryScores.fruit.score : displayScore === 0 ? 0 : null,
    vegetableScore: isComplete(row.display) && Number.isFinite(displayReview.categoryScores?.vegetable?.score) ? displayReview.categoryScores.vegetable.score : displayScore === 0 ? 0 : null,
    bunkerScore,
    referenceLabel: reference?.name || "No generic selected",
    missingCount
  };
}

function effectiveTaskScore(task, review = {}) {
  if (!task || !isComplete(task)) return 0;
  if (!getTaskImages(task).length && !review.actualOverride) return 0;
  return Number.isFinite(review.score) ? review.score : null;
}

function selectStore(site, shouldFocusDetail = false) {
  if (!site || site === state.selectedSite) return;
  state.selectedSite = site;
  renderAll();
  if (shouldFocusDetail && window.innerWidth <= 1100) {
    els.selectedStore.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function renderDetail() {
  const row = selectedRow();
  if (!row) return;
  const task = selectedTask();
  const review = getReview();
  const reference = getReference();
  const actualOverride = review.actualOverride;
  const taskImages = getTaskImages(task);
  const actualSrc = actualOverride || review.selectedActualSrc || taskImages[0] || "";

  els.selectedStore.textContent = row.site;
  els.selectedStatus.textContent = task?.status || "No task found";
  els.selectedStatus.style.background = badgeColor(task);
  const shownScore = effectiveTaskScore(task, review);
  els.scoreValue.textContent = Number.isFinite(shownScore) ? shownScore : "--";
  els.categoryScores.classList.toggle("hidden", state.taskType !== "display");
  els.fruitScoreValue.textContent = isComplete(task) && Number.isFinite(review.categoryScores?.fruit?.score) ? review.categoryScores.fruit.score : shownScore === 0 ? 0 : "--";
  els.vegetableScoreValue.textContent = isComplete(task) && Number.isFinite(review.categoryScores?.vegetable?.score) ? review.categoryScores.vegetable.score : shownScore === 0 ? 0 : "--";

  setImage(els.actualPhoto, actualSrc);
  setImage(els.referencePhoto, reference);
  els.referenceLabel.textContent = getReferenceLabel();
  renderPhotoGallery(taskImages, actualOverride, actualSrc);
  renderPhotoAssignmentStatus(taskImages);
  els.actualPhoto.parentElement.classList.toggle("has-image", Boolean(actualSrc));
  els.referencePhoto.parentElement.classList.toggle("has-image", Boolean(reference));

  els.photoLink.href = task?.photoLink || "#";
  els.taskLink.href = task?.taskLink || "#";
  els.photoLink.style.pointerEvents = task?.photoLink ? "auto" : "none";
  els.taskLink.style.pointerEvents = task?.taskLink ? "auto" : "none";

  els.taskStatus.textContent = task?.status || "No task found";
  els.taskOnTime.textContent = task?.onTime || "No task found";
  els.taskDue.textContent = task?.completedOrDue || "--";
  els.taskTiming.textContent = task?.timing || "--";
  els.locationEmailInput.value = state.locationEmails[row.site] || "";
  els.emailStatus.textContent = state.locationEmails[row.site] ? `Saved for ${row.site}.` : "Add a location email to create addressed drafts.";

  renderReferenceSelect();
  renderOriginalReferenceSelect();
  renderFruitSizeSelect(row.site);
  renderChecklist();
  renderPlanogramChecklist();
  renderFindings();
}

function renderPhotoGallery(images, actualOverride, selectedSrc) {
  els.photoGallery.innerHTML = "";
  const count = actualOverride ? 1 : images.length;
  els.photoCountLabel.textContent = count
    ? `${count} uploaded photo${count === 1 ? "" : "s"} loaded`
    : "No uploaded photos loaded";

  if (actualOverride) {
    addPhotoThumb(actualOverride, 0, true);
    return;
  }

  images.forEach((src, index) => addPhotoThumb(src, index, src === selectedSrc || (!selectedSrc && index === 0)));
}

function addPhotoThumb(src, index, isActive) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `photo-thumb ${isActive ? "active" : ""}`;
  button.setAttribute("aria-label", `View uploaded photo ${index + 1}`);
  button.innerHTML = `<img src="${src}" alt="Uploaded photo ${index + 1}" />`;
  button.addEventListener("click", () => {
    const review = getReview();
    review.selectedActualSrc = src;
    persistReviews();
    setImage(els.actualPhoto, src);
    [...els.photoGallery.querySelectorAll(".photo-thumb")].forEach((thumb) => thumb.classList.remove("active"));
    button.classList.add("active");
    renderPhotoAssignmentStatus(getTaskImages(selectedTask()));
  });
  els.photoGallery.appendChild(button);
}

function renderReferenceSelect() {
  const options = BUILT_IN_REFERENCES[state.taskType] || [];
  els.referenceSelect.innerHTML = "";
  els.referenceSelect.classList.toggle("hidden", !options.length);

  options.forEach((reference) => {
    const option = document.createElement("option");
    option.value = reference.id;
    option.textContent = reference.name;
    els.referenceSelect.appendChild(option);
  });

  const selected = selectedBuiltInReference();
  if (selected) els.referenceSelect.value = selected.id;
  els.referenceSelect.disabled = Boolean(state.references[state.taskType]) || options.length <= 1;
}

function renderOriginalReferenceSelect() {
  if (!els.originalReferencePanel) return;
  const options = (BUILT_IN_REFERENCES[state.taskType] || []).filter((reference) => reference.photoSrc);
  const selected = selectedBuiltInReference();
  els.originalReferencePanel.classList.toggle("hidden", !options.length || state.taskType !== "display");
  if (!options.length || state.taskType !== "display") return;

  els.originalReferenceSelect.innerHTML = "";
  options.forEach((reference) => {
    const option = document.createElement("option");
    option.value = reference.id;
    option.textContent = reference.name;
    els.originalReferenceSelect.appendChild(option);
  });

  const shown = options.find((reference) => reference.id === selected?.id) || options[0];
  els.originalReferenceSelect.value = shown.id;
  setOriginalReferenceImage(shown);
  els.originalReferenceSelect.onchange = () => {
    const reference = options.find((item) => item.id === els.originalReferenceSelect.value) || shown;
    setOriginalReferenceImage(reference);
  };
}

function setOriginalReferenceImage(reference) {
  const src = reference?.photoSrc || "";
  setImage(els.originalReferencePhoto, src);
  els.originalReferencePhoto.parentElement.classList.toggle("has-image", Boolean(src));
  els.originalReferenceLabel.textContent = reference
    ? `${reference.name} original photo used for case/photo matching.`
    : "Original generic photo used for case/photo matching.";
}

function renderFruitSizeSelect(site = state.selectedSite) {
  if (!els.fruitSizeSelect) return;
  const isDisplay = state.taskType === "display";
  els.fruitSizeSelect.closest(".fruit-size-panel")?.classList.toggle("hidden", !isDisplay);
  if (!isDisplay) return;
  const saved = getSavedFruitSize(site);
  els.fruitSizeSelect.value = saved;
  const label = getReferenceById(saved)?.name || "6ft Fruit Case";
  els.fruitSizeStatus.textContent = `Saved for ${site}: ${label}. Vegetable is always checked as 4ft.`;
}

function renderChecklist() {
  const review = getReview();
  els.checklist.innerHTML = "";
  ITEMS.forEach((item) => {
    const checked = !review.missingItems?.includes(item);
    const row = document.createElement("div");
    row.className = `check-row ${checked ? "" : "missing"}`;
    row.innerHTML = `
      <label>
        <input type="checkbox" ${checked ? "checked" : ""} />
        ${item}
      </label>
      <span>${checked ? "Present" : "Missing"}</span>
    `;
    row.querySelector("input").addEventListener("change", (event) => {
      updateMissingItem(item, !event.target.checked);
    });
    els.checklist.appendChild(row);
  });
}

function renderPlanogramChecklist() {
  const planogram = getActivePlanogram();
  const planogramId = getActivePlanogramId();
  els.planogramList.innerHTML = "";
  els.planogramSection.classList.toggle("hidden", !planogram);
  if (!planogram) return;

  const review = getReview();
  const presentItems = new Set(review.presentPlanogramItems?.[planogramId] || []);
  const missingItems = new Set(review.missingPlanogramItems?.[planogramId] || []);
  const unverifiedItems = new Set(review.unverifiedPlanogramItems?.[planogramId] || []);
  els.planogramTitle.textContent = `${planogram.title} Items`;

  planogram.shelves.forEach((shelf) => {
    const group = document.createElement("div");
    group.className = "shelf-group";
    group.innerHTML = `<h4 class="shelf-heading">Shelf ${shelf.shelf}</h4>`;

    shelf.items.forEach((item) => {
      const key = planogramItemKey(shelf.shelf, item);
      const checked = presentItems.has(key);
      const missing = missingItems.has(key);
      const unverified = unverifiedItems.has(key) || (!checked && !missing);
      const row = document.createElement("div");
      row.className = `planogram-row ${checked ? "" : missing ? "missing" : "unverified"}`;
      row.innerHTML = `
        <label>
          <input type="checkbox" ${checked ? "checked" : ""} />
          ${item}
        </label>
        <span>${checked ? "Present" : missing ? `Missing / -${PLANOGRAM_ITEM_DEDUCTION}` : "Needs review / no deduction"}</span>
      `;
      row.querySelector("input").addEventListener("change", (event) => {
        updatePresentPlanogramItem(planogramId, key, event.target.checked);
      });
      group.appendChild(row);
    });

    els.planogramList.appendChild(group);
  });
}

function renderFindings(extra = null) {
  const task = selectedTask();
  const review = getReview();
  const findings = [];

  if (!task) findings.push("No Trail task found for this store and task type.");
  if (task && !isComplete(task)) findings.push("Task is not completed yet.");
  if (task && isLate(task)) findings.push("Task was completed late.");
  if (task && !task.imageUrl && !review.actualOverride) findings.push("No uploaded photo is available.");
  if (!getReference()) findings.push("No generic reference photo has been uploaded for this task type.");
  if (review.missingItems?.length) findings.push(`${review.missingItems.length} checklist item(s) marked missing.`);
  const planogramId = getActivePlanogramId();
  const missingPlanogramCount = getMissingPlanogramItemKeys(planogramId, review).length;
  if (missingPlanogramCount) findings.push(`${missingPlanogramCount} planogram product(s) marked missing.`);
  if (extra) findings.push(...extra);
  else if (review.findings?.length) findings.push(...review.findings.slice(0, 10));
  if (!findings.length) findings.push("No issues flagged.");

  els.findingsList.innerHTML = findings.map((finding) => `<li>${finding}</li>`).join("");
}

function selectTaskType(type) {
  state.taskType = type;
  els.displayTab.classList.toggle("active", type === "display");
  els.bunkerTab.classList.toggle("active", type === "bunker");
  renderDetail();
}

function selectedRow() {
  return state.rows.find((row) => row.site === state.selectedSite);
}

function selectedTask() {
  const row = selectedRow();
  return row?.[state.taskType] || null;
}

function getTaskImages(task) {
  if (!task) return [];
  if (Array.isArray(task.imageUrls) && task.imageUrls.length) return task.imageUrls.filter(Boolean);
  return task.imageUrl ? [task.imageUrl] : [];
}

function getReviewKey() {
  return `${state.selectedSite}:${state.taskType}`;
}

function getReview() {
  const key = getReviewKey();
  if (!state.reviews[key]) {
    state.reviews[key] = { missingItems: [], presentPlanogramItems: {}, missingPlanogramItems: {}, unverifiedPlanogramItems: {}, score: null, findings: [] };
  }
  if (!state.reviews[key].presentPlanogramItems) {
    state.reviews[key].presentPlanogramItems = {};
  }
  if (!state.reviews[key].missingPlanogramItems) {
    state.reviews[key].missingPlanogramItems = {};
  }
  if (!state.reviews[key].unverifiedPlanogramItems) {
    state.reviews[key].unverifiedPlanogramItems = {};
  }
  return state.reviews[key];
}

function getReference() {
  return state.references[state.taskType] || selectedBuiltInReference()?.src || "";
}

function getReferenceLabel() {
  if (state.references[state.taskType]) return "Custom reference photo";
  return selectedBuiltInReference()?.label || "No reference photo selected";
}

function getActivePlanogramId() {
  if (state.references[state.taskType]) return "";
  return selectedBuiltInReference()?.id || "";
}

function getActivePlanogram() {
  return PLANOGRAMS[getActivePlanogramId()] || null;
}

function planogramItemKey(shelf, item) {
  return `shelf-${shelf}:${item}`;
}

function getAllPlanogramItemKeys(planogram = getActivePlanogram()) {
  if (!planogram) return [];
  return planogram.shelves.flatMap((shelf) => shelf.items.map((item) => planogramItemKey(shelf.shelf, item)));
}

function planogramItemCount(planogramId) {
  return getAllPlanogramItemKeys(PLANOGRAMS[planogramId]).length;
}

function getMissingPlanogramItemKeys(planogramId = getActivePlanogramId(), review = getReview()) {
  const planogram = PLANOGRAMS[planogramId];
  if (!planogram) return [];
  if (review.missingPlanogramItems?.[planogramId]) {
    return review.missingPlanogramItems[planogramId];
  }
  const present = new Set(review.presentPlanogramItems?.[planogramId] || []);
  const unverified = new Set(review.unverifiedPlanogramItems?.[planogramId] || []);
  return getAllPlanogramItemKeys(planogram).filter((key) => !present.has(key) && !unverified.has(key));
}

function selectedBuiltInReference() {
  const options = BUILT_IN_REFERENCES[state.taskType] || [];
  const review = getReview();
  const selectedId = review.referenceId || state.builtInSelection[state.taskType];
  return options.find((reference) => reference.id === selectedId) || options[0] || null;
}

function selectBuiltInReference(referenceId) {
  const review = getReview();
  review.referenceId = referenceId;
  state.builtInSelection[state.taskType] = referenceId;
  delete state.references[state.taskType];
  persistReviews();
  saveJson(BUILT_IN_SELECTION_KEY, state.builtInSelection);
  saveJson(REFERENCE_KEY, state.references);
  renderDetail();
}

function saveSelectedFruitSize() {
  const row = selectedRow();
  if (!row) return;
  const fruitSize = els.fruitSizeSelect.value;
  state.fruitSizes[row.site] = fruitSize;
  saveJson(FRUIT_SIZE_KEY, state.fruitSizes);
  els.fruitSizeStatus.textContent = `Saved for ${row.site}: ${getReferenceById(fruitSize)?.name || fruitSize}.`;
}

function getReferenceById(referenceId) {
  return (BUILT_IN_REFERENCES.display || []).find((reference) => reference.id === referenceId) || null;
}

function getSavedFruitSize(site = state.selectedSite) {
  const saved = state.fruitSizes[site];
  return getReferenceById(saved)?.id?.includes("fruit") ? saved : "display-6ft-fruit";
}

function setZeroDisplayCategoryScores(review, status) {
  const fruitPlanogramId = getSavedFruitSize(state.selectedSite);
  const vegetablePlanogramId = "display-4ft-vegetable";
  const fruitTotalItems = planogramItemCount(fruitPlanogramId);
  const vegetableTotalItems = planogramItemCount(vegetablePlanogramId);
  review.categoryScores = {
    fruit: {
      score: 0,
      referenceId: fruitPlanogramId,
      referenceName: getReferenceById(fruitPlanogramId)?.name || "Fruit Case",
      actual: "",
      coverage: 0,
      confidence: 0,
      missingItems: fruitTotalItems,
      unverifiedItems: 0,
      totalItems: fruitTotalItems,
      status
    },
    vegetable: {
      score: 0,
      referenceId: vegetablePlanogramId,
      referenceName: getReferenceById(vegetablePlanogramId)?.name || "4ft Vegetable Case",
      actual: "",
      coverage: 0,
      confidence: 0,
      missingItems: vegetableTotalItems,
      unverifiedItems: 0,
      totalItems: vegetableTotalItems,
      status
    }
  };
}

function allowedDisplayReferencesForSite(site = state.selectedSite) {
  const vegetable = getReferenceById("display-4ft-vegetable");
  const fruit = getReferenceById(getSavedFruitSize(site));
  return [vegetable, fruit].filter(Boolean);
}

function saveReference(dataUrl) {
  state.references[state.taskType] = dataUrl;
  saveJson(REFERENCE_KEY, state.references);
  renderDetail();
}

function saveActualOverride(dataUrl) {
  const review = getReview();
  review.actualOverride = dataUrl;
  persistReviews();
  renderDetail();
}

function clearReference() {
  delete state.references[state.taskType];
  saveJson(REFERENCE_KEY, state.references);
  renderDetail();
}

function resetChecklist() {
  const review = getReview();
  review.missingItems = [];
  review.presentPlanogramItems = {};
  review.missingPlanogramItems = {};
  review.unverifiedPlanogramItems = {};
  persistReviews();
  renderDetail();
}

function updateMissingItem(item, isMissing) {
  const review = getReview();
  const missing = new Set(review.missingItems || []);
  if (isMissing) {
    missing.add(item);
  } else {
    missing.delete(item);
  }
  review.missingItems = [...missing];
  persistReviews();
  renderDetail();
}

function updatePresentPlanogramItem(planogramId, itemKey, isPresent) {
  const review = getReview();
  const current = new Set(review.presentPlanogramItems?.[planogramId] || []);
  const missing = new Set(review.missingPlanogramItems?.[planogramId] || []);
  const unverified = new Set(review.unverifiedPlanogramItems?.[planogramId] || []);
  if (isPresent) {
    current.add(itemKey);
    missing.delete(itemKey);
    unverified.delete(itemKey);
  } else {
    current.delete(itemKey);
    missing.add(itemKey);
    unverified.delete(itemKey);
  }
  review.presentPlanogramItems = {
    ...(review.presentPlanogramItems || {}),
    [planogramId]: [...current]
  };
  review.missingPlanogramItems = {
    ...(review.missingPlanogramItems || {}),
    [planogramId]: [...missing]
  };
  review.unverifiedPlanogramItems = {
    ...(review.unverifiedPlanogramItems || {}),
    [planogramId]: [...unverified]
  };
  persistReviews();
  renderDetail();
}

function markAllPlanogramPresent() {
  const planogramId = getActivePlanogramId();
  const planogram = getActivePlanogram();
  if (!planogram) return;
  const review = getReview();
  review.presentPlanogramItems = {
    ...(review.presentPlanogramItems || {}),
    [planogramId]: getAllPlanogramItemKeys(planogram)
  };
  review.missingPlanogramItems = {
    ...(review.missingPlanogramItems || {}),
    [planogramId]: []
  };
  review.unverifiedPlanogramItems = {
    ...(review.unverifiedPlanogramItems || {}),
    [planogramId]: []
  };
  persistReviews();
  renderDetail();
}

function clearPlanogramPresent() {
  const planogramId = getActivePlanogramId();
  const review = getReview();
  review.presentPlanogramItems = {
    ...(review.presentPlanogramItems || {}),
    [planogramId]: []
  };
  review.missingPlanogramItems = {
    ...(review.missingPlanogramItems || {}),
    [planogramId]: getAllPlanogramItemKeys()
  };
  review.unverifiedPlanogramItems = {
    ...(review.unverifiedPlanogramItems || {}),
    [planogramId]: []
  };
  persistReviews();
  renderDetail();
}

async function assignSelectedPhotoToCategory(category) {
  const actual = getSelectedActualPhoto();
  const review = getReview();
  if (!actual) {
    els.photoAssignmentStatus.textContent = "Select an uploaded photo first.";
    return;
  }
  review.categoryPhotoAssignments = {
    ...(review.categoryPhotoAssignments || {}),
    [category]: actual
  };
  if (state.taskType === "display") {
    review.categoryScores = await scoreDisplayCategories(selectedTask(), state.selectedSite, review);
    review.score = displayScoreRollup(review.categoryScores, review.score);
    review.findings = [
      `Manual assignment updated: ${category === "fruit" ? "Fruit" : "Vegetable"} uses the selected photo.`,
      categoryScoreFinding("Fruit", review.categoryScores.fruit),
      categoryScoreFinding("Vegetable", review.categoryScores.vegetable),
      ...(review.findings || [])
    ];
  }
  persistReviews();
  renderDetail();
  renderPhotoAssignmentStatus(getTaskImages(selectedTask()));
}

function renderPhotoAssignmentStatus(taskImages = getTaskImages(selectedTask())) {
  const review = getReview();
  const fruit = currentTaskAssignment(review.categoryPhotoAssignments?.fruit, taskImages);
  const vegetable = currentTaskAssignment(review.categoryPhotoAssignments?.vegetable, taskImages);
  const labelFor = (src) => {
    if (!src) return "not set";
    const index = taskImages.findIndex((image) => image === src);
    return index >= 0 ? `photo ${index + 1}` : "not set";
  };
  els.photoAssignmentStatus.textContent = `Fruit: ${labelFor(fruit)} | Vegetable: ${labelFor(vegetable)}`;
}

function currentTaskAssignment(src, taskImages = getTaskImages(selectedTask())) {
  if (!src) return "";
  return taskImages.includes(src) ? src : "";
}

async function applyAssistantPrompt(event) {
  event.preventDefault();
  const prompt = els.assistantPrompt.value.trim();
  if (!prompt) return;

  const result = applyComplianceInstruction(prompt);
  els.assistantPrompt.value = "";
  els.assistantStatus.textContent = result.message;

  persistReviews();
  renderDetail();
  await scoreCompliance({ runAuto: false, assistantFinding: result.message });
}

function applyComplianceInstruction(prompt) {
  const review = getReview();
  const planogramId = getActivePlanogramId();
  const planogram = getActivePlanogram();
  const normalizedPrompt = normalizeText(prompt);
  const wantsPresent = /\b(present|found|add|yes|correct|there)\b/.test(normalizedPrompt);
  const wantsMissing = /\b(missing|missed|not present|remove|absent|no|wrong|deduct)\b/.test(normalizedPrompt);

  if (!planogram || (!wantsPresent && !wantsMissing)) {
    return { changed: 0, message: "Tell the assistant what is present or missing, for example: mark shelf 5 missing." };
  }

  const shelfMatch = normalizedPrompt.match(/\bshelf\s*(\d+)\b/);
  if (shelfMatch) {
    const shelfNumber = Number(shelfMatch[1]);
    const shelf = planogram.shelves.find((entry) => entry.shelf === shelfNumber);
    if (!shelf) return { changed: 0, message: `Shelf ${shelfNumber} is not in this selected planogram.` };
    const keys = shelf.items.map((item) => planogramItemKey(shelf.shelf, item));
    updatePlanogramKeys(planogramId, keys, wantsPresent);
    return {
      changed: keys.length,
      message: `${wantsPresent ? "Marked present" : "Marked missing"}: all ${keys.length} item(s) on shelf ${shelfNumber}.`
    };
  }

  const itemMatches = findPlanogramItemsFromPrompt(planogram, normalizedPrompt);
  if (itemMatches.length) {
    const keys = itemMatches.map(({ shelf, item }) => planogramItemKey(shelf, item));
    updatePlanogramKeys(planogramId, keys, wantsPresent);
    return {
      changed: keys.length,
      message: `${wantsPresent ? "Marked present" : "Marked missing"}: ${itemMatches.map(({ item }) => item).join(", ")}.`
    };
  }

  const generalMatch = ITEMS.find((item) => normalizedPrompt.includes(normalizeText(item)));
  if (generalMatch) {
    updateMissingItem(generalMatch, wantsMissing);
    return { changed: 1, message: `${wantsMissing ? "Marked missing" : "Marked present"}: ${generalMatch}.` };
  }

  return { changed: 0, message: "I could not match that to a shelf or item. Try: mark shelf 5 missing, or mark avocado smash missing." };
}

function updatePlanogramKeys(planogramId, keys, isPresent) {
  const review = getReview();
  const current = new Set(review.presentPlanogramItems?.[planogramId] || []);
  const missing = new Set(review.missingPlanogramItems?.[planogramId] || []);
  const unverified = new Set(review.unverifiedPlanogramItems?.[planogramId] || []);
  keys.forEach((key) => {
    if (isPresent) {
      current.add(key);
      missing.delete(key);
      unverified.delete(key);
    } else {
      current.delete(key);
      missing.add(key);
      unverified.delete(key);
    }
  });
  review.presentPlanogramItems = {
    ...(review.presentPlanogramItems || {}),
    [planogramId]: [...current]
  };
  review.missingPlanogramItems = {
    ...(review.missingPlanogramItems || {}),
    [planogramId]: [...missing]
  };
  review.unverifiedPlanogramItems = {
    ...(review.unverifiedPlanogramItems || {}),
    [planogramId]: [...unverified]
  };
}

function findPlanogramItemsFromPrompt(planogram, normalizedPrompt) {
  const words = normalizedPrompt.split(" ").filter((word) => word.length > 2 && !["mark", "item", "items", "fresh", "cut", "missing", "present"].includes(word));
  if (!words.length) return [];
  return planogram.shelves.flatMap((shelf) => (
    shelf.items
      .filter((item) => {
        const normalizedItem = normalizeText(item);
        return normalizedPrompt.includes(normalizedItem) || words.every((word) => normalizedItem.includes(word));
      })
      .map((item) => ({ shelf: shelf.shelf, item }))
  ));
}

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function scoreSelectedTask() {
  return scoreCompliance({ runAuto: true, allowPhotoSwitch: false });
}

async function runAllStoreChecks() {
  const originalSite = state.selectedSite;
  const originalTaskType = state.taskType;
  const originalCustomDisplayReference = state.references.display;
  const manualFruitSizes = { ...state.fruitSizes };
  const rows = state.rows.filter((row) => getTaskImages(row.display).length);
  let checked = 0;
  let successful = 0;
  let skipped = state.rows.length - rows.length;

  els.runAllChecksButton.disabled = true;
  els.batchStatus.textContent = `Running checks for ${rows.length} store(s)...`;
  state.taskType = "display";
  delete state.references.display;

  try {
    for (const row of rows) {
      checked += 1;
      els.batchStatus.textContent = `Checking ${row.site} (${checked}/${rows.length})...`;
      await nextFrame();

      const bestMatch = await chooseBestGenericAndPhoto(row.display, row.site);
      if (!bestMatch.reference || !bestMatch.actual) {
        skipped += 1;
        continue;
      }

      state.selectedSite = row.site;
      const review = getReview();
      review.referenceId = bestMatch.reference.id;
      review.selectedActualSrc = bestMatch.actual;
      state.builtInSelection.display = bestMatch.reference.id;
      renderDetail();
      await scoreCompliance({ runAuto: true, allowPhotoSwitch: true });
      const categoryScores = await scoreDisplayCategories(row.display, row.site, review);
      review.referenceId = bestMatch.reference.id;
      review.selectedActualSrc = bestMatch.actual;
      review.categoryScores = categoryScores;
      review.score = displayScoreRollup(categoryScores, review.score);
      review.findings = [
        categoryScoreFinding("Fruit", categoryScores.fruit),
        categoryScoreFinding("Vegetable", categoryScores.vegetable),
        `Batch selected ${bestMatch.reference.name} from 4ft Vegetable + saved fruit size (${Math.round(bestMatch.coverage * 100)}% planogram coverage).`,
        ...(review.findings || [])
      ];
      persistReviews();
      successful += 1;
    }
  } finally {
    if (originalCustomDisplayReference) state.references.display = originalCustomDisplayReference;
    else delete state.references.display;
    state.selectedSite = originalSite || state.rows[0]?.site || null;
    state.taskType = originalTaskType;
    state.fruitSizes = manualFruitSizes;
    saveJson(FRUIT_SIZE_KEY, state.fruitSizes);
    saveJson(BUILT_IN_SELECTION_KEY, state.builtInSelection);
    saveJson(REFERENCE_KEY, state.references);
    els.runAllChecksButton.disabled = false;
    els.batchStatus.textContent = `Finished batch check: ${successful} store(s) checked${skipped ? `, ${skipped} skipped` : ""}.`;
    renderAll();
  }
}

async function chooseBestGenericAndPhoto(task, site = state.selectedSite) {
  const actualPhotos = getTaskImages(task);
  const references = allowedDisplayReferencesForSite(site);
  let best = { reference: null, actual: "", similarity: -1, confidence: -1, coverage: 0 };
  const photoMatches = [];

  for (const [photoIndex, actual] of actualPhotos.entries()) {
    let bestForPhoto = { reference: null, actual, similarity: -1, confidence: -1, coverage: 0, photoIndex };
    for (const reference of references) {
      const result = await scorePhotoAgainstReference(actual, reference);
      if (result.confidence > bestForPhoto.confidence) {
        bestForPhoto = { reference, actual, ...result, photoIndex };
      }
    }
    if (bestForPhoto.reference) {
      photoMatches.push(bestForPhoto);
      if (bestForPhoto.confidence > best.confidence) best = bestForPhoto;
    }
  }

  best.photoMatches = photoMatches;
  return best;
}

async function chooseBestGenericForPhoto(actual, site = state.selectedSite) {
  const references = allowedDisplayReferencesForSite(site);
  let best = { reference: null, actual, similarity: -1, confidence: -1, coverage: 0, photoMatches: [] };
  if (!actual) return best;

  for (const reference of references) {
    const result = await scorePhotoAgainstReference(actual, reference);
    if (result.confidence > best.confidence) {
      best = { reference, actual, ...result, photoMatches: [{ reference, actual, ...result, photoIndex: 0 }] };
    }
  }

  return best;
}

async function scorePhotoAgainstReference(actualSrc, reference) {
  const result = await scoreGenericPhotoCandidate(actualSrc, reference);
  const category = referenceCategory(reference?.id || "");
  if (!category) return result;

  const categoryLikelihood = await imageCategoryLikelihood(actualSrc, category);
  const wallCaseLikelihood = await imageWallCaseLikelihood(actualSrc);
  return {
    ...result,
    categoryLikelihood,
    wallCaseLikelihood,
    confidence: result.confidence * 0.45 + categoryLikelihood * 0.25 + wallCaseLikelihood * 0.3
  };
}

async function scoreGenericPhotoCandidate(actualSrc, reference) {
  const pogVisual = await compareImages(actualSrc, reference.src);
  const photoVisual = reference.photoSrc
    ? await compareImages(actualSrc, reference.photoSrc)
    : pogVisual;
  const visual = photoVisual.available ? photoVisual : pogVisual;
  const planogram = PLANOGRAMS[reference.id];
  if (!planogram) {
    return {
      similarity: visual.similarity,
      photoSimilarity: photoVisual.similarity,
      pogSimilarity: pogVisual.similarity,
      coverage: 0,
      confidence: visual.available ? visual.similarity : -1
    };
  }

  const itemComparison = await comparePlanogramItemSections(actualSrc, reference.src, planogram);
  if (!itemComparison.available) {
    return {
      similarity: visual.similarity,
      photoSimilarity: photoVisual.similarity,
      pogSimilarity: pogVisual.similarity,
      coverage: 0,
      confidence: visual.available ? visual.similarity * 0.35 : -1
    };
  }

  const totalItems = itemComparison.shelves.reduce((sum, shelf) => sum + shelf.items.length, 0);
  const markedItems = itemComparison.shelves.reduce((sum, shelf) => sum + shelf.items.filter((item) => item.marked).length, 0);
  const missingItems = itemComparison.shelves.reduce((sum, shelf) => sum + shelf.items.filter((item) => item.missing).length, 0);
  const unverifiedItems = Math.max(0, totalItems - markedItems - missingItems);
  const shelfCoverage = itemComparison.shelves.filter((shelf) => {
    const shelfProduct = shelf.items.reduce((sum, item) => sum + (item.actualProduct || 0), 0) / Math.max(1, shelf.items.length);
    return shelf.items.some((item) => item.marked) || shelfProduct >= 0.14;
  }).length / Math.max(1, itemComparison.shelves.length);
  const markedCoverage = markedItems / Math.max(1, totalItems);
  const averageProduct = itemComparison.shelves.reduce((sum, shelf) => {
    return sum + shelf.items.reduce((shelfSum, item) => shelfSum + (item.actualProduct || 0), 0) / Math.max(1, shelf.items.length);
  }, 0) / Math.max(1, itemComparison.shelves.length);
  const productCoverage = clamp01(averageProduct / 0.42);
  const coverage = Math.max(markedCoverage, shelfCoverage * 0.68 + productCoverage * 0.32);
  const photoMatch = photoVisual.available ? photoVisual.similarity : visual.similarity;
  const pogMatch = pogVisual.available ? pogVisual.similarity : visual.similarity;
  const confidence = (photoMatch * 0.32) + (pogMatch * 0.08) + (coverage * 0.32) + (shelfCoverage * 0.18) + (productCoverage * 0.1);

  return {
    similarity: visual.similarity,
    photoSimilarity: photoMatch,
    pogSimilarity: pogMatch,
    coverage,
    confidence,
    markedItems,
    totalItems,
    missingItems,
    unverifiedItems,
    shelfCoverage,
    productCoverage,
    itemComparison
  };
}

async function scoreDisplayCategories(task, site = state.selectedSite, review = getReview()) {
  const vegetableReference = getReferenceById("display-4ft-vegetable");
  const fruitReference = getReferenceById(getSavedFruitSize(site));
  const assignments = review.categoryPhotoAssignments || {};
  const taskImages = getTaskImages(task);
  const vegetableAssignment = currentTaskAssignment(assignments.vegetable, taskImages);
  const fruitAssignment = currentTaskAssignment(assignments.fruit, taskImages);
  const pairedPhotos = await chooseDisplayCategoryPhotoPair(taskImages, vegetableReference, fruitReference, {
    vegetable: vegetableAssignment,
    fruit: fruitAssignment
  });
  let vegetable = await scoreBestCategoryPhoto(
    task,
    vegetableReference,
    "vegetable",
    vegetableAssignment || pairedPhotos.vegetable,
    [],
    vegetableAssignment ? "Assigned photo" : "Auto selected photo"
  );
  let fruit = await scoreBestCategoryPhoto(
    task,
    fruitReference,
    "fruit",
    fruitAssignment || pairedPhotos.fruit,
    [],
    fruitAssignment ? "Assigned photo" : "Auto selected photo"
  );

  if (!vegetableAssignment && !fruitAssignment && taskImages.length > 1 && vegetable.actual && vegetable.actual === fruit.actual) {
    if ((vegetable.confidence || 0) >= (fruit.confidence || 0)) {
      fruit = await scoreBestCategoryPhoto(task, fruitReference, "fruit", "", [vegetable.actual]);
    } else {
      vegetable = await scoreBestCategoryPhoto(task, vegetableReference, "vegetable", "", [fruit.actual]);
    }
  }

  return { vegetable, fruit };
}

async function authRequest(path, options = {}) {
  try {
    const response = await fetch(path, {
      credentials: "same-origin",
      cache: "no-store",
      ...options
    });
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) return { available: false };
    const data = await response.json();
    return { available: true, ...data };
  } catch {
    return { available: false };
  }
}

function isLocalDevHost() {
  return LOCAL_DEV_HOSTS.has(window.location.hostname);
}

async function chooseDisplayCategoryPhotoPair(taskImages, vegetableReference, fruitReference, assignments = {}) {
  const validPhotos = taskImages.filter(Boolean);
  const assignedVegetable = validPhotos.includes(assignments.vegetable) ? assignments.vegetable : "";
  const assignedFruit = validPhotos.includes(assignments.fruit) ? assignments.fruit : "";
  if (validPhotos.length <= 1 || (assignedVegetable && assignedFruit)) {
    return { vegetable: assignedVegetable, fruit: assignedFruit };
  }

  const candidates = [];
  for (const photo of validPhotos) {
    const [vegetable, fruit] = await Promise.all([
      vegetableReference ? scorePhotoAgainstReference(photo, vegetableReference) : Promise.resolve(null),
      fruitReference ? scorePhotoAgainstReference(photo, fruitReference) : Promise.resolve(null)
    ]);
    candidates.push({ photo, vegetable, fruit });
  }

  const categoryFit = (entry, category) => {
    const result = entry?.[category];
    if (!result) return -1;
    const other = entry[category === "vegetable" ? "fruit" : "vegetable"];
    const confidence = result.confidence || 0;
    const coverage = result.coverage || 0;
    const shelfCoverage = result.shelfCoverage || 0;
    const categoryLikelihood = Number.isFinite(result.categoryLikelihood) ? result.categoryLikelihood : 0.5;
    const otherConfidence = other?.confidence || 0;
    const otherLikelihood = Number.isFinite(other?.categoryLikelihood) ? other.categoryLikelihood : 0.5;
    const categoryMargin = confidence - otherConfidence;
    const likelihoodMargin = categoryLikelihood - otherLikelihood;
    return (confidence * 0.42) + (coverage * 0.2) + (shelfCoverage * 0.12) + (categoryLikelihood * 0.28) + (categoryMargin * 0.18) + (likelihoodMargin * 0.18);
  };

  const entryForPhoto = (photo) => candidates.find((entry) => entry.photo === photo);
  let bestPair = {
    vegetable: assignedVegetable,
    fruit: assignedFruit,
    score: -Infinity
  };

  for (const vegetableEntry of candidates) {
    for (const fruitEntry of candidates) {
      const vegetablePhoto = assignedVegetable || vegetableEntry.photo;
      const fruitPhoto = assignedFruit || fruitEntry.photo;
      if (assignedVegetable && vegetableEntry.photo !== assignedVegetable) continue;
      if (assignedFruit && fruitEntry.photo !== assignedFruit) continue;
      if (validPhotos.length > 1 && vegetablePhoto === fruitPhoto) continue;

      const resolvedVegetableEntry = entryForPhoto(vegetablePhoto) || vegetableEntry;
      const resolvedFruitEntry = entryForPhoto(fruitPhoto) || fruitEntry;
      const score = categoryFit(resolvedVegetableEntry, "vegetable") + categoryFit(resolvedFruitEntry, "fruit");
      if (score > bestPair.score) {
        bestPair = { vegetable: vegetablePhoto, fruit: fruitPhoto, score };
      }
    }
  }

  if (bestPair.score > -Infinity) return { vegetable: bestPair.vegetable, fruit: bestPair.fruit };

  return {
    vegetable: assignedVegetable || candidates.slice().sort((a, b) => categoryFit(b, "vegetable") - categoryFit(a, "vegetable"))[0]?.photo || "",
    fruit: assignedFruit || candidates.slice().sort((a, b) => categoryFit(b, "fruit") - categoryFit(a, "fruit"))[0]?.photo || ""
  };
}

async function scoreBestCategoryPhoto(task, reference, category, assignedPhoto = "", excludedPhotos = [], assignedStatus = "Assigned photo") {
  const excluded = new Set(excludedPhotos);
  let actualPhotos = assignedPhoto ? [assignedPhoto] : getTaskImages(task).filter((photo) => !excluded.has(photo));
  const totalReferenceItems = planogramItemCount(reference?.id);
  let best = { reference, actual: "", similarity: 0, confidence: -1, coverage: 0, missingItems: totalReferenceItems, unverifiedItems: 0, totalItems: totalReferenceItems };
  if (!task || !isComplete(task)) {
    return {
      score: 0,
      referenceId: reference?.id || "",
      referenceName: reference?.name || "",
      actual: "",
      coverage: 0,
      confidence: 0,
      missingItems: totalReferenceItems,
      unverifiedItems: 0,
      totalItems: totalReferenceItems,
      status: !task
        ? `${category === "vegetable" ? "Vegetable" : "Fruit"} task missing`
        : `${category === "vegetable" ? "Vegetable" : "Fruit"} task incomplete`
    };
  }
  if (!reference) {
    return {
      score: 0,
      referenceId: "",
      referenceName: "",
      actual: "",
      coverage: 0,
      confidence: 0,
      missingItems: 0,
      totalItems: 0,
      status: category === "vegetable" ? "No vegetable reference available" : "No fruit reference available"
    };
  }

  if (!assignedPhoto && actualPhotos.length > 1) {
    const wallScores = await Promise.all(actualPhotos.map(async (photo) => ({
      photo,
      wall: await imageWallCaseLikelihood(photo)
    })));
    const maxWall = Math.max(...wallScores.map((entry) => entry.wall), 0);
    if (maxWall >= 0.42) {
      const wallCutoff = Math.max(0.42, maxWall - 0.1);
      const wallPhotos = wallScores.filter((entry) => entry.wall >= wallCutoff).map((entry) => entry.photo);
      if (wallPhotos.length) actualPhotos = wallPhotos;
    }
  }

  for (const actual of actualPhotos) {
    const result = await scorePhotoAgainstReference(actual, reference);
    if (result.confidence > best.confidence) best = { reference, actual, ...result };
  }

  const categoryLikelihood = Number.isFinite(best.categoryLikelihood) ? best.categoryLikelihood : 0.5;
  const wallCaseLikelihood = Number.isFinite(best.wallCaseLikelihood) ? best.wallCaseLikelihood : 0.5;
  const categoryThreshold = category === "vegetable" ? 0.16 : 0.22;
  const clearlyLoadedCase = best.coverage >= 0.72 && best.confidence >= 0.48;
  const detected = best.actual &&
    best.coverage >= (category === "vegetable" ? 0.18 : 0.16) &&
    best.confidence >= 0.28 &&
    wallCaseLikelihood >= 0.1 &&
    (categoryLikelihood >= categoryThreshold || (clearlyLoadedCase && categoryLikelihood >= (category === "vegetable" ? 0.08 : 0.14)));
  if (!detected) {
    if (best.actual && clearlyLoadedCase) {
      const reviewScore = category === "vegetable"
        ? (categoryLikelihood >= 0.06 ? 45 : 0)
        : (categoryLikelihood >= 0.12 ? 45 : 0);
      return {
        score: reviewScore,
        referenceId: reference?.id || "",
        referenceName: reference?.name || "",
        actual: reviewScore ? best.actual : "",
        coverage: Math.max(0, best.coverage || 0),
        confidence: Math.max(0, best.confidence || 0),
        categoryLikelihood,
        wallCaseLikelihood,
        missingItems: reviewScore ? 0 : best.totalItems || totalReferenceItems,
        unverifiedItems: reviewScore ? best.totalItems || totalReferenceItems : 0,
        totalItems: best.totalItems || totalReferenceItems,
        status: reviewScore
          ? `${category === "vegetable" ? "Vegetable" : "Fruit"} needs review`
          : assignedPhoto
            ? `${category === "vegetable" ? "Vegetable" : "Fruit"} ${assignedStatus === "Assigned photo" ? "assignment" : "auto selection"} did not match reference`
            : category === "vegetable" ? "No vegetable photo detected" : "No fruit photo detected"
      };
    }
    return {
      score: 0,
      referenceId: reference?.id || "",
      referenceName: reference?.name || "",
      actual: "",
      coverage: Math.max(0, best.coverage || 0),
      confidence: Math.max(0, best.confidence || 0),
      categoryLikelihood,
      wallCaseLikelihood,
      missingItems: best.totalItems || totalReferenceItems,
      unverifiedItems: 0,
      totalItems: best.totalItems || totalReferenceItems,
      status: assignedPhoto
        ? `${category === "vegetable" ? "Vegetable" : "Fruit"} ${assignedStatus === "Assigned photo" ? "assignment" : "auto selection"} did not match reference`
        : category === "vegetable" ? "No vegetable photo detected" : "No fruit photo detected"
    };
  }

  let score = 100;
  if (!task) score -= 55;
  else {
    if (!isComplete(task)) score -= 25;
    if (isLate(task)) score -= 12;
  }
  const caseCoverageScore = Math.round((best.coverage || 0) * 100);
  const shelfScore = Math.round((best.shelfCoverage || 0) * 100);
  const productScore = Math.round((best.productCoverage || 0) * 100);
  const confidenceScore = Math.round((best.confidence || 0) * 100);
  const complianceBase = Math.round(caseCoverageScore * 0.45 + shelfScore * 0.25 + productScore * 0.2 + confidenceScore * 0.1);
  score = Math.min(score, Math.max(45, complianceBase));
  score -= Math.round((1 - (best.photoSimilarity || best.similarity)) * (category === "vegetable" ? 5 : 4));
  score -= Math.round((1 - categoryLikelihood) * (category === "vegetable" ? 8 : 6));
  score -= Math.round((1 - wallCaseLikelihood) * 4);
  score -= best.missingItems * (category === "vegetable" ? 3 : 2);
  score = Math.max(0, Math.min(100, Math.round(score)));

  return {
    score,
    referenceId: reference.id,
    referenceName: reference.name,
    actual: best.actual,
    coverage: best.coverage,
    confidence: best.confidence,
    photoSimilarity: best.photoSimilarity,
    pogSimilarity: best.pogSimilarity,
    categoryLikelihood,
    wallCaseLikelihood,
    missingItems: best.missingItems,
    unverifiedItems: best.unverifiedItems || 0,
    totalItems: best.totalItems,
    status: assignedPhoto ? assignedStatus : "Detected"
  };
}

function displayScoreRollup(categoryScores = {}, fallback = null) {
  const scores = [categoryScores.fruit?.score, categoryScores.vegetable?.score].filter((score) => Number.isFinite(score));
  if (!scores.length) return fallback;
  return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
}

function categoryScoreFinding(label, score) {
  if (!score) return `${label} score: not scored.`;
  const categoryConfidence = Number.isFinite(score.categoryLikelihood) ? `, ${Math.round(score.categoryLikelihood * 100)}% category match` : "";
  return `${label} score: ${score.score}/100 (${score.status}; ${Math.round((score.coverage || 0) * 100)}% coverage${categoryConfidence}, ${score.missingItems || 0} missing, ${score.unverifiedItems || 0} need review).`;
}

function referenceCategory(referenceId) {
  if (referenceId?.includes("vegetable")) return "vegetable";
  if (referenceId?.includes("fruit")) return "fruit";
  return "";
}

function nextFrame() {
  return new Promise((resolve) => requestAnimationFrame(resolve));
}

async function scoreCompliance({ runAuto = true, assistantFinding = "", allowPhotoSwitch = false } = {}) {
  const task = selectedTask();
  const review = getReview();
  if (!task || !isComplete(task)) {
    review.score = 0;
    if (state.taskType === "display") {
      setZeroDisplayCategoryScores(review, task ? "Task incomplete" : "Task missing");
    }
    review.scoredAt = new Date().toISOString();
    review.findings = [task ? "Assigned task is incomplete, so the score is 0." : "No assigned task was found, so the score is 0."];
    persistReviews();
    renderMetrics();
    renderStoreList();
    renderDetail();
    renderFindings(review.findings);
    return;
  }
  let reference = getReference();
  let actual = getSelectedActualPhoto();
  let planogramId = getActivePlanogramId();
  if (!actual) {
    review.score = 0;
    if (state.taskType === "display") {
      setZeroDisplayCategoryScores(review, "No uploaded photo available");
    }
    review.selectedActualSrc = "";
    review.scoredAt = new Date().toISOString();
    review.findings = ["No uploaded photo is available, so the score is 0."];
    persistReviews();
    renderMetrics();
    renderStoreList();
    renderDetail();
    renderFindings(review.findings);
    return;
  }
  let bestGeneric = { changed: false, reference: null, actual: "", similarity: 0, coverage: 0 };
  if (runAuto && state.taskType === "display" && !state.references.display) {
    const candidate = allowPhotoSwitch
      ? await chooseBestGenericAndPhoto(task, state.selectedSite)
      : await chooseBestGenericForPhoto(actual, state.selectedSite);
    if (candidate.reference && candidate.actual) {
      bestGeneric = { ...candidate, changed: candidate.reference.id !== review.referenceId || candidate.actual !== actual };
      review.referenceId = candidate.reference.id;
      state.builtInSelection.display = candidate.reference.id;
      reference = candidate.reference.src;
      actual = allowPhotoSwitch ? candidate.actual : actual;
      planogramId = candidate.reference.id;
    }
  }
  const bestPhoto = runAuto && allowPhotoSwitch && !bestGeneric.reference
    ? await chooseBestActualPhotoForReference(task, review, reference, actual)
    : { src: actual, similarity: 0, changed: false };
  actual = bestPhoto.src || actual;
  const visual = await compareImages(actual, reference);
  const autoResult = runAuto
    ? await autoMarkLikelyPlanogramItems(actual, reference, planogramId, review)
    : { available: false, skipped: true, markedItems: 0, markedShelves: [], shelves: [] };
  const missingPlanogramItems = getMissingPlanogramItemKeys(planogramId, review);
  const autoChecklistResult = runAuto
    ? autoUpdateMissingChecklist({ task, actual, reference, visual, missingPlanogramItems, review })
    : { updated: false, missingItems: review.missingItems || [] };
  const missingItems = autoChecklistResult.missingItems;

  let score = 100;
  const findings = [];

  if (!task) {
    score -= 55;
  } else {
    if (!isComplete(task)) score -= 25;
    if (isLate(task)) score -= 12;
    if (!actual) score -= 25;
  }

  if (!reference) {
    score -= 10;
  }

  if (visual.available) {
    const visualPenalty = Math.round((1 - visual.similarity) * 28);
    const matchPercent = Math.round(visual.similarity * 100);
    score -= runAuto ? visualPenalty : Math.round(visualPenalty * 0.5);
    findings.push("Compared the selected uploaded photo to the selected generic reference photo.");
    if (bestGeneric.changed && allowPhotoSwitch) {
      findings.push(`Auto-selected ${bestGeneric.reference.name} as the best generic match (${Math.round(bestGeneric.coverage * 100)}% planogram coverage).`);
    } else if (bestGeneric.changed) {
      findings.push(`Auto-selected ${bestGeneric.reference.name} as the best generic match for the selected photo (${Math.round(bestGeneric.coverage * 100)}% planogram coverage).`);
    }
    if (allowPhotoSwitch && bestGeneric.photoMatches?.length > 1) {
      bestGeneric.photoMatches.forEach((match) => {
        findings.push(`Photo ${match.photoIndex + 1}: best generic match is ${match.reference.name} (${Math.round(match.coverage * 100)}% planogram coverage).`);
      });
    }
    if (bestPhoto.changed) findings.push("Auto-selected the uploaded photo that best matches the selected generic reference.");
    findings.push(`Selected photo is an estimated ${matchPercent}% visual match to the selected generic photo.`);
    if (visual.similarity < 0.72) findings.push("Uploaded photo differs from the generic reference.");
  } else if (actual && reference) {
    findings.push("Photo comparison was limited by image access rules.");
  }

  if (autoResult.available) {
    findings.push(`Auto-check: ${autoResult.markedItems} present, ${autoResult.missingItems} missing, ${autoResult.unverifiedItems} need review.`);
    autoResult.shelves.forEach((shelf) => {
      findings.push(`Shelf ${shelf.shelf}: ${shelf.markedItems} present, ${shelf.missingItems} missing, ${shelf.unverifiedItems} need review (${Math.round(shelf.averageSimilarity * 100)}% average match).`);
    });
  } else if (getActivePlanogram() && !autoResult.skipped) {
    findings.push("Planogram auto-check could not run for the selected photos.");
  }

  if (autoChecklistResult.updated) {
    findings.push(`Auto-updated missing checklist: ${missingItems.length ? missingItems.join("; ") : "no checklist items marked missing"}.`);
  }

  if (assistantFinding) findings.push(`Assistant correction: ${assistantFinding}`);

  missingItems.forEach((item) => {
    score -= MISSING_ITEM_DEDUCTION;
    findings.push(`-${MISSING_ITEM_DEDUCTION} points: missing ${item}.`);
  });
  const confirmedMissingPlanogramItems = missingPlanogramItems.slice(0, 12);
  confirmedMissingPlanogramItems.forEach((itemKey) => {
    score -= PLANOGRAM_ITEM_DEDUCTION;
    findings.push(`-${PLANOGRAM_ITEM_DEDUCTION} point: likely missing ${planogramLabelFromKey(itemKey)}.`);
  });
  if (missingPlanogramItems.length > confirmedMissingPlanogramItems.length) {
    findings.push(`${missingPlanogramItems.length - confirmedMissingPlanogramItems.length} additional planogram item(s) need review but were not deducted.`);
  }
  score = Math.max(0, Math.min(100, Math.round(score)));

  review.score = score;
  review.selectedActualSrc = actual;
  review.scoredAt = new Date().toISOString();
  review.findings = findings;
  if (state.taskType === "display") {
    const categoryScores = await scoreDisplayCategories(task, state.selectedSite, review);
    review.categoryScores = categoryScores;
    review.score = displayScoreRollup(categoryScores, score);
    if (allowPhotoSwitch) {
      review.referenceId = categoryScores.vegetable.actual
        ? categoryScores.vegetable.referenceId
        : categoryScores.fruit.referenceId || review.referenceId;
      review.selectedActualSrc = categoryScores.vegetable.actual || categoryScores.fruit.actual || actual;
    } else {
      review.selectedActualSrc = actual;
    }
    const fruitText = Number.isFinite(review.categoryScores?.fruit?.score) ? `${review.categoryScores.fruit.score}/100` : "--";
    const vegetableText = Number.isFinite(review.categoryScores?.vegetable?.score) ? `${review.categoryScores.vegetable.score}/100` : "--";
    findings.push(categoryScoreFinding("Fruit", categoryScores.fruit));
    findings.push(categoryScoreFinding("Vegetable", categoryScores.vegetable));
    findings.push(`Separate scores: Fruit ${fruitText}; Vegetable ${vegetableText}.`);
  }
  persistReviews();
  renderMetrics();
  renderStoreList();
  renderDetail();
  renderFindings(findings);
}

async function chooseBestActualPhotoForReference(task, review, reference, currentActual) {
  if (!reference) return { src: currentActual, similarity: 0, changed: false };
  const candidates = [...new Set([review.actualOverride, ...(getTaskImages(task) || []), currentActual].filter(Boolean))];
  if (candidates.length <= 1) return { src: currentActual, similarity: 0, changed: false };

  let best = { src: currentActual || candidates[0], similarity: -1 };
  for (const candidate of candidates) {
    const result = await compareImages(candidate, reference);
    if (result.available && result.similarity > best.similarity) {
      best = { src: candidate, similarity: result.similarity };
    }
  }
  const currentResult = currentActual ? await compareImages(currentActual, reference) : { available: false, similarity: -1 };
  const shouldSwitch = best.src !== currentActual && best.similarity > (currentResult.similarity || 0) + 0.03;
  return {
    src: shouldSwitch ? best.src : currentActual,
    similarity: best.similarity,
    changed: shouldSwitch
  };
}

function autoUpdateMissingChecklist({ task, actual, reference, visual, missingPlanogramItems, review }) {
  const missing = new Set();
  const totalPlanogramItems = planogramItemCount(getActivePlanogramId());
  const missingPlanogramRatio = totalPlanogramItems ? missingPlanogramItems.length / totalPlanogramItems : 0;

  if (!task || !actual || !reference || (visual.available && visual.similarity < 0.42)) {
    missing.add("Correct display case");
  }

  if (visual.available && visual.similarity < 0.38) {
    missing.add("Clean glass and shelving");
  }

  if (missingPlanogramRatio >= 0.85 && visual.available && visual.similarity < 0.35) {
    missing.add("Product is faced and organized");
  }

  if (visual.available && visual.similarity < 0.40) {
    missing.add("Tags and pricing are visible");
  }

  if (missingPlanogramRatio >= 0.85 && visual.available && visual.similarity < 0.35) {
    missing.add("No visible out of stocks");
  }

  if (visual.available && visual.similarity < 0.45) {
    missing.add("No clutter or misplaced items");
  }

  review.missingItems = ITEMS.filter((item) => missing.has(item));
  return { updated: true, missingItems: review.missingItems };
}

async function autoMarkLikelyPlanogramItems(actualSrc, referenceSrc, planogramId, review) {
  const planogram = PLANOGRAMS[planogramId];
  if (!planogram || !actualSrc || !referenceSrc) return { available: false, markedItems: 0, markedShelves: [], shelves: [] };

  const itemComparison = await comparePlanogramItemSections(actualSrc, referenceSrc, planogram);
  if (!itemComparison.available) return { available: false, markedItems: 0, markedShelves: [], shelves: [] };

  const present = new Set();
  const missing = new Set();
  const unverified = new Set();
  const shelves = itemComparison.shelves.map((shelf) => {
    shelf.items.forEach((item) => {
      const key = planogramItemKey(shelf.shelf, item.name);
      if (item.marked) {
        present.add(key);
      } else if (item.missing) {
        missing.add(key);
      } else {
        unverified.add(key);
      }
    });
    return {
      shelf: shelf.shelf,
      itemCount: shelf.items.length,
      markedItems: shelf.items.filter((item) => item.marked).length,
      missingItems: shelf.items.filter((item) => item.missing).length,
      unverifiedItems: shelf.items.filter((item) => !item.marked && !item.missing).length,
      averageSimilarity: shelf.averageSimilarity,
      items: shelf.items
    };
  });

  review.presentPlanogramItems = {
    ...(review.presentPlanogramItems || {}),
    [planogramId]: [...present]
  };
  review.missingPlanogramItems = {
    ...(review.missingPlanogramItems || {}),
    [planogramId]: [...missing]
  };
  review.unverifiedPlanogramItems = {
    ...(review.unverifiedPlanogramItems || {}),
    [planogramId]: [...unverified]
  };

  const markedShelves = shelves.filter((shelf) => shelf.markedItems > 0);
  return {
    available: true,
    markedItems: shelves.reduce((sum, shelf) => sum + shelf.markedItems, 0),
    missingItems: shelves.reduce((sum, shelf) => sum + shelf.missingItems, 0),
    unverifiedItems: shelves.reduce((sum, shelf) => sum + shelf.unverifiedItems, 0),
    markedShelves,
    shelves
  };
}

async function comparePlanogramItemSections(actualSrc, referenceSrc, planogram) {
  try {
    const [actualImage, referenceImage] = await Promise.all([loadComparableImage(actualSrc), loadComparableImage(referenceSrc)]);
    const actualBounds = imageContentBounds(actualImage);
    const referenceBounds = imageContentBounds(referenceImage);
    const shelfCount = planogram.shelves.length;
    const edgePadding = 0.03;
    const shelfYRange = normalizedShelfRange;
    const shelves = planogram.shelves.map((shelf, shelfIndex) => {
      const { startY, endY } = shelfYRange(shelfIndex, shelfCount);
      const edgeShelf = shelfIndex === 0 || shelfIndex === shelfCount - 1;
      const baseThreshold = edgeShelf ? 0.48 : 0.58;
      const rawItems = shelf.items.map((item, itemIndex) => {
        const slotWidth = 1 / shelf.items.length;
        const startX = Math.min(0.97, itemIndex * slotWidth + slotWidth * edgePadding);
        const endX = Math.max(startX + 0.01, (itemIndex + 1) * slotWidth - slotWidth * edgePadding);
        const reference = regionSignature(referenceImage, startX, endX, startY, endY, referenceBounds);
        const match = bestAlignedRegionSimilarity(actualImage, reference, startX, endX, startY, endY, actualBounds, slotWidth, shelfIndex, shelfCount);
        return {
          name: item,
          similarity: match.similarity,
          productRatio: match.productRatio,
          darkDelta: match.darkDelta,
          actualProduct: match.actualProduct,
          referenceProduct: match.referenceProduct,
          referenceMode: reference.mode || ""
        };
      });
      const averageSimilarity = rawItems.reduce((sum, item) => sum + item.similarity, 0) / Math.max(1, rawItems.length);
      const maxSimilarity = Math.max(...rawItems.map((item) => item.similarity), 0);
      const adaptiveThreshold = Math.max(baseThreshold, Math.min(edgeShelf ? 0.62 : 0.7, averageSimilarity + (edgeShelf ? 0.02 : 0.03)));
      const missingThreshold = edgeShelf ? 0.22 : 0.26;
      const items = rawItems.map((item) => {
        const planogramMode = item.referenceMode === "planogram";
        const minimumFill = edgeShelf ? 0.12 : 0.15;
        const enoughFill = (item.productRatio >= (edgeShelf ? 0.28 : 0.32) && item.actualProduct >= (planogramMode ? minimumFill * 0.65 : minimumFill))
          || item.actualProduct >= (edgeShelf ? 0.18 : 0.22);
        const strongFill = item.productRatio >= (edgeShelf ? 0.42 : 0.48) && item.actualProduct >= (planogramMode ? minimumFill * 0.65 : minimumFill);
        const emptyShelf = item.productRatio <= (edgeShelf ? 0.12 : 0.16) && item.actualProduct <= (edgeShelf ? 0.1 : 0.12);
        const darkEmpty = !planogramMode && item.darkDelta >= (edgeShelf ? 0.18 : 0.12) && item.productRatio <= (edgeShelf ? 0.46 : 0.52);
        const similarityMissing = item.similarity <= missingThreshold && item.productRatio <= (planogramMode ? (edgeShelf ? 0.16 : 0.2) : (edgeShelf ? 0.32 : 0.38));
        const marked = (item.similarity >= adaptiveThreshold && enoughFill)
          || (strongFill && item.similarity >= (edgeShelf ? 0.36 : 0.4))
          || (edgeShelf && enoughFill && item.similarity >= 0.4 && item.similarity >= maxSimilarity - 0.12);
        const missing = !marked && !planogramMode && (emptyShelf || darkEmpty || similarityMissing);
        return {
          ...item,
          marked,
          missing,
          threshold: adaptiveThreshold,
          missingThreshold
        };
      });
      return { shelf: shelf.shelf, averageSimilarity, threshold: adaptiveThreshold, items };
    });
    return { available: true, shelves };
  } catch {
    return { available: false, shelves: [] };
  }
}

async function compareShelfBands(actualSrc, referenceSrc, shelfCount) {
  try {
    const [actualImage, referenceImage] = await Promise.all([loadComparableImage(actualSrc), loadComparableImage(referenceSrc)]);
    const actualBounds = imageContentBounds(actualImage);
    const referenceBounds = imageContentBounds(referenceImage);
    const scores = [];
    for (let index = 0; index < shelfCount; index += 1) {
      const start = index / shelfCount;
      const end = (index + 1) / shelfCount;
      const actual = regionSignature(actualImage, 0, 1, start, end, actualBounds);
      const reference = regionSignature(referenceImage, 0, 1, start, end, referenceBounds);
      scores.push(signatureSimilarity(actual, reference));
    }
    return { available: true, scores };
  } catch {
    return { available: false, scores: [] };
  }
}

function normalizedShelfRange(shelfIndex, shelfCount) {
  const verticalInset = 0.055;
  const usableHeight = 1 - verticalInset * 2;
  const startY = verticalInset + usableHeight * (shelfIndex / shelfCount);
  const endY = verticalInset + usableHeight * ((shelfIndex + 1) / shelfCount);
  return { startY, endY };
}

function loadComparableImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      image._complianceSrc = src;
      resolve(image);
    };
    image.onerror = reject;
    image.src = src;
  });
}

function imageContentBounds(image) {
  const fixedBounds = fixedReferenceBounds(image._complianceSrc || image.src || "");
  if (fixedBounds) return fixedBounds;

  const displayBounds = image.naturalWidth / Math.max(1, image.naturalHeight) > 1.15
    ? detectDisplayCaseBounds(image)
    : null;
  if (displayBounds) return displayBounds;

  return genericImageContentBounds(image);
}

function genericImageContentBounds(image) {
  const width = 140;
  const height = 140;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(image, 0, 0, width, height);
  const data = ctx.getImageData(0, 0, width, height).data;
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
  let hits = 0;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = (y * width + x) * 4;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];
      const brightness = (r + g + b) / 3;
      const colorSpread = Math.max(r, g, b) - Math.min(r, g, b);
      const isMerchandise = brightness < 236 || colorSpread > 28;
      if (!isMerchandise) continue;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
      hits += 1;
    }
  }

  if (hits < width * height * 0.08) return { x: 0, y: 0, width: 1, height: 1 };
  const padX = Math.round(width * 0.015);
  const padY = Math.round(height * 0.015);
  return {
    x: Math.max(0, (minX - padX) / width),
    y: Math.max(0, (minY - padY) / height),
    width: Math.min(width, maxX + padX) / width - Math.max(0, (minX - padX) / width),
    height: Math.min(height, maxY + padY) / height - Math.max(0, (minY - padY) / height)
  };
}

function detectDisplayCaseBounds(image) {
  const width = 180;
  const height = 135;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(image, 0, 0, width, height);
  const data = ctx.getImageData(0, 0, width, height).data;
  const rowScores = Array(height).fill(0);
  const colScores = Array(width).fill(0);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = (y * width + x) * 4;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];
      const brightness = (r + g + b) / 3;
      const spread = Math.max(r, g, b) - Math.min(r, g, b);
      const product = brightness > 82 && (spread > 20 || brightness > 135) ? 1 : 0;
      const darkCase = brightness < 68 ? 1 : 0;
      const colorful = brightness > 62 && spread > 26 ? 1 : 0;
      const glare = brightness > 236 && spread < 20 ? 1 : 0;
      const score = product * 1.3 + colorful * 0.65 + darkCase * 0.35 - glare * 0.35;
      rowScores[y] += score;
      colScores[x] += score;
    }
  }

  const rowSpan = strongestScoreSpan(rowScores.map((score) => score / width), 0.16, Math.round(height * 0.48));
  const colSpan = strongestScoreSpan(colScores.map((score) => score / height), 0.14, Math.round(width * 0.52));
  if (!rowSpan || !colSpan) return null;

  let x = Math.max(0.03, colSpan.start / width - 0.015);
  let y = Math.max(0.045, rowSpan.start / height - 0.02);
  let right = Math.min(0.97, (colSpan.end + 1) / width + 0.015);
  let bottom = Math.min(0.95, (rowSpan.end + 1) / height + 0.02);

  if (right - x > 0.95) {
    x = 0.035;
    right = 0.965;
  }
  if (bottom - y > 0.91) {
    y = 0.055;
    bottom = 0.94;
  }

  if (right - x < 0.45 || bottom - y < 0.45) return null;
  return { x, y, width: right - x, height: bottom - y };
}

function strongestScoreSpan(scores, threshold, minimumLength) {
  let best = null;
  let start = null;
  let sum = 0;

  scores.forEach((score, index) => {
    if (score >= threshold) {
      if (start === null) start = index;
      sum += score;
    } else if (start !== null) {
      const end = index - 1;
      if (end - start + 1 >= minimumLength && (!best || sum > best.sum)) best = { start, end, sum };
      start = null;
      sum = 0;
    }
  });

  if (start !== null) {
    const end = scores.length - 1;
    if (end - start + 1 >= minimumLength && (!best || sum > best.sum)) best = { start, end, sum };
  }

  if (best) return best;

  const average = scores.reduce((total, score) => total + score, 0) / Math.max(1, scores.length);
  const looseThreshold = Math.max(threshold * 0.6, average * 0.7);
  let looseStart = scores.findIndex((score) => score >= looseThreshold);
  if (looseStart < 0) return null;
  let looseEnd = scores.length - 1;
  for (let index = scores.length - 1; index >= 0; index -= 1) {
    if (scores[index] >= looseThreshold) {
      looseEnd = index;
      break;
    }
  }
  if (looseEnd - looseStart + 1 < minimumLength) return null;
  return { start: looseStart, end: looseEnd, sum: 0 };
}

function fixedReferenceBounds(src) {
  if (src.includes("display-case-4ft-vegetable-100-compliant")) {
    return { x: 0.01, y: 0.09, width: 0.9, height: 0.79, mode: "planogram" };
  }
  if (src.includes("display-case-4ft-fruit-100-compliant")) {
    return { x: 0.03, y: 0.07, width: 0.92, height: 0.88, mode: "planogram" };
  }
  if (src.includes("display-case-6ft-fruit-100-compliant")) {
    return { x: 0.02, y: 0.08, width: 0.93, height: 0.79, mode: "planogram" };
  }
  if (src.includes("display-case-8ft-fruit-100-compliant")) {
    return { x: 0.01, y: 0.08, width: 0.96, height: 0.88, mode: "planogram" };
  }
  if (src.includes("destination-bunker-100-compliant")) {
    return { x: 0.04, y: 0.04, width: 0.92, height: 0.88 };
  }
  return null;
}

function bestAlignedRegionSimilarity(image, referenceSignature, startXRatio, endXRatio, startYRatio, endYRatio, bounds, slotWidth, shelfIndex, shelfCount) {
  const horizontalShifts = [-0.18, -0.1, 0, 0.1, 0.18];
  const shelfHeight = endYRatio - startYRatio;
  const edgeShelf = shelfIndex === 0 || shelfIndex === shelfCount - 1;
  const verticalShifts = edgeShelf ? [-0.18, -0.09, 0, 0.09, 0.18] : [-0.08, 0, 0.08];
  let best = { similarity: 0, productRatio: 0, darkDelta: 0, actualProduct: 0, referenceProduct: referenceSignature.product };
  horizontalShifts.forEach((horizontalShift) => {
    const shiftedStart = Math.max(0, Math.min(0.98, startXRatio + slotWidth * horizontalShift));
    const shiftedEnd = Math.max(shiftedStart + 0.01, Math.min(1, endXRatio + slotWidth * horizontalShift));
    verticalShifts.forEach((verticalShift) => {
      const shiftedYStart = Math.max(0, Math.min(0.98, startYRatio + shelfHeight * verticalShift));
      const shiftedYEnd = Math.max(shiftedYStart + 0.01, Math.min(1, endYRatio + shelfHeight * verticalShift));
      const actual = regionSignature(image, shiftedStart, shiftedEnd, shiftedYStart, shiftedYEnd, bounds);
      const occupancyRatio = referenceSignature.occupied > 0.05 ? actual.occupied / referenceSignature.occupied : 1;
      const productRatio = referenceSignature.product > 0.05 ? actual.product / referenceSignature.product : 1;
      const darkDelta = actual.dark - referenceSignature.dark;
      const planogramMode = referenceSignature.mode === "planogram";
      const occupancyPenalty = occupancyRatio < 0.45 ? (planogramMode ? 0.16 : 0.28) : occupancyRatio < 0.65 ? (planogramMode ? 0.08 : 0.14) : 0;
      const productPenalty = productRatio < 0.34 ? (planogramMode ? 0.18 : 0.32) : productRatio < 0.55 ? (planogramMode ? 0.08 : 0.16) : 0;
      const darkPenalty = !planogramMode && darkDelta > 0.28 && productRatio < 0.65 ? 0.12 : 0;
      const similarity = Math.max(0, signatureSimilarity(actual, referenceSignature) - occupancyPenalty - productPenalty - darkPenalty);
      if (similarity > best.similarity) {
        best = {
          similarity,
          productRatio,
          darkDelta,
          actualProduct: actual.product,
          referenceProduct: referenceSignature.product
        };
      }
    });
  });
  return best;
}

function regionSignature(image, startXRatio, endXRatio, startYRatio, endYRatio, bounds = { x: 0, y: 0, width: 1, height: 1 }) {
  const width = 24;
  const height = 12;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const sourceX = Math.round(image.naturalWidth * (bounds.x + bounds.width * startXRatio));
  const sourceY = Math.round(image.naturalHeight * (bounds.y + bounds.height * startYRatio));
  const sourceWidth = Math.max(1, Math.round(image.naturalWidth * bounds.width * (endXRatio - startXRatio)));
  const sourceHeight = Math.max(1, Math.round(image.naturalHeight * bounds.height * (endYRatio - startYRatio)));
  ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, width, height);
  const data = ctx.getImageData(0, 0, width, height).data;
  let r = 0;
  let g = 0;
  let b = 0;
  let contrast = 0;
  let occupied = 0;
  let saturated = 0;
  let product = 0;
  let dark = 0;
  let bright = 0;
  const cells = [];
  for (let i = 0; i < data.length; i += 4) {
    const red = data[i];
    const green = data[i + 1];
    const blue = data[i + 2];
    const brightness = (red + green + blue) / 3;
    const spread = Math.max(red, green, blue) - Math.min(red, green, blue);
    r += red;
    g += green;
    b += blue;
    contrast += Math.abs(red - green) + Math.abs(green - blue);
    if (brightness > 58 && (spread > 16 || brightness > 112)) occupied += 1;
    if (spread > 24) saturated += 1;
    if (brightness > 82 && (spread > 20 || brightness > 135)) product += 1;
    if (brightness < 52) dark += 1;
    if (brightness > 145) bright += 1;
    cells.push(brightness);
  }
  const pixels = data.length / 4;
  return {
    r: r / pixels,
    g: g / pixels,
    b: b / pixels,
    brightness: (r + g + b) / (pixels * 3),
    contrast: contrast / pixels,
    occupied: occupied / pixels,
    saturated: saturated / pixels,
    product: product / pixels,
    dark: dark / pixels,
    bright: bright / pixels,
    mode: bounds.mode || "",
    cells
  };
}

function signatureSimilarity(actual, reference) {
  const colorDistance = Math.sqrt(
    Math.pow(actual.r - reference.r, 2) +
    Math.pow(actual.g - reference.g, 2) +
    Math.pow(actual.b - reference.b, 2)
  ) / 441.7;
  const brightnessDistance = Math.abs(actual.brightness - reference.brightness) / 255;
  const contrastDistance = Math.min(1, Math.abs(actual.contrast - reference.contrast) / 255);
  const occupiedDistance = Math.abs(actual.occupied - reference.occupied);
  const saturatedDistance = Math.abs(actual.saturated - reference.saturated);
  const productDistance = Math.abs(actual.product - reference.product);
  const darkDistance = Math.abs(actual.dark - reference.dark);
  const brightDistance = Math.abs(actual.bright - reference.bright);
  const cellDistance = actual.cells?.length
    ? actual.cells.reduce((sum, value, index) => sum + Math.abs(value - reference.cells[index]), 0) / (actual.cells.length * 255)
    : 0;
  if (reference.mode === "planogram") {
    return 1 - Math.min(1, colorDistance * 0.08 + contrastDistance * 0.08 + occupiedDistance * 0.18 + saturatedDistance * 0.1 + productDistance * 0.38 + Math.max(0, reference.product - actual.product) * 0.18);
  }
  return 1 - Math.min(1, colorDistance * 0.14 + brightnessDistance * 0.08 + contrastDistance * 0.1 + cellDistance * 0.28 + occupiedDistance * 0.1 + saturatedDistance * 0.05 + productDistance * 0.16 + darkDistance * 0.07 + brightDistance * 0.02);
}

async function imageCategoryLikelihood(src, category) {
  if (!src || !category) return 0.5;
  const cacheKey = `${category}:${src}`;
  if (IMAGE_FEATURE_CACHE.has(cacheKey)) return IMAGE_FEATURE_CACHE.get(cacheKey);

  try {
    const image = await loadComparableImage(src);
    const features = imageCategoryFeatures(image);
    const likelihood = category === "vegetable"
      ? clamp01(0.1 + features.dark * 0.75 + features.shelfLines * 0.65 + features.verticalDark * 0.35 + features.green * 0.15 - features.red * 0.45 - features.bright * 0.15)
      : clamp01(0.22 + features.red * 0.7 + features.orange * 0.25 + features.product * 0.3 + (1 - features.dark) * 0.23 - features.shelfLines * 0.08);
    IMAGE_FEATURE_CACHE.set(cacheKey, likelihood);
    return likelihood;
  } catch {
    return 0.5;
  }
}

async function imageWallCaseLikelihood(src) {
  if (!src) return 0.5;
  const cacheKey = `wall-case:${src}`;
  if (IMAGE_FEATURE_CACHE.has(cacheKey)) return IMAGE_FEATURE_CACHE.get(cacheKey);

  try {
    const image = await loadComparableImage(src);
    const features = imageCategoryFeatures(image);
    const likelihood = clamp01(
      0.02 +
      features.verticalDark * 1.05 +
      features.dark * 0.65 +
      features.centerDark * 0.35 +
      features.topDark * 0.2 +
      features.product * 0.12 -
      features.bright * 0.18
    );
    IMAGE_FEATURE_CACHE.set(cacheKey, likelihood);
    return likelihood;
  } catch {
    return 0.5;
  }
}

function imageCategoryFeatures(image) {
  const width = 160;
  const height = 120;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(image, 0, 0, width, height);
  const data = ctx.getImageData(0, 0, width, height).data;
  const rowDark = Array(height).fill(0);
  const colDark = Array(width).fill(0);
  const totals = { dark: 0, product: 0, red: 0, green: 0, orange: 0, bright: 0 };

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = (y * width + x) * 4;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];
      const brightness = (r + g + b) / 3;
      const spread = Math.max(r, g, b) - Math.min(r, g, b);
      const isDark = brightness < 55;
      if (isDark) {
        totals.dark += 1;
        rowDark[y] += 1;
        colDark[x] += 1;
      }
      if (brightness > 82 && (spread > 20 || brightness > 135)) totals.product += 1;
      if (r > g * 1.08 && r > b * 1.08 && brightness > 70) totals.red += 1;
      if (g > r * 1.04 && g > b * 1.04 && brightness > 65) totals.green += 1;
      if (r > 130 && g > 70 && g < 190 && b < 120) totals.orange += 1;
      if (brightness > 170) totals.bright += 1;
    }
  }

  const pixels = width * height;
  return {
    dark: totals.dark / pixels,
    product: totals.product / pixels,
    red: totals.red / pixels,
    green: totals.green / pixels,
    orange: totals.orange / pixels,
    bright: totals.bright / pixels,
    shelfLines: rowDark.filter((count) => count / width > 0.55).length / height,
    verticalDark: colDark.filter((count) => count / height > 0.55).length / width,
    topDark: rowDark.slice(0, 20).reduce((sum, count) => sum + count, 0) / Math.max(1, width * 20),
    centerDark: colDark.slice(40, 120).reduce((sum, count) => sum + count, 0) / Math.max(1, height * 80)
  };
}

function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

function getSelectedActualPhoto() {
  return els.actualPhoto?.getAttribute("src") || "";
}

function planogramLabelFromKey(itemKey) {
  const [shelfPart, item] = itemKey.split(":");
  return `${item} (${shelfPart.replace("shelf-", "Shelf ")})`;
}

function openReferenceFullSize() {
  const reference = getReference();
  if (!reference) return;
  window.open(reference, "_blank", "noopener,noreferrer");
}

function openOriginalReferenceFullSize() {
  const src = els.originalReferencePhoto?.getAttribute("src") || "";
  if (!src) return;
  window.open(src, "_blank", "noopener,noreferrer");
}

function openActualFullSize() {
  const actual = getSelectedActualPhoto();
  if (!actual) return;
  window.open(actual, "_blank", "noopener,noreferrer");
}

async function compareImages(actualSrc, referenceSrc) {
  if (!actualSrc || !referenceSrc) return { available: false, similarity: 0 };

  try {
    const [actualImage, referenceImage] = await Promise.all([loadComparableImage(actualSrc), loadComparableImage(referenceSrc)]);
    const actualBounds = imageContentBounds(actualImage);
    const referenceBounds = imageContentBounds(referenceImage);
    const actual = regionSignature(actualImage, 0, 1, 0, 1, actualBounds);
    const reference = regionSignature(referenceImage, 0, 1, 0, 1, referenceBounds);
    return { available: true, similarity: signatureSimilarity(actual, reference) };
  } catch {
    return { available: false, similarity: 0 };
  }
}

function exportScores() {
  const header = ["Store", "Task Type", "Score", "Fruit Score", "Vegetable Score", "Status", "On Time", "Missing Items", "Missing Planogram Items", "Scored At", "Task Link"];
  const lines = [header];

  state.rows.forEach((row) => {
    ["display", "bunker"].forEach((type) => {
      const task = row[type];
      const review = state.reviews[`${row.site}:${type}`] || {};
      const taskScore = effectiveTaskScore(task, review);
      const missingPlanogramItems = getMissingPlanogramLabelsForReview(review);
      lines.push([
        row.site,
        type === "display" ? "Display Case" : "Destination Bunker",
        Number.isFinite(taskScore) ? taskScore : "",
        type === "display" && isComplete(task) && Number.isFinite(review.categoryScores?.fruit?.score) ? review.categoryScores.fruit.score : type === "display" && taskScore === 0 ? 0 : "",
        type === "display" && isComplete(task) && Number.isFinite(review.categoryScores?.vegetable?.score) ? review.categoryScores.vegetable.score : type === "display" && taskScore === 0 ? 0 : "",
        task?.status || "No task found",
        task?.onTime || "No task found",
        (review.missingItems || []).join("; "),
        missingPlanogramItems.join("; "),
        review.scoredAt || "",
        task?.taskLink || ""
      ]);
    });
  });

  downloadCsv(lines, "photo-compliance-scores.csv");
}

function saveSelectedLocationEmail() {
  const row = selectedRow();
  if (!row) return;
  const email = els.locationEmailInput.value.trim();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    els.emailStatus.textContent = "Enter a valid email address before saving.";
    return;
  }
  if (email) state.locationEmails[row.site] = email;
  else delete state.locationEmails[row.site];
  saveJson(LOCATION_EMAILS_KEY, state.locationEmails);
  els.emailStatus.textContent = email ? `Saved ${email} for ${row.site}.` : `Removed saved email for ${row.site}.`;
}

function emailSelectedLocationReport() {
  const row = selectedRow();
  if (!row) return;
  const email = (els.locationEmailInput.value.trim() || state.locationEmails[row.site] || "").trim();
  if (email && email !== state.locationEmails[row.site]) {
    state.locationEmails[row.site] = email;
    saveJson(LOCATION_EMAILS_KEY, state.locationEmails);
  }
  const draft = buildComplianceEmailDraft(row, email);
  window.location.href = draft.mailto;
  els.emailStatus.textContent = email
    ? `Opened email draft for ${row.site}.`
    : "Opened email draft without a saved address. Add an email to send directly to this location.";
}

function downloadSelectedStoreReport() {
  const row = selectedRow();
  if (!row) return;
  const draft = buildComplianceEmailDraft(row, state.locationEmails[row.site] || "");
  const reportDate = state.selectedDate || todayIsoDate();
  const fileName = `photo-compliance-${safeFilePart(row.site)}-${reportDate}.txt`;
  const body = [
    draft.subject,
    "",
    draft.body
  ].join("\n");
  downloadText(body, fileName);
  els.emailStatus.textContent = `Downloaded report for ${row.site}.`;
}

function exportComplianceEmailDrafts() {
  const header = ["Store", "Email", "Subject", "Body", "Mailto Link"];
  const lines = [header];
  state.rows.forEach((row) => {
    const email = state.locationEmails[row.site] || "";
    const draft = buildComplianceEmailDraft(row, email);
    lines.push([row.site, email, draft.subject, draft.body, draft.mailto]);
  });
  downloadCsv(lines, "photo-compliance-email-drafts.csv");
}

function buildComplianceEmailDraft(row, email = "") {
  const displayTask = row.display;
  const bunkerTask = row.bunker;
  const displayReview = state.reviews[`${row.site}:display`] || {};
  const bunkerReview = state.reviews[`${row.site}:bunker`] || {};
  const reportDate = state.selectedDate || todayIsoDate();
  const subject = `Compliance Report - ${row.site} - ${reportDate}`;
  const body = [
    `Hello ${row.site},`,
    "",
    `Here is your photo compliance report for ${reportDate}.`,
    "",
    formatTaskReport("Display Case", displayTask, displayReview),
    "",
    formatTaskReport("Destination Bunker", bunkerTask, bunkerReview),
    "",
    "Please review the missing or unverified items and correct the display before the next upload.",
    "",
    "Thank you."
  ].join("\n");
  const mailto = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return { subject, body, mailto };
}

function formatTaskReport(label, task, review) {
  const missingChecklist = review.missingItems?.length ? review.missingItems.join("; ") : "None marked";
  const missingPlanogram = getMissingPlanogramLabelsForReview(review);
  const findings = review.findings?.length ? review.findings.slice(0, 12).join("; ") : "No saved compliance findings";
  const categoryLines = label === "Display Case"
    ? [
        `Fruit score: ${Number.isFinite(review.categoryScores?.fruit?.score) ? `${review.categoryScores.fruit.score}/100` : "Not scored yet"}`,
        `Vegetable score: ${Number.isFinite(review.categoryScores?.vegetable?.score) ? `${review.categoryScores.vegetable.score}/100` : "Not scored yet"}`
      ]
    : [];
  return [
    `${label}`,
    `Score: ${Number.isFinite(review.score) ? `${review.score}/100` : "Not scored yet"}`,
    ...categoryLines,
    `Status: ${task?.status || "No task found"}`,
    `On time: ${task?.onTime || "No task found"}`,
    `Completed/Due: ${task?.completedOrDue || "--"}`,
    `Timing: ${task?.timing || "--"}`,
    `Missing checklist items: ${missingChecklist}`,
    `Missing planogram items: ${missingPlanogram.length ? missingPlanogram.join("; ") : "None marked"}`,
    `Findings: ${findings}`,
    `Trail task: ${task?.taskLink || "No link"}`,
    `Photos: ${task?.photoLink || "No link"}`
  ].join("\n");
}

function getMissingPlanogramLabelsForReview(review) {
  const missingPlanogramItems = review.missingPlanogramItems || {};
  return Object.entries(missingPlanogramItems).flatMap(([planogramId, missingItems]) => {
    const planogram = PLANOGRAMS[planogramId];
    if (!planogram) return [];
    return (missingItems || []).map(planogramLabelFromKey);
  });
}

function downloadCsv(lines, filename) {
  const csv = lines.map((line) => line.map(csvCell).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  downloadBlob(blob, filename);
}

function downloadText(text, filename) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  downloadBlob(blob, filename);
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function safeFilePart(value) {
  return String(value || "store")
    .trim()
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase() || "store";
}

function readUpload(event, callback) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => callback(reader.result);
  reader.readAsDataURL(file);
  event.target.value = "";
}

function setImage(image, src) {
  image.removeAttribute("src");
  if (src) image.src = src;
}

function getRowStatus(row) {
  if (!row.display || !row.bunker) return "missing";
  if (isLate(row.display) || isLate(row.bunker)) return "late";
  if (!isComplete(row.display) || !isComplete(row.bunker)) return "needs-review";
  if (!getTaskImages(row.display).length || !getTaskImages(row.bunker).length) return "needs-review";
  return "complete";
}

function getStoreSubtext(row) {
  const display = row.display?.status || "No display task";
  const bunker = row.bunker?.status || "No bunker task";
  return `${display} | ${bunker}`;
}

function statusColor(status) {
  if (status === "complete") return "green";
  if (status === "late") return "red";
  if (status === "needs-review") return "yellow";
  return "";
}

function badgeColor(task) {
  if (!task) return "var(--gray)";
  if (isLate(task)) return "var(--red)";
  if (!isComplete(task)) return "var(--yellow)";
  return "var(--green)";
}

function isComplete(task) {
  return Boolean(task?.status?.startsWith("Completed"));
}

function isLate(task) {
  const status = normalizeText(task?.status);
  const onTime = normalizeText(task?.onTime);
  const completedOrDue = normalizeText(task?.completedOrDue);
  return status.includes("late") ||
    status.includes("overdue") ||
    onTime.includes("late") ||
    onTime.includes("overdue") ||
    completedOrDue.startsWith("task was due");
}

function persistReviews() {
  saveJson(REVIEW_KEY, state.reviews);
  updateReviewSnapshotElement();
}

function updateReviewSnapshotElement() {
  let snapshot = document.getElementById("reviewSnapshot");
  if (!snapshot) {
    snapshot = document.createElement("script");
    snapshot.id = "reviewSnapshot";
    snapshot.type = "application/json";
    document.body.appendChild(snapshot);
  }
  snapshot.textContent = JSON.stringify({
    generatedAt: new Date().toISOString(),
    selectedDate: state.selectedDate,
    reviews: state.reviews
  });
}

function loadJson(key, fallback) {
  try {
    return JSON.parse(window.localStorage?.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key, value) {
  try {
    window.localStorage?.setItem(key, JSON.stringify(value));
  } catch {
    // Some embedded or privacy-restricted browsers block local storage.
  }
}

function csvCell(value) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}
