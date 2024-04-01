import { createContext } from 'react';

export const trailState = {
  address: "",
  createdAt: "",
  distance: 0,
  memo: "",
  public: false,
  runtime: "",
  starRanking: 0,
  trailsImg: "",
  trailsName: "",
}

export interface TrailType {
  address: string;
  createdAt: string;
  distance: number;
  memo: string;
  public: boolean;
  runtime: string;
  starRanking: number;
  trailsImg: string;
  trailsName: string;
}

interface TrailContextType {
  trail: TrailType;
  setTrail: React.Dispatch<React.SetStateAction<TrailType>>;
}

export const TrailContext = createContext<TrailContextType>({
  trail: trailState,
  setTrail:() => {},
})