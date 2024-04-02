import { create } from "zustand";
import { persist } from "zustand/middleware";

interface trailItem {
  likedTrailsId: number;
  trailsImgUrl: string;
  likedNum: number;
  distance: number;
  runtime: number;
  address: string;
  liked: boolean;
}
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
  likedTrailDtos: [] | trailItem[];
  setlikedTrailDtos: (trail: trailItem[]) => void;
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
    }),
    {
      name: "userInfo",
      getStorage: () => localStorage,
    }
  )
);
