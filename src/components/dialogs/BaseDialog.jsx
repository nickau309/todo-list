import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useTheme } from "@contexts";
import { classNames } from "@utils";

export default function BaseDialog({
  afterLeave = () => {},
  children,
  isOpen,
  onClose = () => {},
}) {
  const { className } = useTheme();

  return (
    <Transition show={isOpen} as={Fragment} appear afterLeave={afterLeave}>
      <Dialog
        onClose={onClose}
        className={classNames("relative z-40", className)}
      >
        <Transition.Child
          as={Fragment}
          enter="transition duration-100 ease-[cubic-bezier(.165,.84,.44,1)]"
          enterFrom="scale-[.6] opacity-0"
          enterTo="scale-100 opacity-100"
          leave="transition duration-100 ease-[cubic-bezier(.165,.84,.44,1)]"
          leaveFrom="scale-100 opacity-100"
          leaveTo="scale-[.6] opacity-0"
        >
          <div className="fixed inset-0">{children}</div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
