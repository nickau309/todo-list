import { INIT_INPUT_VALUES } from "@/constants/quick-add-form";
import type { QuickAddFormType } from "@/types/quick-add-form";
import type { Dispatch, SetStateAction } from "react";
import type { StateCreator } from "zustand/vanilla";
import { createStore } from "zustand/vanilla";

type Sidebar = {
  showSidebarLg: boolean;
  showSidebarSm: boolean;
  setShowSidebarLg: (showSidebarLg: boolean) => void;
  setShowSidebarSm: (showSidebarSm: boolean) => void;
};

type SettingsMenu = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activeIndex: number | null;
  setActiveIndex: (activeIndex: number | null) => void;
};

type ResourcesMenu = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  hasFocusInside: boolean;
  setHasFocusInside: (hasFocusInside: boolean) => void;
  activeIndex: number | null;
  setActiveIndex: (activeIndex: number | null) => void;
};

type QuickAddDialog = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

type QuickAddForm = {
  defaultValues: QuickAddFormType;
  setDefaultValues: Dispatch<SetStateAction<QuickAddFormType>>;
  inputValues: QuickAddFormType;
  setInputValues: Dispatch<SetStateAction<QuickAddFormType>>;
  reset: (inputValues: QuickAddFormType) => void;
  setDescription: (description: QuickAddFormType["description"]) => void;
  setDueDate: (dueDate: QuickAddFormType["dueDate"]) => void;
  setLabelIds: (labelIds: QuickAddFormType["labelIds"]) => void;
  setName: (name: QuickAddFormType["name"]) => void;
  setPriority: (priority: QuickAddFormType["priority"]) => void;
  setProjectId: (projectId: QuickAddFormType["projectId"]) => void;
};

type ConfirmDialog = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleSubmit: (() => void) | null;
  setHandleSubmit: (handleSubmit: (() => void) | null) => void;
};

type SidebarSlice = {
  sidebar: Sidebar;
};

type SettingsMenuSlice = {
  settingsMenu: SettingsMenu;
};

type ResourcesMenuSlice = {
  resourcesMenu: ResourcesMenu;
};

type QuickAddDialogSlice = {
  quickAddDialog: QuickAddDialog;
};

type QuickAddFormSlice = {
  quickAddForm: QuickAddForm;
};

type ConfirmDialogSlice = {
  confirmDialog: ConfirmDialog;
};

export type State = SidebarSlice &
  SettingsMenuSlice &
  ResourcesMenuSlice &
  QuickAddDialogSlice &
  QuickAddFormSlice &
  ConfirmDialogSlice;

// SetStateAction<ProjectOptimisticType>
// >(project, (prevState, stateOrFn) => {
//   if (stateOrFn instanceof Function) {
//     return stateOrFn(prevState);
//   }
//   return stateOrFn;

const createSidebarSlice: StateCreator<State, [], [], SidebarSlice> = (set) => {
  return {
    sidebar: {
      showSidebarLg: true,
      showSidebarSm: false,
      setShowSidebarLg: (showSidebarLg) => {
        set((state) => ({
          sidebar: {
            ...state.sidebar,
            showSidebarLg,
          },
        }));
      },
      setShowSidebarSm: (showSidebarSm) => {
        set((state) => ({
          sidebar: {
            ...state.sidebar,
            showSidebarSm,
          },
        }));
      },
    },
  };
};

const createSettingsMenuSlice: StateCreator<
  State,
  [],
  [],
  SettingsMenuSlice
> = (set) => {
  return {
    settingsMenu: {
      isOpen: false,
      setIsOpen: (isOpen) => {
        set((state) => ({
          settingsMenu: {
            ...state.settingsMenu,
            isOpen,
          },
        }));
      },
      activeIndex: null,
      setActiveIndex: (activeIndex) => {
        set((state) => ({
          settingsMenu: {
            ...state.settingsMenu,
            activeIndex,
          },
        }));
      },
    },
  };
};

const createResourcesMenuSlice: StateCreator<
  State,
  [],
  [],
  ResourcesMenuSlice
> = (set) => {
  return {
    resourcesMenu: {
      isOpen: false,
      setIsOpen: (isOpen) => {
        set((state) => ({
          resourcesMenu: {
            ...state.resourcesMenu,
            isOpen,
          },
        }));
      },
      hasFocusInside: false,
      setHasFocusInside: (hasFocusInside) => {
        set((state) => ({
          resourcesMenu: {
            ...state.resourcesMenu,
            hasFocusInside,
          },
        }));
      },
      activeIndex: null,
      setActiveIndex: (activeIndex) => {
        set((state) => ({
          resourcesMenu: {
            ...state.resourcesMenu,
            activeIndex,
          },
        }));
      },
    },
  };
};

const createQuickAddDialogSlice: StateCreator<
  State,
  [],
  [],
  QuickAddDialogSlice
> = (set) => {
  return {
    quickAddDialog: {
      isOpen: false,
      setIsOpen: (isOpen) => {
        set((state) => ({
          quickAddDialog: {
            ...state.quickAddDialog,
            isOpen,
          },
        }));
      },
    },
  };
};

const createQuickAddFormSlice: StateCreator<
  State,
  [],
  [],
  QuickAddFormSlice
> = (set) => {
  return {
    quickAddForm: {
      defaultValues: INIT_INPUT_VALUES,
      setDefaultValues: (stateOrFn) => {
        set((state) => {
          const defaultValues =
            stateOrFn instanceof Function
              ? stateOrFn(state.quickAddForm.defaultValues)
              : stateOrFn;
          return {
            quickAddForm: {
              ...state.quickAddForm,
              defaultValues,
            },
          };
        });
      },
      inputValues: INIT_INPUT_VALUES,
      setInputValues: (stateOrFn) => {
        set((state) => {
          const inputValues =
            stateOrFn instanceof Function
              ? stateOrFn(state.quickAddForm.inputValues)
              : stateOrFn;
          return {
            quickAddForm: {
              ...state.quickAddForm,
              inputValues,
            },
          };
        });
      },
      reset: (inputValues) => {
        set((state) => ({
          quickAddForm: {
            ...state.quickAddForm,
            defaultValues: {
              ...inputValues,
            },
            inputValues: {
              ...inputValues,
            },
          },
        }));
      },
      setName: (name) => {
        set((state) => ({
          quickAddForm: {
            ...state.quickAddForm,
            inputValues: {
              ...state.quickAddForm.inputValues,
              name,
            },
          },
        }));
      },
      setDescription: (description) => {
        set((state) => ({
          quickAddForm: {
            ...state.quickAddForm,
            inputValues: {
              ...state.quickAddForm.inputValues,
              description,
            },
          },
        }));
      },
      setDueDate: (dueDate) => {
        set((state) => ({
          quickAddForm: {
            ...state.quickAddForm,
            inputValues: {
              ...state.quickAddForm.inputValues,
              dueDate,
            },
          },
        }));
      },
      setPriority: (priority) => {
        set((state) => ({
          quickAddForm: {
            ...state.quickAddForm,
            inputValues: {
              ...state.quickAddForm.inputValues,
              priority,
            },
          },
        }));
      },
      setLabelIds: (labelIds) => {
        set((state) => ({
          quickAddForm: {
            ...state.quickAddForm,
            inputValues: {
              ...state.quickAddForm.inputValues,
              labelIds,
            },
          },
        }));
      },
      setProjectId: (projectId) => {
        set((state) => ({
          quickAddForm: {
            ...state.quickAddForm,
            inputValues: {
              ...state.quickAddForm.inputValues,
              projectId,
            },
          },
        }));
      },
    },
  };
};

const createConfirmDialogSlice: StateCreator<
  State,
  [],
  [],
  ConfirmDialogSlice
> = (set) => {
  return {
    confirmDialog: {
      isOpen: false,
      setIsOpen: (isOpen) => {
        set((state) => ({
          confirmDialog: {
            ...state.confirmDialog,
            isOpen,
          },
        }));
      },
      handleSubmit: null,
      setHandleSubmit: (handleSubmit) => {
        set((state) => ({
          confirmDialog: {
            ...state.confirmDialog,
            handleSubmit,
          },
        }));
      },
    },
  };
};

export const createCounterStore = () => {
  return createStore<State>()((...props) => ({
    ...createSidebarSlice(...props),
    ...createSettingsMenuSlice(...props),
    ...createResourcesMenuSlice(...props),
    ...createQuickAddDialogSlice(...props),
    ...createQuickAddFormSlice(...props),
    ...createConfirmDialogSlice(...props),
  }));
};
