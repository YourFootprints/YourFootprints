import { axiosAuthRequest } from "./axios";

function valuetext(value: number) {
  const hours = Math.floor(value / 2);
  const minutes = (value % 2) * 30;
  if (hours === 0 && minutes === 30) {
    return `30분`;
  }
  return `${hours}:${minutes ? "30" : "00"}`;
}

// 산책로 리스트 요청
export const fetchTrailList = async (
  walkStartTime: number,
  walkEndTime: number,
  address: string
) => {
  if (walkStartTime === 12 && walkEndTime === 12 && address === "") {
    try {
      const response = await axiosAuthRequest.get(
        `/api/search/trails/list?runtime=&address=`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }
  const addArr = address.split(" ");
  const startTime = valuetext(walkStartTime);
  const endTime = valuetext(walkEndTime);
  console.log(addArr, startTime, endTime, "실행중");
  try {
    const response = await axiosAuthRequest.get(
      `/api/search/trails/list?runtime=${startTime},${endTime}&address=${addArr[0]}%20${addArr[1]}%20${addArr[2]}%20`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
};

// 산책로 상세 요청
export const fetchTrailDetail = async (id: number) => {
  try {
    const response = await axiosAuthRequest.get(
      `/api/search/trails/list/${id}/detail/static`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
};
