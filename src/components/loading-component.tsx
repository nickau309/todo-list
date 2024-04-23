import { SpinnerIcon24, TodoistSquareLogo64 } from "@/assets";
import clsx from "clsx";

export default function LoadingComponent() {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <span>
        <TodoistSquareLogo64 />
      </span>
      <span
        aria-label="Loading..."
        role="progressbar"
        className="animate-[spin_1.2s_linear_infinite]"
      >
        <SpinnerIcon24
          className={clsx(
            "[&_path:first-child]:fill-[#e44331]",
            "[&_path:last-child]:fill-[#fcecea]",
          )}
        />
      </span>
    </div>
  );
}
