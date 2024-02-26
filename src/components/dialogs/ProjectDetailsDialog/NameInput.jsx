import React, { useId } from "react";
import { classNames } from "@/utils";

export default function NameInput({ name, setName }) {
  const id = useId();

  return (
    <div className="flex flex-col gap-[7px]">
      <div className="flex flex-wrap justify-between gap-[7px]">
        <label htmlFor={id} className="font-bold">
          Name
        </label>
        {name.length >= 110 && (
          <div className="text-sm/[18.4px] text-priority-1">
            Character limit: {name.length}/120
          </div>
        )}
      </div>
      <input
        type="text"
        id={id}
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        maxLength="120"
        className={classNames(
          "rounded-[5px] border border-field bg-base-primary p-[5px]",
          "transition-[border,box-shadow] duration-300 ease-[cubic-bezier(.25,.1,.25,1)] focus:border-field-focus",
          "focus-visible:!border-transparent focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner",
        )}
      />
    </div>
  );
}
