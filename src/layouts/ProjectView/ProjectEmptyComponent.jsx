import React from "react";
import { emptyProjectLogo, emptyProjectLogoDark } from "@assets";
import { useTheme } from "@contexts";

export default function ProjectEmptyComponent() {
  const { name } = useTheme();

  return (
    <div className="mb-5 flex max-w-[360px] grow flex-col items-center font-reactist leading-5 text-base-primary">
      <div>
        <img
          src={name === "Dark" ? emptyProjectLogoDark : emptyProjectLogo}
          alt="No task in this project"
        />
      </div>
      <div className="py-2 font-semibold">Start small (or dream big)...</div>
      <div className="px-12 text-center text-sm/normal text-content-secondary">
        Track tasks, follow progress, and discuss details in one central, shared
        project.
      </div>
    </div>
  );
}
