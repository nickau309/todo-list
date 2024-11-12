import { NAV_MENU_ITEMS } from "@/constants/settings";
import NotImplementedPage from "@/containers/settings/not-implemented-page";
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

  return <NotImplementedPage segment={params.segments[0]} />;
}
