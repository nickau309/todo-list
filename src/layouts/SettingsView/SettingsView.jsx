import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import localforage from "localforage";
import { BaseOverlayDialog } from "@components/dialogs";
import {
  useConfirmDialogControl,
  useSettingsControl,
  useSettingsState,
} from "@contexts";
import { classNames } from "@utils";
import SettingsTab from "./SettingsTab";

export default function SettingsView() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);
  const [prevPathname, setPrevPathname] = useState("/");

  useEffect(() => {
    const fn = async () => {
      const keys = await localforage.keys();
      if (keys.includes("prevPathname")) {
        const prevPathname = await localforage.getItem("prevPathname");
        setPrevPathname(prevPathname);
      }
    };

    if (state?.prevPathname) {
      setPrevPathname(state.prevPathname);
      localforage.setItem("prevPathname", state.prevPathname);
    } else {
      fn();
    }
  }, [state]);

  const { openDialog } = useConfirmDialogControl();
  const { discardChanges } = useSettingsControl();
  const { hasChanged } = useSettingsState();

  const handleClose = () => {
    if (hasChanged) {
      openDialog({
        description: "The changes you've made won't be saved.",
        handleSubmit: (e) => {
          e.preventDefault();
          discardChanges();
          setIsOpen(false);
        },
        verb: "Discard",
        title: "Discard changes?",
      });
    } else {
      setIsOpen(false);
    }
  };

  return (
    <BaseOverlayDialog
      afterLeave={() => navigate(prevPathname)}
      isOpen={isOpen}
      onClose={handleClose}
    >
      <div className="grid h-full place-items-center pt-8 min-[580px]:p-8">
        <Dialog.Panel
          className={classNames(
            "h-full w-full overflow-hidden rounded-t-[10px] bg-default text-sm text-content-primary shadow-[0_2px_8px_rgb(0,0,0,.16)]",
            "min-[580px]:max-w-3xl min-[580px]:rounded-b-[10px]",
            "min-[750px]:max-h-[690px]",
            "min-[992px]:max-w-[960px]",
            "min-[1200px]:max-w-[1060px]"
          )}
        >
          <SettingsTab handleClose={handleClose} />
        </Dialog.Panel>
      </div>
    </BaseOverlayDialog>
  );
}
