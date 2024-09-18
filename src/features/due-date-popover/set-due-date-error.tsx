import { DueDateIcon24 } from "@/assets";

export default function SetDueDateError() {
  return (
    <div className="flex border-t border-divider-primary py-1">
      <div className="flex min-w-0 flex-1 items-center gap-2.5 py-1 pl-3 pr-4">
        <span className="text-scheduler-preview-content-icon">
          <DueDateIcon24 />
        </span>
        <span className="truncate font-sans text-sm/[18.4px] font-semibold">
          No results
        </span>
      </div>
    </div>
  );
}
