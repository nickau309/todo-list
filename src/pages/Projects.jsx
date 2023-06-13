import React, { Fragment, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Tab } from "@headlessui/react";
import { AddSmIcon24, Cog6ToothIcon24 } from "@assets";
import { QuaternaryButton, QuaternaryLink } from "@components/buttons";
import { useDialogControl } from "@contexts";
import { projectsTabsData } from "@data";
import { classNames } from "@utils";

export default function Projects() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [selectedIndex, setSelectedIndex] = useState(null);
  useEffect(() => {
    if (pathname.startsWith("/projects/")) {
      setSelectedIndex(
        projectsTabsData.findIndex(
          (tab) => tab.path === pathname.split("/").at(-1)
        )
      );
    }
  }, [pathname]);

  const { openDialog } = useDialogControl();

  return (
    <Tab.Group
      as="div"
      selectedIndex={selectedIndex}
      onChange={(index) => {
        setSelectedIndex(index);
        navigate(projectsTabsData[index].path);
      }}
      manual
      className="flex h-full flex-col overflow-y-auto overflow-x-hidden bg-base-primary"
    >
      <header className="sticky top-0 z-10 mt-9 flex shrink-0 justify-center bg-base-primary px-[55px] pt-5">
        <div className="flex w-full max-w-[800px] flex-col gap-5 border-b border-divider-tertiary pb-4">
          <div className="flex items-center justify-between gap-3">
            <h1 className="font-reactist text-xl/[24.8px] font-bold text-content-primary">
              Projects
            </h1>
            <QuaternaryLink
              to="/settings"
              state={{ prevPathname: pathname }}
              className={classNames(
                "transition-colors duration-300",
                "max-[1165px]:w-8 max-[1165px]:shrink-0",
                "min-[1165px]:min-w-[68px] min-[1165px]:gap-1.5 min-[1165px]:pl-1.5 min-[1165px]:pr-3"
              )}
            >
              <span>
                <Cog6ToothIcon24 />
              </span>
              <span className="leading-8 max-[1165px]:hidden">Settings</span>
            </QuaternaryLink>
          </div>
          <div className="flex items-center justify-between">
            <Tab.List className="relative flex gap-1">
              <div className="absolute -inset-0.5 rounded-full border-2 border-tab bg-tab"></div>
              {projectsTabsData.map((tab) => (
                <Tab
                  key={tab.path}
                  className={classNames(
                    "relative rounded-full border px-3 text-sm/[30px] font-semibold capitalize",
                    "ui-selected:border-divider-secondary ui-selected:bg-base-primary ui-selected:text-tab-selected",
                    "ui-not-selected:border-transparent ui-not-selected:text-tab-unselected"
                  )}
                >
                  {tab.path}
                </Tab>
              ))}
            </Tab.List>
            <QuaternaryButton
              onClick={() => openDialog("AddProject")}
              className="min-w-[68px] gap-1.5 pl-1.5 pr-3 transition-colors duration-300"
            >
              <span>
                <AddSmIcon24 />
              </span>
              <span className="leading-8">Add project</span>
            </QuaternaryButton>
          </div>
        </div>
      </header>
      <Tab.Panels as={Fragment}>
        {projectsTabsData.map((tab) => (
          <Tab.Panel
            key={tab.path}
            tabIndex="-1"
            className="relative flex justify-center px-[55px] pb-6 pt-2"
          >
            <Outlet />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}
