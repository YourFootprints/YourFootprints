import { createContext } from 'react';

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
}

interface RecordContextType {
  record: RecordDetailType;
  setRecord: React.Dispatch<React.SetStateAction<RecordDetailType>>;
}

export const RecordContext = createContext<RecordContextType>({
  record: recordState,
  setRecord:() => {},
})