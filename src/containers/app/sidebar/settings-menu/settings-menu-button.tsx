import { ChevronDownSmIcon24 } from "@/assets";
import Text from "@/components/ui/text";
import { useOptimisticUser } from "@/contexts/optimistic-user-context";
import clsx from "clsx";
import Image from "next/image";
import { useSettingsMenu } from "./settings-menu-context";

export default function SettingsMenuButton() {
  const optimisticUser = useOptimisticUser();

  const { refs, getReferenceProps } = useSettingsMenu("SettingsMenuButton");

  const name = optimisticUser.name ?? "";
  const initLetter = name.at(0)?.toUpperCase() ?? "";

  return (
    <button
      ref={refs.setReference}
      type="button"
      aria-disabled="false"
      aria-label="Settings"
      className={clsx(
        "flex h-8 min-w-[68px] select-none items-center gap-2.5 rounded-[5px] border border-transparent pl-1.5",
        "text-actionable-quaternary-idle-tint",
        "transition-colors duration-300",
        "aria-disabled:cursor-not-allowed aria-disabled:text-actionable-quaternary-disabled-tint",
        "custom-active:scale-[.97] custom-active:transition-transform custom-active:duration-200 custom-active:ease-[cubic-bezier(.02,1.505,.745,1.235)]",
        "custom-hocus:bg-selectable-secondary-hover-fill custom-hocus:text-actionable-quaternary-hover-tint",
      )}
      {...getReferenceProps()}
    >
      <span className="size-[26px] overflow-hidden rounded-full">
        <Image
          src={`https://d1nbslm0j6pual.cloudfront.net?text=${initLetter}&size=195&bg=ffffff`}
          alt={name}
          width="26"
          height="26"
        />
      </span>
      <div className="flex min-w-0 flex-1 items-center">
        <Text
          overflow="truncate"
          font="reactist"
          size="14px"
          weight={600}
          height="32px"
          color="primary"
        >
          {name}
        </Text>
        <span>
          <ChevronDownSmIcon24 />
        </span>
      </div>
    </button>
  );
}
