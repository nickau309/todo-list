/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { updateSettings } from "@/data";
import { SettingsView } from "@/layouts";

export async function action({ request }) {
  const formData = await request.formData();
  const { type, ...data } = Object.fromEntries(formData);

  if (type === "updateSettings") {
    await updateSettings(data);
  } else {
    throw new Error("Unknown type: " + type);
  }

  return null;
}

export default function Settings() {
  return <SettingsView />;
}
