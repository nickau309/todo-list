import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tab } from "@headlessui/react";
import { settingsTabsData } from "@/data";
import SettingsTabList from "./SettingsTabList";
import SettingsTabPanels from "./SettingsTabPanels";

export default function SettingsTab({ handleClose }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showSmSidebar, setShowSmSidebar] = useState(false);

  if (pathname.startsWith("/settings/")) {
    const newIndex = settingsTabsData.findIndex(
      (tab) => tab.path === pathname.split("/")[2],
    );
    if (selectedIndex !== newIndex) {
      setSelectedIndex(newIndex);
      return;
    }
  }

  return (
    <Tab.Group
      as="div"
      selectedIndex={selectedIndex}
      onChange={(index) => {
        setSelectedIndex(index);
        navigate(settingsTabsData[index].path);
      }}
      vertical
      manual
      className="flex h-full max-[660px]:relative"
    >
      <SettingsTabList
        setShowSmSidebar={setShowSmSidebar}
        showSmSidebar={showSmSidebar}
      />
      <SettingsTabPanels
        handleClose={handleClose}
        setShowSmSidebar={setShowSmSidebar}
      />
    </Tab.Group>
  );
}
