import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { WidthProvider } from "./contexts";
import { projectsTabsData, settingsTabsData } from "./data";
import ErrorPage from "./pages/ErrorPage";
import NotImplemented from "./pages/NotImplemented";
import Project, {
  loader as projectLoader,
  action as projectAction,
} from "./pages/Project";
import ProjectComment from "./pages/ProjectComment";
import ProjectExport from "./pages/ProjectExport";
import ProjectImport from "./pages/ProjectImport";
import ProjectShare from "./pages/ProjectShare";
import Projects from "./pages/Projects";
import Root, { loader as rootLoader, action as rootAction } from "./pages/Root";
import Task, { loader as taskLoader, action as taskAction } from "./pages/Task";
import Settings, { action as settingsAction } from "./pages/Settings";
import WorkspaceNotFound from "./pages/WorkspaceNotFound";

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
            {
              path: "settings",
              element: <Settings />,
              id: "settings",
              action: settingsAction,
              children: [
                {
                  index: true,
                  element: <Navigate to="theme" replace />,
                },
                ...settingsTabsData,
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
    basename: "/todo-list/",
  }
);

export default function App() {
  return (
    <WidthProvider>
      <RouterProvider router={router} />
    </WidthProvider>
  );
}
