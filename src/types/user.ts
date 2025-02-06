import type { User } from "@prisma/client";
import { ProjectPreviewType } from "./project";

export type LocalSettingsType = {
  syncTheme: boolean;
  theme: ThemeType;
  useSystemTheme: boolean;
};

export type ThemeType = User["theme"];

export type UserType = Omit<User, "password"> & {
  projects: ProjectPreviewType[];
};
