import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useTheme } from "@/contexts";
import { classNames } from "@/utils";

export default function BaseOverlayDialog({
  afterLeave = () => {},
  children,
  initialFocus,
  isOpen,
  onClose = () => {},
}) {
  const { className } = useTheme();

  return (
    <Transition show={isOpen} as={Fragment} appear afterLeave={afterLeave}>
      <Dialog
        initialFocus={initialFocus}
        onClose={onClose}
        className={classNames("relative z-40", className)}
      >
        <Transition.Child
          as={Fragment}
          enter="transition duration-200 ease-in-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition duration-200 ease-in-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transition duration-200 ease-in-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition duration-200 ease-in-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0">{children}</div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
