import { createContext } from 'react';

type coordinate = {
  la: number;
  lo: number;
}

export const recordState = {
  address: "",
  createdAt: "",
  distance: 0,
  memo: "",
  public: false,
  runtime: "",
  starRanking: 0,
  trailsImg: "",
  trailsName: "",
  trailsFile: null,
  coordinateList: [],
  centralCoordinatesLa: 0,
  centralCoordinatesLo: 0,
}

export interface RecordDetailType {
  address: string;
  createdAt: string;
  distance: number;
  memo: string;
  public: boolean;
  runtime: string;
  starRanking: number;
  trailsImg: string;
  trailsName: string;
  trailsFile?: File|null;
  coordinateList: coordinate[];
  centralCoordinatesLa: number;
  centralCoordinatesLo: number;
}

interface RecordContextType {
  record: RecordDetailType;
  setRecord: React.Dispatch<React.SetStateAction<RecordDetailType>>;
}

export const RecordContext = createContext<RecordContextType>({
  record: recordState,
  setRecord:() => {},
})