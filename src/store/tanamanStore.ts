import { create } from "zustand";
import {
  getTanaman,
  getTanamanById,
  addTanaman,
  updateTanaman,
  deleteTanaman,
} from "../api/tanaman";

type Tanaman = {
  id?: string;
  name: string;
  latin: string;
  jenis_id: string;
  size: string;
  stock: number;
  code: string;
  price: number;
};

type TanamanState = {
  tanaman: Tanaman[];
  getTanaman: () => Promise<Tanaman[]>;
  getTanamanById: (id: string) => Promise<Tanaman>;
  addTanaman: (tanaman: Tanaman, token: string) => Promise<Tanaman>;
  updateTanaman: (
    id: string,
    tanaman: Tanaman,
    token: string
  ) => Promise<Tanaman>;
  deleteTanaman: (id: string, token: string) => Promise<Tanaman>;
  showTanamanForm: boolean;
  setShowTanamanForm: (showTanamanForm: boolean) => void;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  tanamanId: string;
  setTanamanId: (tanamanId: string) => void;
};

export const useTanamanStore = create<TanamanState>((set) => ({
  tanaman: [],
  getTanaman: async () => {
    try {
      const response = await getTanaman();
      set({ tanaman: response });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getTanamanById: async (id: string) => {
    try {
      const response = await getTanamanById(id);
      set({ tanaman: response });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  addTanaman: async (tanaman: Tanaman, token: string) => {
    try {
      const response = await addTanaman(tanaman, token);
      set((state) => ({ tanaman: [...state.tanaman, response] }));
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateTanaman: async (id: string, tanaman: Tanaman, token: string) => {
    try {
      const response = await updateTanaman(id, tanaman, token);
      set((state) => ({
        tanaman: state.tanaman.map((t: Tanaman) =>
          t.id === id ? response : t
        ),
      }));
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteTanaman: async (id: string, token: string) => {
    try {
      const response = await deleteTanaman(id, token);
      set((state) => ({
        tanaman: state.tanaman.filter((t: Tanaman) => t.id !== id),
      }));
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  showTanamanForm: false,
  setShowTanamanForm: (showTanamanForm: boolean) => set({ showTanamanForm }),
  editMode: false,
  setEditMode: (editMode: boolean) => set({ editMode }),
  tanamanId: "",
  setTanamanId: (tanamanId: string) => set({ tanamanId }),
}));
