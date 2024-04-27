import { create } from "zustand";
import {
  getJenis,
  getJenisById,
  addJenis,
  updateJenis,
  deleteJenis,
} from "../api/jenis";

type JenisType = {
  id?: string;
  name: string;
};

type JenisState = {
  Jenis: JenisType[];
  getJenis: () => void;
  getJenisById: (id: string) => void;
  addJenis: (Jenis: JenisType, token: string) => void;
  updateJenis: (id: string, Jenis: JenisType, token: string) => void;
  deleteJenis: (id: string) => void;
};

export const useJenisStore = create<JenisState>()((set) => ({
  Jenis: [],
  getJenis: async () => {
    const Jenis = await getJenis();
    set({ Jenis });
  },
  getJenisById: async (id: string) => {
    const Jenis = await getJenisById(id);
    set({ Jenis });
  },
  addJenis: async (jenis: JenisType, token: string) => {
    const Jenis = await addJenis(jenis, token);
    set({ Jenis });
  },
  updateJenis: async (id: string, jenis: JenisType, token: string) => {
    const Jenis = await updateJenis(id, jenis, token);
    set({ Jenis });
  },
  deleteJenis: async (id: string) => {
    const Jenis = await deleteJenis(id);
    set({ Jenis });
  },
}));
