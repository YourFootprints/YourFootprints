import { axiosAuthRequest } from "./axios";

// 내 발자국
export const getMyFootprint = async() => {
  const res = await axiosAuthRequest.get("/api/rankings/my-footsteps")
  return res.data.data;
}