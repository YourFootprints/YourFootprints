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

//산책로 찜 추가
export const addLikeList = async (id: number) => {
  const res = await axiosAuthRequest.post(`/api/users/add-like-list`, {
    trailsId: id,
  });
  return res;
};

// 산책로 찜 삭제
export const deleteLikeList = async (id: number) => {
  console.log(id);
  const res = await axiosAuthRequest.delete(
    `/api/users/delete-like-list/${id}`
  );
  return res;
};
