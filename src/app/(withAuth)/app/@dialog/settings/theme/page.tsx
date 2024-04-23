import {
  CancelButton,
  CloseSettingsDialogButton,
  Footer,
  Header,
  OpenNavMenuButton,
  ShowChildrenIfIsDirty,
  SubmitButton,
} from "@/components/settings/form";
import {
  AutoDarkModeInput,
  ResetAfterSubmission,
  SyncThemeInput,
  ThemeInput,
  UpdateThemeForm,
} from "@/components/settings/theme";
import { NAV_MENU_ITEMS } from "@/constants/settings";
import { getUser } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Theme",
};

export default async function Page() {
  const user = await getUser();

  const currentItem =
    NAV_MENU_ITEMS.find((item) => item.segment === "theme") ??
    NAV_MENU_ITEMS[0];

  return (
    <>
      <ResetAfterSubmission />
      <UpdateThemeForm id={user.id}>
        <Header>
          <OpenNavMenuButton />
          <div className="flex min-w-0 flex-1 items-center gap-1">
            <h2 className="truncate font-bold">{currentItem.description}</h2>
          </div>
          <CloseSettingsDialogButton />
        </Header>
        <hr className="border-divider-primary" />
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto overflow-x-hidden p-4 pb-6">
          <p>
            Personalize your Todoist with colors to match your style, mood, and
            personality.
          </p>
          <SyncThemeInput />
          <AutoDarkModeInput />
          <ThemeInput />
        </div>
        <ShowChildrenIfIsDirty>
          <Footer>
            <CancelButton />
            <SubmitButton>Update</SubmitButton>
          </Footer>
        </ShowChildrenIfIsDirty>
      </UpdateThemeForm>
    </>
  );
}
