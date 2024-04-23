import { SpinnerIcon24 } from "@/assets";
import clsx from "clsx";

export default function DialogLoadingComponent() {
  return (
    <div className="grid place-content-center py-8">
      <span
        aria-label="Loading..."
        role="progressbar"
        className="animate-[spin_1.2s_linear_infinite]"
      >
        <SpinnerIcon24
          className={clsx(
            "[&_path:first-child]:fill-display-accent-primary-tint",
            "[&_path:last-child]:fill-display-accent-secondary-fill",
          )}
        />
      </span>
    </div>
  );
}
