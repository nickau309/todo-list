import { LogOutIcon24 } from "@/assets";
import Menu from "@/components/menu";
import { logOut } from "@/lib/actions";
import clsx from "clsx";
import { mutate } from "swr";

export default function LogOut() {
  const label = "Log out";

  const handleClick = () => {
    void mutate(
      () => true, // which cache keys are updated
      undefined, // update cache data to `undefined`
      { revalidate: false }, // do not revalidate
    );
    void logOut();
  };

  return (
    <Menu.Item
      label={label}
      onClick={handleClick}
      className={clsx(
        "mx-1.5 flex min-h-8 items-center gap-2.5 rounded-[5px] px-1.5",
        "focus-visible:outline-none",
        "custom-hocus:bg-actionable-focus-fill",
      )}
    >
      <span className="grid size-6 place-items-center text-display-secondary-idle-tint">
        <LogOutIcon24 />
      </span>
      <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
        <span className="truncate text-[13px]/[16.8px]">{label}</span>
      </div>
    </Menu.Item>
  );
}
