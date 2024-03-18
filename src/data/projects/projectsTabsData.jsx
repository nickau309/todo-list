import React from "react";
import ProjectsActive, {
  action as projectsActiveAction,
} from "@/_pages/ProjectsActive";
import ProjectsArchived, {
  action as projectsArchivedAction,
} from "@/_pages/ProjectsArchived";

const projectsTabsData = [
  {
    path: "active",
    element: <ProjectsActive />,
    action: projectsActiveAction,
  },
  {
    path: "archived",
    element: <ProjectsArchived />,
    action: projectsArchivedAction,
  },
];

export default projectsTabsData;
