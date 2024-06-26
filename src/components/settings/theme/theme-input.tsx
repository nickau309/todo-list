"use client";

import { THEME_ITEMS } from "@/constants/settings";
import { Composite } from "@floating-ui/react";
import { useId } from "react";
import { useFormContext } from "react-hook-form";
import ThemeInputItem from "./theme-input-item";

export default function ThemeInput() {
  const labelId = useId();

  const { register } = useFormContext();

  return (
    <div>
      <input type="hidden" {...register("theme")} />
      <Composite
        render={
          <div
            aria-labelledby={labelId}
            role="radiogroup"
            className="flex flex-col gap-6"
          />
        }
      >
        <div className="flex flex-col gap-2">
          <h3 id={labelId} className="font-bold">
            Your themes
          </h3>
          <div className="grid auto-rows-[84px] grid-cols-[repeat(auto-fill,200px)] gap-4">
            {THEME_ITEMS.slice(0, 4).map((item) => (
              <ThemeInputItem key={item.name} {...item} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-bold">Pro themes</h3>
          <div className="grid auto-rows-[84px] grid-cols-[repeat(auto-fill,200px)] gap-4">
            {THEME_ITEMS.slice(4).map((item) => (
              <ThemeInputItem key={item.name} {...item} />
            ))}
          </div>
        </div>
      </Composite>
    </div>
  );
}
