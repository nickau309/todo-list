import Switch from "@/components/switch";
import { useId } from "react";

export default function TwoFAButton() {
  const descriptionId = useId();

  return (
    <div className="flex flex-col gap-2">
      <Switch aria-describedby={descriptionId} isChecked={false} />
      <p
        id={descriptionId}
        className="text-[13px]/[16.8px] text-display-secondary-idle-tint"
      >
        2FA is disabled on your Todoist account.
      </p>
    </div>
  );
}
