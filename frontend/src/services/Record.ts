import { axiosAuthRequest } from "./axios";

// 산책목록 조회
export const getRecords = async() => {
  const res = await axiosAuthRequest.get("/api/main/trails/records")
  return res.data.data.trailsRecords;
}

// 산책기록 상세 조회
export const getRecordDetail = async (id:string|undefined) => {
  const res = await axiosAuthRequest.get(`/api/main/trails/${id}/records`)
  return res.data.data;
}