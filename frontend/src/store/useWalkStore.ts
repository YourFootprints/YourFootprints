import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Location {
  La: number;
  Ma: number;
}

interface useWalkStoreState {
  location: number[] | [];
  setLocation: (latlng: number[]) => void;
  walkId: number | null;
  setWalkId: (Id: number) => void;
  locationList: Location[] | [];
  setLocationList: (area: Location) => void;
  totalTime: string;
  setTotalTime: (time: string) => void;
  totalDistance: number;
  setTotalDistance: (dis: number) => void;
  totalKal: number | string;
  setTotalKal: (kal: number | string) => void;
  walking: boolean;
  setWalking: (st: boolean) => void;
  time: number;
  setTime: () => void;
}

export const useWalkStore = create(
  persist<useWalkStoreState>(
    (set) => ({
      location: [],
      setLocation: (latlng) => set({ location: latlng }),
      walkId: null,
      setWalkId: (Id) => set({ walkId: Id }),
      locationList: [],
      setLocationList: (area) =>
        set((state) => ({ locationList: [...state.locationList, area] })),
      totalTime: "00:00:00",
      setTotalTime: (time) => set({ totalTime: time }),
      totalDistance: 0,
      setTotalDistance: (dis) => set({ totalDistance: dis }),
      totalKal: 0,
      setTotalKal: (kal) => set({ totalKal: kal }),
      walking: false,
      setWalking: (st) => set({ walking: st }),
      time: 0,
      setTime: () => set((state) => ({ time: state.time + 1 })),
    }),
    {
      name: "Walk",
      getStorage: () => localStorage,
    }
  )
);
