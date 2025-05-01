import ConfirmDialog from "@/components/confirm-dialog";
import { INIT_INPUT_VALUES } from "@/constants/quick-add-form";
import { useProjects } from "@/contexts/projects-context";
import { useStore } from "@/contexts/store-context";
import useBeforeUnload from "@/hooks/use-before-unload";
import { useSelectedLayoutSegments } from "next/navigation";
import { useCallback, useMemo } from "react";
import useIsDirty from "./hooks/useIsDirty";
import QuickAddDialog from "./quick-add-dialog";
import QuickAddDialogButton from "./quick-add-dialog-button";
import QuickAddDialogPanel from "./quick-add-dialog-panel";
import QuickAddForm from "./quick-add-form";

export default function AddTask() {
  const projects = useProjects();

  const {
    isQuickAddDialogOpen,
    setIsQuickAddDialogOpen,
    resetQuickAddForm,
    isConfirmDialogOpen,
    setIsConfirmDialogOpen,
    handleConfirmDialogSubmit,
    setHandleConfirmDialogSubmit,
  } = useStore((state) => ({
    isQuickAddDialogOpen: state.quickAddDialog.isOpen,
    setIsQuickAddDialogOpen: state.quickAddDialog.setIsOpen,
    resetQuickAddForm: state.quickAddForm.reset,
    isConfirmDialogOpen: state.confirmDialog.isOpen,
    setIsConfirmDialogOpen: state.confirmDialog.setIsOpen,
    handleConfirmDialogSubmit: state.confirmDialog.handleSubmit,
    setHandleConfirmDialogSubmit: state.confirmDialog.setHandleSubmit,
  }));

  const segments = useSelectedLayoutSegments();
  const initProjectId =
    segments[0] === "project" &&
    projects.some((project) => project.id === Number(segments[1]))
      ? Number(segments[1])
      : null;
  const initDate = useMemo(() => {
    if (segments[0] === "today" || segments[0] === "upcoming") {
      return new Date();
    }
    return null;
  }, [segments]);

  const isDirty = useIsDirty();
  useBeforeUnload(isDirty);

  const onQuickAddDialogOpenChange = useCallback(
    (open: boolean) => {
      if (open) {
        setIsQuickAddDialogOpen(true);
        resetQuickAddForm({
          ...INIT_INPUT_VALUES,
          dueDate: initDate,
          projectId: initProjectId,
        });
      } else if (isDirty) {
        setIsConfirmDialogOpen(true);
        setHandleConfirmDialogSubmit(() => {
          setIsQuickAddDialogOpen(false);
          resetQuickAddForm({
            ...INIT_INPUT_VALUES,
          });
        });
      } else {
        setIsQuickAddDialogOpen(false);
      }
    },
    [
      initDate,
      initProjectId,
      isDirty,
      resetQuickAddForm,
      setHandleConfirmDialogSubmit,
      setIsConfirmDialogOpen,
      setIsQuickAddDialogOpen,
    ],
  );

  return (
    <QuickAddDialog
      open={isQuickAddDialogOpen}
      onOpenChange={onQuickAddDialogOpenChange}
    >
      <QuickAddDialogButton />
      <QuickAddDialogPanel>
        <QuickAddForm />
        <ConfirmDialog
          handleSubmit={handleConfirmDialogSubmit}
          onOpenChange={setIsConfirmDialogOpen}
          open={isConfirmDialogOpen}
        />
      </QuickAddDialogPanel>
    </QuickAddDialog>
  );
}
