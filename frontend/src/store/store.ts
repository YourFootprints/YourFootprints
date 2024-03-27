// store.ts
import { create } from "zustand";
import SampleIcon from "@/assets/image/sample.jpg";

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
  profileImage: string; // 프로필 이미지 상태 추가
  setProfileImage: (image: string) => void; // 프로필 이미지를 설정하는 메서드 추가
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
  profileImage: SampleIcon, // 초기 프로필 이미지 설정
  setProfileImage: (image) => set({ profileImage: image }), // 프로필 이미지 설정 메서드
}));
