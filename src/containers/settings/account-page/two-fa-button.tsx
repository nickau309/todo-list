import Switch from "@/components/switch";
import Text from "@/components/ui/text";
import { useId } from "react";

export default function TwoFAButton() {
  const descriptionId = useId();

  return (
    <div className="flex flex-col gap-2">
      <Switch aria-describedby={descriptionId} isChecked={false} />
      <Text
        as="p"
        id={descriptionId}
        font="reactist"
        size="13px"
        height="16.8px"
        color="secondary"
      >
        2FA is disabled on your Todoist account.
      </Text>
    </div>
  );
}
