import React from "react";
import {
  Link,
  useFetchers,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import { motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import { InboxIcon16, ProjectIcon16 } from "@assets";
import { textColor } from "@utils";

export default function Title({ projectId }) {
  const fetchers = useFetchers();
  const { taskId } = useParams();
  const { projects } = useRouteLoaderData("root");

  const relevantFetcher = fetchers.find(
    (f) => f.formData && f.formData.get("id") === taskId
  );
  const displayProjectId =
    relevantFetcher?.formData.get("projectId") ?? projectId;
  const displayProject = projects.find((p) => p.id === displayProjectId);

  return (
    <Dialog.Title
      as={motion.h2}
      initial={{ y: "12px", opacity: 0 }}
      animate={{ y: "0px", opacity: 1 }}
      transition={{ delay: 0.2, ease: "easeIn", duration: 0.2 }}
    >
      <Link
        to={`../../project/${displayProjectId}`}
        className="flex items-center gap-1 overflow-hidden text-base-primary hover:underline"
      >
        {displayProject.childOrder ? (
          <span className={textColor[displayProject.color]}>
            <ProjectIcon16 />
          </span>
        ) : (
          <span className="text-views-inbox">
            <InboxIcon16 />
          </span>
        )}
        <span className="truncate font-reactist text-xs text-content-primary">
          {displayProject.name}
        </span>
      </Link>
    </Dialog.Title>
  );
}
