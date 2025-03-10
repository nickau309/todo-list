import { InboxIcon24, NumberSignIcon24, SelectCheckIcon12 } from "@/assets";
import Text from "@/components/ui/text";
import { textColor } from "@/constants/color";
import type { ProjectType } from "@/types/project";
import { useListItem } from "@floating-ui/react";
import clsx from "clsx";
import { useId } from "react";

type OptionProps = {
  activeIndex: number | null;
  getOptionProps: (
    props: Omit<React.HTMLProps<HTMLElement>, "selected" | "active">,
  ) => Record<string, unknown>;
  handleSelect: (index: number) => void;
  indentation: 0 | 1 | 2 | 3 | 4 | 5;
  searching: boolean;
  selected: boolean;
  disabled?: boolean;
} & Pick<ProjectType, "color" | "isInboxProject" | "name">;

const PADDING_LEFT = [
  "pl-0",
  "pl-3",
  "pl-6",
  "pl-9",
  "pl-12",
  "pl-[60px]",
] as const;

export default function ProjectDropdownOption({
  activeIndex,
  color,
  getOptionProps,
  handleSelect,
  indentation,
  isInboxProject,
  name,
  searching,
  selected,
  disabled = false,
}: OptionProps) {
  const { ref, index } = useListItem();

  const id = useId();

  const active = activeIndex === index;

  return (
    <div
      ref={ref}
      aria-disabled={disabled}
      aria-selected={selected}
      id={id}
      role="option"
      className={clsx(
        "w-full cursor-pointer",
        active && "bg-option-active",
        PADDING_LEFT[indentation],
        "aria-disabled:cursor-progress",
      )}
      {...getOptionProps({
        onClick() {
          if (!disabled) {
            handleSelect(index);
          }
        },
      })}
    >
      <div className="flex items-center gap-2 px-2 py-1">
        {isInboxProject ? (
          <span className="text-actionable-quaternary-idle-tint">
            <InboxIcon24 />
          </span>
        ) : (
          <span className={textColor[color]}>
            <NumberSignIcon24 />
          </span>
        )}
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <div className="flex min-w-0 flex-1 gap-1">
            <Text
              overflow="truncate"
              font="reactist"
              size="13px"
              height="16.8px"
              color="primary"
            >
              {name}
            </Text>
            <Text
              overflow="truncate"
              font="reactist"
              size="13px"
              height="16.8px"
              color="secondary"
            >
              {searching && "My Projects"}
            </Text>
          </div>
          {selected && (
            <span className="text-project-dropdown-option-check">
              <SelectCheckIcon12 />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
