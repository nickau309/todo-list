import React, { useId, useState } from "react";
import { Switch } from "@/components/switches";
import { classNames } from "@/utils";

export default function IsFavoriteInput({ defaultIsFavorite }) {
  const [isChecked, setIsChecked] = useState(defaultIsFavorite);
  const id = useId();

  return (
    <div className="flex gap-2.5 pb-[7px]">
      <input type="hidden" name="isFavorite" value={isChecked} readOnly />
      <Switch
        id={id}
        isChecked={isChecked}
        onClick={() => setIsChecked(!isChecked)}
        className={classNames(
          "transition-shadow duration-300 ease-[cubic-bezier(.25,.1,.25,1)]",
          "focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner",
        )}
      />
      <label htmlFor={id}>Add to favorites</label>
    </div>
  );
}
