import { THEME_ITEMS } from "@/constants/settings";
import { useLocalSettings } from "@/contexts/local-settings-context";
import { usePrefersColorScheme } from "@/contexts/prefers-color-scheme-context";
import type { ThemeType } from "@/types/user";

export default function useTheme() {
  const { theme, useSystemTheme } = useLocalSettings();

  const isDark = usePrefersColorScheme();

  const themeName: ThemeType = useSystemTheme && isDark ? "DARK" : theme;

  return THEME_ITEMS.find((t) => t.name === themeName) ?? THEME_ITEMS[0];
}
