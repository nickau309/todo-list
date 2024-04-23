"use client";

import Switch from "@/components/switch";
import { useRouter } from "next/navigation";
import { useEffect, useId } from "react";

export default function TwoFAButoon() {
  const router = useRouter();

  const descriptionId = useId();

  useEffect(() => {
    router.prefetch("/app/settings/account/2fa");
  }, [router]);

  const handleClick = () => {
    router.push("/app/settings/account/2fa");
  };

  const isChecked = false;

  return (
    <div className="flex flex-col gap-2">
      <input
        type="checkbox"
        aria-describedby={descriptionId}
        checked={isChecked}
        readOnly
        className="hidden"
      />
      <Switch onClick={handleClick} isChecked={isChecked} />
      <p
        id={descriptionId}
        className="text-[13px]/[16.8px] text-display-secondary-idle-tint"
      >
        2FA is disabled on your Todoist account.
      </p>
    </div>
  );
}
