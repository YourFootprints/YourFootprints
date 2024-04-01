import { createContext } from 'react';
import testImg from "@/assets/image/testmap.png";

export const recordState = {
  address: "",
  distance: 0,
  like: false,
  likeNum: 0,
  runtime: 0,
  trailsId: 1,
  // FIXME 기본 이미지 변경
  trailsImg: testImg,
}

export interface RecordType {
  // 산책로 기록 목록
  address: string;    // 주소
  distance: number;   // 거리
  like: boolean;      // 사용자 좋아요 T/F
  likeNum: number;    // 좋아요 수
  runtime: number;    // 시간
  trailsId: number;   // 산책로 ID
  trailsImg: string;  // 산책로 이미지 url
}

interface RecordsContextType {
  trails: RecordType[];
  setTrails: React.Dispatch<React.SetStateAction<RecordType[]>>;
}

export const RecordsContext = createContext<RecordsContextType>({
  trails: [],
  setTrails: () => {},
})