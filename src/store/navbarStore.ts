import { create, SetState } from "zustand";

interface NavbarStore {
  isOpen: boolean;
  toggle: () => void;
}

export const useNavbarStore = create<NavbarStore>((set: SetState<NavbarStore>) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
