import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStoreState {
  nickname: string;
  setNickname: (nickname: string) => void;
  areaName: string;
  setAreaName: (areaName: string) => void;
  walkStartTime: number;
  setWalkStartTime: (time: number) => void;
  walkEndTime: number;
  setWalkEndTime: (time: number) => void;
  profileImage: string;
  setProfileImage: (image: string) => void;
  likedTrailDtos: [];
  setlikedTrailDtos: (trail: []) => void;
  location: number[] | [];
  setLocation: (latlng: number[]) => void;
}

export const useUserStore = create(
  persist<UserStoreState>(
    (set) => ({
      nickname: "",
      setNickname: (nickname) => set({ nickname }),
      areaName: "",
      setAreaName: (areaName) => set({ areaName }),
      walkStartTime: 3,
      setWalkStartTime: (time) => set({ walkStartTime: time }),
      walkEndTime: 7,
      setWalkEndTime: (time) => set({ walkEndTime: time }),
      profileImage: "",
      setProfileImage: (image) => set({ profileImage: image }),
      likedTrailDtos: [],
      setlikedTrailDtos: (trail) => set({ likedTrailDtos: trail }),
      location: [],
      setLocation: (latlng) => set({ location: latlng }),
    }),
    {
      name: "userInfo",
      getStorage: () => localStorage,
    }
  )
);
