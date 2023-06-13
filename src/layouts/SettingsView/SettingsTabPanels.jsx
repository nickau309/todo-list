import React from "react";
import { Outlet, useFetcher } from "react-router-dom";
import { Tab } from "@headlessui/react";
import { ArrowLeftIcon24, CloseIcon24 } from "@assets";
import {
  CancelButton,
  SubmitButton,
  QuaternaryButton,
} from "@components/buttons";
import { useSettingsControl, useSettingsState } from "@contexts";
import { settingsTabsData } from "@data";

export default function SettingsTabPanels({ handleClose, setShowSmSidebar }) {
  const fetcher = useFetcher();

  const { hasChanged } = useSettingsState();
  const { discardChanges } = useSettingsControl();

  return (
    <Tab.Panels
      as="form"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.append("type", "updateSettings");
        fetcher.submit(formData, { method: "post" });
      }}
      className="flex min-w-0 grow flex-col divide-y divide-divider-secondary font-reactist text-sm/[17.6px]"
    >
      {({ selectedIndex }) => (
        <>
          <header className="flex basis-12 gap-1.5 p-2 min-[661px]:pl-4">
            <QuaternaryButton
              onClick={() => setShowSmSidebar(true)}
              className="w-8 min-[661px]:hidden"
            >
              <ArrowLeftIcon24 />
            </QuaternaryButton>
            <div className="flex min-w-0 grow items-center justify-between">
              <h2 className="font-bold">
                {settingsTabsData[selectedIndex].description}
              </h2>
              <QuaternaryButton onClick={handleClose} className="w-8">
                <CloseIcon24 />
              </QuaternaryButton>
            </div>
          </header>
          <div className="min-h-0 grow">
            {settingsTabsData.map((tab) => (
              <Tab.Panel
                key={tab.path}
                tabIndex="-1"
                className="grid h-full place-items-center"
              >
                <Outlet />
              </Tab.Panel>
            ))}
          </div>
          {hasChanged && (
            <footer className="flex justify-end gap-3 p-3">
              <CancelButton
                onClick={discardChanges}
                className="min-w-[68px] px-3"
              >
                <span className="leading-8">Cancel</span>
              </CancelButton>
              <SubmitButton className="min-w-[68px] px-3">
                <span className="leading-8">Update</span>
              </SubmitButton>
            </footer>
          )}
        </>
      )}
    </Tab.Panels>
  );
}
