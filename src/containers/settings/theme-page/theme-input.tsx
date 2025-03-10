import Text from "@/components/ui/text";
import { THEME_ITEMS } from "@/constants/settings";
import { Composite } from "@floating-ui/react";
import { useId } from "react";
import ThemeInputItem from "./theme-input-item";

export default function ThemeInput() {
  const labelId = useId();

  return (
    <Composite
      render={
        <div
          aria-labelledby={labelId}
          role="radiogroup"
          className="flex flex-col gap-6"
        />
      }
    >
      <div className="flex flex-col gap-2">
        <Text
          as="h3"
          id={labelId}
          overflow="truncate"
          font="reactist"
          size="14px"
          weight={700}
          height="17.6px"
          color="primary"
        >
          Your themes
        </Text>
        <div className="grid auto-rows-[84px] grid-cols-[repeat(auto-fill,200px)] gap-4">
          {THEME_ITEMS.slice(0, 4).map((item) => (
            <ThemeInputItem key={item.name} {...item} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Text
          as="h3"
          overflow="truncate"
          font="reactist"
          size="14px"
          weight={700}
          height="17.6px"
          color="primary"
        >
          Pro themes
        </Text>
        <div className="grid auto-rows-[84px] grid-cols-[repeat(auto-fill,200px)] gap-4">
          {THEME_ITEMS.slice(4).map((item) => (
            <ThemeInputItem key={item.name} {...item} />
          ))}
        </div>
      </div>
    </Composite>
  );
}
