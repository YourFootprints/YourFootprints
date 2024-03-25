// store.ts
import { create } from "zustand";

// 스토어의 상태와 메서드에 대한 인터페이스 정의
interface StoreState {
  nickname: string;
  setNickname: (nickname: string) => void;
  areaName: string;
  setAreaName: (areaName: string) => void;
  walkStartTime: number;
  setWalkStartTime: (time: number) => void;
  walkEndTime: number;
  setWalkEndTime: (time: number) => void;
}

// 스토어 생성
export const useStore = create<StoreState>((set) => ({
  nickname: "",
  setNickname: (nickname) => set({ nickname }),
  areaName: "",
  setAreaName: (areaName) => set({ areaName }),
  walkStartTime: 3,
  setWalkStartTime: (time) => set({ walkStartTime: time }),
  walkEndTime: 7,
  setWalkEndTime: (time) => set({ walkEndTime: time }),
}));
