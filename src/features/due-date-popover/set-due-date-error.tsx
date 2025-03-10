import { DueDateIcon24 } from "@/assets";
import Text from "@/components/ui/text";

export default function SetDueDateError() {
  return (
    <div className="flex border-t border-divider-primary py-1">
      <div className="flex min-w-0 flex-1 items-center gap-2.5 py-1 pl-3 pr-4">
        <span className="text-scheduler-preview-content-icon">
          <DueDateIcon24 />
        </span>
        <Text
          overflow="truncate"
          font="sans"
          size="14px"
          weight={600}
          height="18.4px"
        >
          No results
        </Text>
      </div>
    </div>
  );
}
