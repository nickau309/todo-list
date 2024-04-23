import {
  AccountIcon24,
  AppleSmIcon24,
  AppleLgIcon24,
  BackUpIcon24,
  Cog8ToothLgIcon24,
  ExtensionIcon24,
  FacebookIcon18,
  FacebookIcon25,
  GoogleIcon18,
  GoogleIcon25,
  NotificationLgIcon24,
  ProductivityIcon24,
  QuickAddIcon24,
  ReminderIcon24,
  SidebarIcon24,
  SubscriptionIcon24,
  ThemeIcon24,
  ViewIcon24,
} from "@/assets";

export const NAV_MENU_ITEMS = [
  {
    description: "Account",
    icon: <AccountIcon24 />,
    segment: "account",
    showUpgradeIcon: false,
  },
  {
    description: "General",
    icon: <Cog8ToothLgIcon24 />,
    segment: "general",
    showUpgradeIcon: false,
  },
  {
    description: "Advanced",
    icon: <ViewIcon24 />,
    segment: "advanced",
    showUpgradeIcon: false,
  },
  {
    description: "Subscription",
    icon: <SubscriptionIcon24 />,
    segment: "subscription",
    showUpgradeIcon: false,
  },
  {
    description: "Theme",
    icon: <ThemeIcon24 />,
    segment: "theme",
    showUpgradeIcon: false,
  },
  {
    description: "Sidebar",
    icon: <SidebarIcon24 />,
    segment: "sidebar",
    showUpgradeIcon: false,
  },
  {
    description: "Quick Add",
    icon: <QuickAddIcon24 />,
    segment: "quick-customization",
    showUpgradeIcon: false,
  },
  {
    description: "Productivity",
    icon: <ProductivityIcon24 />,
    segment: "productivity",
    showUpgradeIcon: false,
  },
  {
    description: "Reminders",
    icon: <ReminderIcon24 />,
    segment: "reminders",
    showUpgradeIcon: true,
  },
  {
    description: "Notifications",
    icon: <NotificationLgIcon24 />,
    segment: "notifications",
    showUpgradeIcon: false,
  },
  {
    description: "Backups",
    icon: <BackUpIcon24 />,
    segment: "backups",
    showUpgradeIcon: true,
  },
  {
    description: "Integrations",
    icon: <ExtensionIcon24 />,
    segment: "integrations",
    showUpgradeIcon: false,
  },
];

export const OAUTH_PROVIDERS = [
  {
    name: "Google",
    large_icon: GoogleIcon25,
    small_icon: GoogleIcon18,
  },
  {
    name: "Facebook",
    large_icon: FacebookIcon25,
    small_icon: FacebookIcon18,
  },
  {
    name: "Apple",
    large_icon: AppleSmIcon24,
    small_icon: AppleLgIcon24,
  },
];

export const THEME_ITEMS = [
  {
    className: "theme_todoist",
    name: "TODOIST",
  },
  {
    className: "theme_dark",
    name: "DARK",
  },
  {
    className: "theme_moonstone",
    name: "MOONSTONE",
  },
  {
    className: "theme_tangerine",
    name: "TANGERINE",
  },
  {
    className: "theme_kale",
    name: "KALE",
  },
  {
    className: "theme_blueberry",
    name: "BLUEBERRY",
  },
  {
    className: "theme_lavender",
    name: "LAVENDER",
  },
  {
    className: "theme_raspberry",
    name: "RASPBERRY",
  },
] as const;
