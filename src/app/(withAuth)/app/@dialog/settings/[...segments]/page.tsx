import ErrorComponent from "@/components/error-component";
import {
  CloseSettingsDialogButton,
  Header,
  OpenNavMenuButton,
} from "@/components/settings/form";
import UpgradeIcon from "@/components/settings/upgrade-icon";
import { NAV_MENU_ITEMS } from "@/constants/settings";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

type ParamsProps = {
  segments: string[];
};

type PageProps = {
  params: ParamsProps;
};

export const dynamicParams = false;

export function generateMetadata({ params }: PageProps): Metadata {
  const currentItem =
    NAV_MENU_ITEMS.find((item) => item.segment === params.segments[0]) ??
    NAV_MENU_ITEMS[0];
  return { title: currentItem.description };
}

export function generateStaticParams(): ParamsProps[] {
  return NAV_MENU_ITEMS.flatMap(({ segment }) => {
    if (segment === "theme" || segment === "account") {
      return [];
    }
    return { segments: [segment] };
  });
}

export default function Page({ params }: PageProps) {
  if (
    params.segments.length > 1 ||
    NAV_MENU_ITEMS.every((item) => item.segment !== params.segments[0])
  ) {
    redirect(`/app/settings/${NAV_MENU_ITEMS[0].segment}`);
  }
  const currentItem =
    NAV_MENU_ITEMS.find((item) => item.segment === params.segments[0]) ??
    NAV_MENU_ITEMS[0];

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <Header>
        <OpenNavMenuButton />
        <div className="flex min-w-0 flex-1 items-center gap-1">
          <h2 className="truncate font-bold">{currentItem.description}</h2>
          {currentItem.showUpgradeIcon && <UpgradeIcon />}
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
