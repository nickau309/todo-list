import clsx from "clsx";

type SwitchProps = {
  "aria-describedby"?: string;
  id?: string;
  isChecked: boolean;
  setIsChecked?: (isChecked: boolean) => void;
};

export default function Switch({
  "aria-describedby": ariaDescribedby,
  id,
  isChecked,
  setIsChecked,
}: SwitchProps) {
  const handleClick = () => {
    setIsChecked?.(!isChecked);
  };

  return (
    <button
      type="button"
      aria-checked={isChecked}
      aria-describedby={ariaDescribedby}
      aria-readonly={setIsChecked === undefined}
      id={id}
      onClick={handleClick}
      role="switch"
      className={clsx(
        "group",
        "flex h-[18px] w-8 items-center rounded-full bg-selectable-primary-unselected-fill p-[3px]",
        "focus-visible:outline-none focus-visible:outline-[1.6px] focus-visible:outline-offset-[2.4px] focus-visible:outline-selectable-primary-selected-fill",
        "aria-checked:bg-selectable-primary-selected-fill",
        "aria-readonly:cursor-not-allowed",
      )}
    >
      <span
        className={clsx(
          "size-3 rounded-full bg-white",
          "transition-transform duration-[280ms]",
          "group-aria-checked:translate-x-3.5",
        )}
      />
    </button>
  );
}
