import React from "react";
import { useLoaderData } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon16, PieChartIcon10 } from "@assets";
import { AnimatedDisclosurePanel } from "@components";
import { useSetShowCompleted, useShowCompleted } from "@contexts";
import { TaskList } from "@features";
import { classNames } from "@utils";

export default function TaskListDisclosure({ childIds, isArchived }) {
  const { tasks } = useLoaderData();

  const showCompleted = useShowCompleted();
  const setShowCompleted = useSetShowCompleted();

  const numberOfSubTaskCompleted = tasks.filter(
    (t) => childIds.includes(t.id) && t.isCompleted
  ).length;

  return (
    <Disclosure
      as="div"
      defaultOpen
      className="ml-3 flex flex-col min-[751px]:ml-1"
    >
      {({ open }) => (
        <>
          <div className="flex items-center">
            <Disclosure.Button
              className={classNames(
                "h-8 min-w-[68px] grow gap-1.5 rounded-[5px] border border-transparent pl-1.5 pr-3",
                "flex items-center transition-colors duration-300"
              )}
            >
              <span className="text-quaternary-tint">
                <ChevronDownIcon16 className="transition-transform ui-not-open:-rotate-90" />
              </span>
              <div className="flex grow select-none items-center font-reactist">
                <span className="text-[13px]/8 font-semibold text-content-primary">
                  Sub-tasks
                </span>
                &nbsp;
                {!isArchived && numberOfSubTaskCompleted > 0 && (
                  <>
                    <span className="rounded-full border p-0.5 text-quaternary-tint">
                      <PieChartIcon10
                        numerator={numberOfSubTaskCompleted}
                        denominator={childIds.length}
                      />
                    </span>
                    &nbsp;
                  </>
                )}
                {!isArchived && (
                  <span className="text-xs/8 text-content-secondary">
                    {numberOfSubTaskCompleted}/{childIds.length}
                  </span>
                )}
              </div>
            </Disclosure.Button>
            {open && !isArchived && numberOfSubTaskCompleted > 0 && (
              <button
                onClick={() => {
                  setShowCompleted((showCompleted) => !showCompleted);
                }}
                className={classNames(
                  "flex h-7 min-w-[68px] select-none items-center rounded-[5px] border border-transparent px-2 font-reactist text-xs/7 font-semibold text-quaternary-tint transition-colors duration-300",
                  "focus-visible:bg-quaternary-hover-fill focus-visible:text-quaternary-hover-tint",
                  "enabled:hover:bg-quaternary-hover-fill enabled:hover:text-quaternary-hover-tint",
                  "enabled:active:scale-[.97] enabled:active:transition-transform enabled:active:duration-200 enabled:active:ease-[cubic-bezier(.02,1.505,.745,1.235)]"
                )}
              >
                {showCompleted ? "Hide completed" : "Show completed"}
              </button>
            )}
          </div>
          <hr className="ml-4 border-divider-secondary min-[751px]:ml-6" />
          <AnimatePresence initial={false}>
            {open && (
              <AnimatedDisclosurePanel className="ml-1 pl-1 max-[751px]:my-[3px] min-[751px]:pl-7">
                <TaskList isArchived={isArchived} isInTaskPanel />
              </AnimatedDisclosurePanel>
            )}
          </AnimatePresence>
        </>
      )}
    </Disclosure>
  );
}
