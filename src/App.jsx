import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { WidthProvider } from "./contexts";
import { projectsTabsData } from "./data";
import ErrorPage from "./_pages/ErrorPage";
import NotImplemented from "./_pages/NotImplemented";
import Project, {
  loader as projectLoader,
  action as projectAction,
} from "./_pages/Project";
import ProjectComment from "./_pages/ProjectComment";
import ProjectExport from "./_pages/ProjectExport";
import ProjectImport from "./_pages/ProjectImport";
import ProjectShare from "./_pages/ProjectShare";
import Projects from "./_pages/Projects";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./_pages/Root";
import Task, {
  loader as taskLoader,
  action as taskAction,
} from "./_pages/Task";
import WorkspaceNotFound from "./_pages/WorkspaceNotFound";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      id: "root",
      loader: rootLoader,
      action: rootAction,
      children: [
        {
          errorElement: <ErrorPage />,
          children: [
            { path: "activity", element: <NotImplemented /> },
            { path: "filters-labels", element: <NotImplemented /> },
            {
              path: "project/:projectId",
              element: <Project />,
              id: "project",
              loader: projectLoader,
              action: projectAction,
              children: [
                {
                  path: "task/:taskId",
                  element: <Task />,
                  id: "task",
                  loader: taskLoader,
                  action: taskAction,
                },
                { path: "comment", element: <ProjectComment /> },
                { path: "export", element: <ProjectExport /> },
                { path: "import", element: <ProjectImport /> },
                { path: "share", element: <ProjectShare /> },
              ],
            },
            {
              path: "projects",
              element: <Projects />,
              children: [
                {
                  index: true,
                  element: <Navigate to={projectsTabsData[0].path} replace />,
                },
                ...projectsTabsData,
              ],
            },
            { path: "today", element: <NotImplemented /> },
            { path: "upcoming", element: <NotImplemented /> },
            { path: "*", element: <WorkspaceNotFound /> },
          ],
        },
      ],
    },
  ],
  {
    basename: "/todo-list",
  },
);

export default function App() {
  return (
    <WidthProvider>
      <RouterProvider router={router} />
    </WidthProvider>
  );
}
