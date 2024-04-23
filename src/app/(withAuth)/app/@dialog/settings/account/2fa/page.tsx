import { ArrowLeftIcon24 } from "@/assets";
import ErrorComponent from "@/components/error-component";
import {
  CloseSettingsDialogButton,
  Header,
  QuaternaryLink,
} from "@/components/settings/form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enable 2FA",
};

export default function Page() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <Header>
        <QuaternaryLink href="/app/settings" aria-label="Go back">
          <ArrowLeftIcon24 />
        </QuaternaryLink>
        <div className="flex min-w-0 flex-1 items-center gap-1">
          <h2 className="truncate font-bold">Enable 2FA</h2>
        </div>
        <CloseSettingsDialogButton />
      </Header>
      <hr className="border-divider-primary" />
      <div className="grid flex-1 place-items-center overflow-y-auto overflow-x-hidden p-4">
        <ErrorComponent text="Feature not implemented." />
      </div>
    </div>
  );
}
