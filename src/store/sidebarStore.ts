import {create} from 'zustand';

type SidebarState = {
  showSidebar: boolean;
  toggleSidebar: () => void;
};

export const useSidebarStore = create<SidebarState>((set) => ({
  showSidebar: false,
  toggleSidebar: () => set((state) => ({ showSidebar: !state.showSidebar })),
}));
