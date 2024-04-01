import axios from "axios";
import { axiosAuthRequest } from "./axios";

// 산책목록 조회
export async function getTrails(token:string) {
  const url = "/api/main/trails/records";
  const config = { headers: { Authorization: token } }
  return await axios.get(url, config)
    .then(res => { console.log(res) })
    .catch(err => { console.log(err) })
}

// 산책기록 상세 조회
export const getTrailDetail = async (id:string|undefined) => {
  const res = await axiosAuthRequest.get(`/api/main/trails/${id}/records`)
  return res.data.data;
}