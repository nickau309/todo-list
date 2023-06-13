import React, { useEffect, useRef } from "react";
import { CheckSmIcon24 } from "@assets";
import { classNames, checkboxAnimations as animations } from "@utils";

export default function RadioDisplay({ checked, className, disabled }) {
  const ref = useRef();

  useEffect(() => {
    if (checked) {
      const node = ref.current;

      const classMutationOnAnimationEnd = () => {
        node.classList.replace(animations[1].check, "bg-priority-1");
      };

      node.addEventListener("animationend", classMutationOnAnimationEnd);
      return () => {
        node.removeEventListener("animationend", classMutationOnAnimationEnd);
      };
    }
  }, [checked]);

  return (
    <div className="relative grid aspect-square w-6 place-items-center">
      <span
        ref={ref}
        className={classNames(
          "aspect-square w-[18px] rounded-full border",
          checked ? "border-priority-1" : "border-charcoal",
          checked && animations[1].check,
          !checked && !disabled && "group-hover:bg-charcoal/20",
          disabled && "opacity-30",
          className
        )}
      />
      <span
        className={classNames(
          "pointer-events-none absolute",
          checked ? "text-white" : "text-charcoal opacity-0",
          "transition ease-in",
          !checked && !disabled && "group-hover:opacity-100"
        )}
      >
        <CheckSmIcon24 />
      </span>
    </div>
  );
}
