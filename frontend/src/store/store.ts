// store.ts
import create from "zustand";

interface SignupState {
  nickname: string;
}

interface SignupActions {
  setNickname: (nickname: string) => void;
}

const useStore = create<SignupState & SignupActions>((set) => ({
  nickname: "",
  setNickname: (nickname: string) => set({ nickname }),
}));

export default useStore;
