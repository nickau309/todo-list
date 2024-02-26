import React from "react";
import { useFetcher, useParams } from "react-router-dom";
import { ArchiveIconSolid24 } from "@/assets";
import { SubmitButton } from "@/components/buttons";

export default function ProjectArchiveBanner() {
  const fetcher = useFetcher();
  const { projectId } = useParams();

  return (
    <div className="mt-[5px] flex w-full max-w-[800px] items-center gap-3 rounded-[5px] border border-banner bg-banner px-4 py-2">
      <span>
        <ArchiveIconSolid24 className="fill-banner" />
      </span>
      <span className="grow py-1 font-reactist text-sm/normal tracking-[-.15px] text-banner-title">
        This project is archived
      </span>
      <SubmitButton
        onClick={() => {
          fetcher.submit(
            { type: "updateProject", id: projectId, isArchived: false },
            { method: "post" },
          );
        }}
        className="min-w-[68px] shrink-0 px-3 transition-colors duration-300"
      >
        <span className="leading-8">Unarchive project</span>
      </SubmitButton>
    </div>
  );
}
