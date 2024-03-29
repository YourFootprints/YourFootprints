import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoreState {
  token: string | null;
  setToken: (token: string | null) => void;
}

export const useTokenStore = create(
  persist<StoreState>(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
    }),
    {
      name: "token", // 로컬 스토리지에 저장될 때 사용할 이름
      getStorage: () => localStorage, // 사용할 스토리지 유형 (이 경우 로컬 스토리지)
    }
  )
);
