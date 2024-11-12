import { NAV_MENU_ITEMS, THEME_ITEMS } from "@/constants/settings";
import type { User } from "@prisma/client";

export type DeleteAccountFormState = { message: string } | undefined;

export type NavMenuItemType = (typeof NAV_MENU_ITEMS)[number];

export type SettingsType = {
  "confirm-email": string;
  "confirm-password": string;
  email: string;
  "new-email": string;
  "new-password": string;
  password: string;
  reason: string;
} & Pick<User, "name" | "theme">;

export type ThemeItemType = (typeof THEME_ITEMS)[number];

export type UpdateEmailFormState = { message: string } | undefined;

export type UpdatePasswordFormState = { message: string } | undefined;
