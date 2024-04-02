import { axiosAuthRequest } from "./axios";

// 내 발자국
export const getMyFootprint = async() => {
  const res = await axiosAuthRequest.get("/api/rankings/my-footsteps")
  return res.data.data;
}

// 동네 발자국
export const getAroundFootprint = async() => {
  const res = await axiosAuthRequest.get("/api/rankings/around-footsteps")
  return res.data.data;
}

// 동네 랭킹
export const getRanking = async() => {
  const res = await axiosAuthRequest.get("/api/rankings/week-rank");
  return res.data.data;
}