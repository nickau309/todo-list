import React from "react";
import {
  AccountIcon24,
  BackUpIcon24,
  Cog8ToothLgIcon24,
  ExtensionIcon24,
  NotificationIcon24,
  ProductivityIcon24,
  QuickAddIcon24,
  ReminderIcon24,
  SidebarIcon24,
  SubscriptionIcon24,
  ThemeSmIcon24,
  ViewIcon24,
} from "@/assets";
import { ErrorComponent } from "@/components";
import SettingsTheme from "@/_pages/SettingsTheme";

const settingsTabsData = [
  {
    description: <span>Account</span>,
    element: <ErrorComponent errorText="Feature not implemented." />,
    icon: <AccountIcon24 />,
    path: "account",
  },
  {
    description: <span>General</span>,
    element: <ErrorComponent errorText="Feature not implemented." />,
    icon: <Cog8ToothLgIcon24 />,
    path: "general",
  },
  {
    description: <span>Advanced</span>,
    element: <ErrorComponent errorText="Feature not implemented." />,
    icon: <ViewIcon24 />,
    path: "advanced",
  },
  {
    description: <span>Subscription</span>,
    element: <ErrorComponent errorText="Feature not implemented." />,
    icon: <SubscriptionIcon24 />,
    path: "subscription",
  },
  {
    description: <span>Theme</span>,
    element: <SettingsTheme />,
    icon: <ThemeSmIcon24 />,
    path: "theme",
  },
  {
    description: <span>Sidebar</span>,
    element: <ErrorComponent errorText="Feature not implemented." />,
    icon: <SidebarIcon24 />,
    path: "sidebar",
  },
  {
    description: <span>Quick Add</span>,
    element: <ErrorComponent errorText="Feature not implemented." />,
    icon: <QuickAddIcon24 />,
    path: "quick-customization",
  },
  {
    description: <span>Productivity</span>,
    element: <ErrorComponent errorText="Feature not implemented." />,
    icon: <ProductivityIcon24 />,
    path: "productivity",
  },
  {
    description: (
      <div className="flex items-center gap-1">
        <span>Reminders</span>
        <span className="rounded-[3px] bg-badge-promote-fill px-1 py-px font-reactist text-[10px]/[13px] font-bold uppercase tracking-widest text-badge-promote-tint">
          Pro
        </span>
      </div>
    ),
    element: <ErrorComponent errorText="Feature not implemented." />,
    icon: <ReminderIcon24 />,
    path: "reminders",
  },
  {
    description: <span>Notifications</span>,
    element: <ErrorComponent errorText="Feature not implemented." />,
    icon: <NotificationIcon24 />,
    path: "notifications",
  },
  {
    description: (
      <div className="flex items-center gap-1">
        <span>Backups</span>
        <span className="rounded-[3px] bg-badge-promote-fill px-1 py-px font-reactist text-[10px]/[13px] font-bold uppercase tracking-widest text-badge-promote-tint">
          Pro
        </span>
      </div>
    ),
    element: <ErrorComponent errorText="Feature not implemented." />,
    icon: <BackUpIcon24 />,
    path: "backups",
  },
  {
    children: [
      {
        element: <ErrorComponent errorText="Feature not implemented." />,
        path: "*",
      },
    ],
    description: <span>Integrations</span>,
    element: <ErrorComponent errorText="Feature not implemented." />,
    icon: <ExtensionIcon24 />,
    path: "integrations",
  },
];

export default settingsTabsData;
