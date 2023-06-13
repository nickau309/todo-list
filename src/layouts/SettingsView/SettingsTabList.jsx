import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Tab } from "@headlessui/react";
import { CloseIcon24 } from "@assets";
import { QuaternaryButton } from "@components/buttons";
import { useWidth } from "@contexts";
import { settingsTabsData } from "@data";
import { classNames } from "@utils";

export default function SettingsTabList({ setShowSmSidebar, showSmSidebar }) {
  const ref = useRef();
  const [showCloseButton, setShowCloseButton] = useState(false);

  const width = useWidth();

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={{
        width: width > 660 ? "220px" : showSmSidebar ? "100%" : "0px",
      }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      onAnimationStart={() => {
        if (width > 660) {
          ref.current.classList.remove("absolute", "inset-y-0", "left-0");
          setShowSmSidebar(false);
        }
        setShowCloseButton(false);
      }}
      onAnimationComplete={() => {
        if (width <= 660) {
          ref.current.classList.add("absolute", "inset-y-0", "left-0");
        }
        if (showSmSidebar) {
          setShowCloseButton(true);
        }
      }}
      className="z-50 flex shrink-0 flex-col overflow-hidden bg-aside"
    >
      <header className="flex shrink-0 basis-12 justify-between p-2 pl-3">
        <h1 className="py-1 font-reactist text-base/5 font-bold">Settings</h1>
        {showCloseButton && (
          <QuaternaryButton
            onClick={() => setShowSmSidebar(false)}
            className="w-8 shrink-0"
          >
            <CloseIcon24 />
          </QuaternaryButton>
        )}
      </header>
      <div className="min-h-0 grow">
        <div className="h-full overflow-auto">
          <Tab.List className="flex flex-col gap-1 p-3">
            {({ selectedIndex }) =>
              settingsTabsData.map((tab, i) => (
                <Tab
                  key={tab.path}
                  onClick={() => setShowSmSidebar(false)}
                  className={classNames(
                    "flex min-w-0 items-center gap-1.5 overflow-hidden rounded-[5px] p-1 transition-shadow duration-300 ease-[cubic-bezier(.25,.1,.25,1)]",
                    selectedIndex === i
                      ? "bg-tab-hover-fill"
                      : "focus-visible:bg-quaternary-hover-fill enabled:hover:bg-quaternary-hover-fill",
                    "focus-visible:outline-none focus-visible:ring focus-visible:ring-outer focus-visible:ring-offset-1 focus-visible:ring-offset-inner"
                  )}
                >
                  <span className="text-settings-icon">{tab.icon}</span>
                  <div className="whitespace-nowrap text-sm/[18.4px]">
                    {tab.description}
                  </div>
                </Tab>
              ))
            }
          </Tab.List>
        </div>
      </div>
    </motion.div>
  );
}
