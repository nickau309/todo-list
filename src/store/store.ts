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

type SidebarSlice = {
  sidebar: Sidebar;
};

type SettingsMenuSlice = {
  settingsMenu: SettingsMenu;
};

type ResourcesMenuSlice = {
  resourcesMenu: ResourcesMenu;
};

export type State = SidebarSlice & SettingsMenuSlice & ResourcesMenuSlice;

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

export const createCounterStore = () => {
  return createStore<State>()((...props) => ({
    ...createSidebarSlice(...props),
    ...createSettingsMenuSlice(...props),
    ...createResourcesMenuSlice(...props),
  }));
};
