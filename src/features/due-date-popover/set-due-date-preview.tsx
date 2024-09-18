import { DueDateIcon24 } from "@/assets";
import dayjs from "@/lib/dayjs";
import clsx from "clsx";
import IncompleteTaskCountString from "./incomplete-task-count-string";

type PreviewProps = {
  inputDate: Date;
};

export default function SetDueDatePreview({ inputDate }: PreviewProps) {
  const now = dayjs();
  const date = dayjs(inputDate);
  const str = date.isSame(now, "year")
    ? date.format("ddd D MMM")
    : date.format("ddd D MMM YYYY");

  return (
    <div className="flex border-t border-divider-primary py-1">
      <button
        type="submit"
        aria-disabled="false"
        className={clsx(
          "flex min-w-0 flex-1 items-center gap-2.5 py-1 pl-3 pr-4",
          "focus-visible:outline-none",
          "custom-hocus:bg-option-active",
        )}
      >
        <span className="text-scheduler-preview-content-icon">
          <DueDateIcon24 />
        </span>
        <div className="flex min-w-0 flex-1 flex-col items-start">
          <span className="truncate font-sans text-[13px]/[17.6px] font-semibold">
            {str}
          </span>
          <span className="truncate font-sans text-[10px]/[12.8px] font-semibold text-display-secondary-idle-tint">
            <IncompleteTaskCountString inputDate={inputDate} />
          </span>
        </div>
      </button>
    </div>
  );
}
