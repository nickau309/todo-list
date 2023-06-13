import localforage from "localforage";
import themeData from "./themeData";

function cleanSettingsData({ ...data }) {
  if (typeof data.isAutoDark === "string") {
    data.isAutoDark = data.isAutoDark === "true";
  }

  if (Object.hasOwn(data, "themeName")) {
    if (themeData.every((t) => t.name !== data.themeName)) {
      throw new Error("Theme name is invalid.");
    }
  }

  return data;
}

export async function getSettings() {
  const settings = await localforage.getItem("settings");
  return settings ?? {};
}

async function setSettings(settings) {
  return await localforage.setItem("settings", settings);
}

export async function updateSettings(rawData) {
  const settings = await getSettings();

  // Update settings
  const data = cleanSettingsData(rawData);
  Object.assign(settings, data);

  // Set settings
  await setSettings(settings);

  return settings;
}

// Initialize
const keys = await localforage.keys();

if (!keys.includes("settings")) {
  await updateSettings({ isAutoDark: false, themeName: "Todoist" });
}
