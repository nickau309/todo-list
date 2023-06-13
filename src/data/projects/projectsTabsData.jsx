import React from "react";
import ProjectsActive, {
  action as projectsActiveAction,
} from "@pages/ProjectsActive";
import ProjectsArchived, {
  action as projectsArchivedAction,
} from "@pages/ProjectsArchived";

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
