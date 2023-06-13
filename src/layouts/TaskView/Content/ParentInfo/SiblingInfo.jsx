import React from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { autoUpdate, offset, size, useFloating } from "@floating-ui/react-dom";
import { Menu } from "@headlessui/react";
import { ChevronRightIcon16, SubTaskIcon16, ThickCheckIcon24 } from "@assets";
import { CheckboxDisplay } from "@components/checkboxes";
import { Z50Portal } from "@components/portals";
import { useWidth } from "@contexts";
import { classNames } from "@utils";

export default function SiblingInfo() {
  const { siblingOrder, tasks } = useLoaderData();
  const { taskId } = useParams();

  const width = useWidth();

  const { refs, floatingStyles } = useFloating({
    placement: width >= 751 ? "bottom-start" : "bottom-end",
    middleware: [
      offset({
        mainAxis: 4,
        crossAxis: -0.8,
      }),
      size({
        apply({ availableHeight, elements }) {
          elements.floating.style.setProperty(
            "--max-height",
            availableHeight + "px"
          );
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  return (
    <Menu>
      {({ open }) => (
        <>
          <Menu.Button
            ref={refs.setReference}
            className={classNames(
              "flex items-center gap-0.5 rounded-r-[5px] border border-l-0 border-divider-secondary pl-1.5 pr-0.5 transition-colors duration-300",
              open
                ? "bg-quaternary-hover-fill text-quaternary-hover-tint"
                : "text-quaternary-tint ",
              "focus-visible:bg-quaternary-hover-fill focus-visible:text-quaternary-hover-tint",
              "enabled:hover:bg-quaternary-hover-fill enabled:hover:text-quaternary-hover-tint",
              "enabled:active:scale-[.97] enabled:active:transition-transform enabled:active:duration-200 enabled:active:ease-[cubic-bezier(.02,1.505,.745,1.235)]"
            )}
          >
            <span className="text-content-secondary">
              <SubTaskIcon16 />
            </span>
            <span className="select-none font-reactist text-xs">
              {siblingOrder.length}
            </span>
            <span>
              <ChevronRightIcon16 />
            </span>
          </Menu.Button>
          {open && (
            <Z50Portal ref={refs.setFloating} style={floatingStyles}>
              <Menu.Items
                static
                className={classNames(
                  "box-content flex max-h-[var(--max-height)] min-w-[280px] max-w-[300px] select-none overflow-hidden rounded-[10px] border border-divider-secondary bg-menu shadow-[0_0_8px_rgba(0,0,0,.12)]",
                  "focus-visible:outline-none"
                )}
              >
                <div className="grow overflow-y-auto overflow-x-hidden py-1.5">
                  <p className="px-2.5 py-[5px] font-reactist text-[13px]/[16.8px] font-semibold text-content-primary">
                    Sub-tasks
                  </p>
                  {tasks
                    .filter((t) => siblingOrder.includes(t.id))
                    .map((siblingTask) => (
                      <Menu.Item
                        key={siblingTask.id}
                        as={Link}
                        to={`../task/${siblingTask.id}`}
                        className="mx-1.5 flex h-8 items-center gap-2 rounded-[5px] px-1.5 ui-active:bg-focus-fill"
                      >
                        <CheckboxDisplay
                          isCompleted={siblingTask.isCompleted}
                          priority={siblingTask.priority}
                        />
                        <span
                          className={classNames(
                            "font-reactist text-sm/[1.65] tracking-dark",
                            siblingTask.isCompleted
                              ? "text-content-secondary line-through"
                              : "text-content-primary"
                          )}
                        >
                          {siblingTask.name}
                        </span>
                        {siblingTask.id === taskId && (
                          <span className="text-display-secondary">
                            <ThickCheckIcon24 />
                          </span>
                        )}
                      </Menu.Item>
                    ))}
                </div>
              </Menu.Items>
            </Z50Portal>
          )}
        </>
      )}
    </Menu>
  );
}
