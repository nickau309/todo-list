"use client";

import Heading1 from "@/components/ui/heading1";
import useHash from "@/hooks/use-hash";
import { ProjectType } from "@/types/project";
import clsx from "clsx";
import { useMotionValueEvent, useScroll } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import CompactHeader from "./compact-header";
import Content from "./content";

type ViewProps = {
  children: ReactNode;
  project: ProjectType;
};

export default function ProjectView({ children, project }: ViewProps) {
  const container = useRef<HTMLDivElement>(null);
  const target = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container,
    target,
    offset: ["start 56px", "end 56px"],
  });
  const [showBorder, setShowBorder] = useState(false);
  const [showCompactHeader, setShowCompactHeader] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (latestValue) => {
    setShowBorder(latestValue > 0);
    setShowCompactHeader(latestValue >= 0.25);
  });

  const hash = useHash();

  useEffect(() => {
    if (container.current && hash.length > 0) {
      const ele = container.current.querySelector(hash);
      ele?.scrollIntoView({
        block: "center",
      });
    }
  }, [hash]);

  return (
    <div
      ref={container}
      className="flex h-full w-full flex-col overflow-y-auto bg-background-base-primary text-display-primary-idle-tint"
    >
      <header className="contents">
        <div
          className={clsx(
            "sticky top-0 z-10 grid h-14 shrink-0 grid-cols-3 gap-2 border-b",
            showBorder ? "border-divider-secondary" : "border-transparent",
            "bg-background-base-primary px-3",
            "[grid-template-areas:'left_center_right']",
          )}
        >
          <CompactHeader show={showCompactHeader} />
        </div>
        <div
          ref={target}
          className={clsx(
            "flex justify-center px-[55px] pb-[9px] pt-1.5",
            showCompactHeader && "opacity-0",
            "transition-opacity duration-500 ease-[cubic-bezier(0,0,.58,1)]",
          )}
        >
          <div className="flex w-full max-w-[800px] flex-col gap-2">
            <div className="-ml-0.5 flex border border-transparent">
              <Heading1
                overflow="truncate"
                font="reactist"
                size="26px"
                weight={700}
                height="35px"
                color="primary"
              >
                Inbox
              </Heading1>
            </div>
          </div>
        </div>
      </header>
      <div className="flex justify-center px-[55px] pb-[84px]">
        <div className="flex w-full max-w-[800px] flex-col">
          <Content
            project={project}
            scrollElementRef={container}
            projectId={project.id}
          />
        </div>
        {children}
      </div>
    </div>
  );
}
