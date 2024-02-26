import React, { Fragment, forwardRef, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import Datepicker from "tailwind-datepicker-react";
import { ChevronLeftIcon24, ChevronRightIcon24 } from "@/assets";
import { useTheme } from "@/contexts";

const options = {
  autoHide: false,
  clearBtn: false,
  theme: {
    background: "rounded-[10px] bg-inherit text-base-primary",
    todayBtn:
      "text-inherit border focus:outline-none focus:ring-2 focus:border-transparent",
    input: "hidden",
    inputIcon: "hidden",
  },
  icons: {
    prev: () => (
      <span>
        <ChevronLeftIcon24 />
      </span>
    ),
    next: () => (
      <span>
        <ChevronRightIcon24 />
      </span>
    ),
  },
  datepickerClassNames: "!static p-0",
  defaultDate: new Date(),
};

const DueDateDropdown = forwardRef(function DueDateDropdown(
  { dueDate, setDueDate, ...attr },
  ref,
) {
  const [selectedDate, setSelectedDate] = useState(dueDate ?? new Date());

  const { name } = useTheme();

  const themeOption =
    name === "Dark"
      ? {
          icons:
            "bg-inherit transition-colors duration-300 hover:bg-[#4d4d4d] hover:text-white",
          text: "font-normal transition-colors duration-300 hover:bg-[#4d4d4d] hover:text-white",
          disabledText:
            "font-normal text-content-secondary transition-colors duration-300 hover:bg-[#4d4d4d] hover:text-white",
          selected: "!bg-[#de4c4a] !font-bold !text-white",
        }
      : {
          icons: "bg-inherit transition-colors duration-300 hover:bg-[#f1f1f1]",
          text: "font-normal transition-colors duration-300 hover:bg-[#f1f1f1]",
          disabledText:
            "font-normal text-content-secondary transition-colors duration-300 hover:bg-[#f1f1f1]",
          selected: "!bg-[#dd4b39] !font-bold !text-white",
        };

  return (
    <Transition as={Fragment} afterLeave={() => setDueDate(selectedDate)}>
      <Popover.Panel ref={ref} className="z-[60]" {...attr}>
        <div className="rounded-[10px] border border-dropdown bg-dropdown shadow-dropdown">
          <Datepicker
            options={{
              ...options,
              theme: { ...options.theme, ...themeOption },
              defaultDate: selectedDate,
            }}
            onChange={setSelectedDate}
            show={true}
            setShow={() => {}}
          />
        </div>
      </Popover.Panel>
    </Transition>
  );
});

export default DueDateDropdown;
