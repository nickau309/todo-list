import { NAV_MENU_ITEMS, THEME_ITEMS } from "@/constants/settings";

export type DeleteAccountFormState = { message: string } | undefined;

export type NavMenuItemType = (typeof NAV_MENU_ITEMS)[number];

export type ThemeItemType = (typeof THEME_ITEMS)[number];

export type UpdateEmailFormState = { message: string } | undefined;

export type UpdatePasswordFormState = { message: string } | undefined;
