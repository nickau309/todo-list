import React, { useState } from "react";
import {
  useFetchers,
  useNavigate,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { CloseIcon24, InboxIcon24, ProjectIcon24 } from "@/assets";
import { ErrorComponent } from "@/components";
import { QuaternaryButton } from "@/components/buttons";
import { BaseOverlayDialog } from "@/components/dialogs";
import { classNames, textColor } from "@/utils";

export default function ProjectComment() {
  const fetchers = useFetchers();
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { projects } = useRouteLoaderData("root");

  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  const relevantFetcher = fetchers.find(
    (f) => f.formData && f.formData.get("id") === projectId,
  );
  const project = projects.find((p) => p.id === projectId);

  const childOrder = project.childOrder;
  const color = relevantFetcher?.formData.get("color") ?? project.color;
  const name = relevantFetcher?.formData.get("name") ?? project.name;

  return (
    <BaseOverlayDialog
      afterLeave={() => navigate("..")}
      isOpen={isOpen}
      onClose={handleClose}
    >
      <div className="flex h-full justify-center pt-8 min-[581px]:px-8 min-[750px]:pb-8">
        <Dialog.Panel
          className={classNames(
            "flex h-full w-full flex-col divide-y divide-divider-tertiary rounded-t-[10px] bg-default text-base-primary shadow-[0_2px_8px_rgb(0,0,0,.16)]",
            "min-[750px]:max-h-[960px] min-[750px]:max-w-[650px] min-[750px]:rounded-b-[10px]",
          )}
        >
          <header className="flex shrink-0 basis-14 items-center justify-between gap-2 pl-[18px] pr-3">
            <Dialog.Title className="min-w-0">
              <button
                onClick={handleClose}
                className="flex w-full items-center gap-2.5 hover:underline"
              >
                {childOrder ? (
                  <span className={textColor[color]}>
                    <ProjectIcon24 />
                  </span>
                ) : (
                  <span className="text-views-inbox">
                    <InboxIcon24 />
                  </span>
                )}
                <span className="truncate text-[13px]/[17.6px] text-content-primary">
                  {name}
                </span>
              </button>
            </Dialog.Title>
            <QuaternaryButton
              onClick={handleClose}
              className="w-8 shrink-0 transition-colors duration-300"
            >
              <CloseIcon24 />
            </QuaternaryButton>
          </header>
          <div className="grid grow place-items-center">
            <ErrorComponent errorText="Feature not implemented." />
          </div>
        </Dialog.Panel>
      </div>
    </BaseOverlayDialog>
  );
}
