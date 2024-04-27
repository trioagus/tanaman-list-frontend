import {create} from "zustand";

type PaginationState = {
  page: number;
  limit: number;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
};

export const usePaginationStore = create<PaginationState>((set) => ({
  page: 1,
  limit: 10,
  setPage: (page: number) => set((state) => ({ ...state, page })),
  setLimit: (limit: number) => set((state) => ({ ...state, limit })),
}));
