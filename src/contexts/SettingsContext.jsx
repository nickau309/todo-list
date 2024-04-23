"use client";

import React, { createContext, useContext } from "react";

const theme = {
  className: "theme_todoist",
  name: "Todoist",
};

const ThemeContext = createContext(theme);

export function SettingsProvider({ children }) {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
