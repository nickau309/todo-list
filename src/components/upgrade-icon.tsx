import clsx from "clsx";

export default function UpgradeIcon() {
  return (
    <span
      className={clsx(
        "rounded-[3px] bg-info-promote-tertiary-idle-fill px-1 py-px",
        "text-[10px]/[13px] font-bold uppercase tracking-widest text-info-promote-tertiary-idle-tint",
      )}
    >
      Upgrade
    </span>
  );
}
