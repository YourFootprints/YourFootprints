import axios from "axios";
import { axiosAuthRequest } from "./axios";

// 산책 시작시 요청
export const postStartWalk = async (
  lat: number,
  lon: number,
  token: string | null
) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/main/trails`,
      {
        runtime: "00:00:00",
        distance: 0,
        calorie: 0,
        la: lat,
        lo: lon,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("산책 시작을 실패했어요:", error);
  }
};
interface Location {
  la: number;
  lo: number;
}

interface inja {
  runtime: string;
  distance: number;
  calorie: number | string;
  spotLists: Location[] | [];
  id: number | null;
  token: string | null;
}

// 산책 종료시 요청
export const postEndWalk = async ({
  runtime,
  distance,
  calorie,
  spotLists,
  id,
  token,
}: inja) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/api/${id}/end`,
      {
        runtime,
        distance,
        calorie,
        spotLists,
      },
      {
        headers: {
          Authorization: token,
        },
        timeout: 15000,
      }
    );
    console.log(response);
  } catch (error) {
    console.error("산책 종료를 실패했어요:", error);
    throw error;
  }
};

interface pic {
  id: number;
  file: FormData;
}

// /api/main/trails/{trails-id}/end-image
// 산책 종료시 요청
export const putPicture = async ({ id, file }: pic) => {
  console.log(file, "file");
  try {
    const response = await axiosAuthRequest.put(
      `/api/main/trails/${id}/end-image`,
      {
        data: file,
      }
    );
    console.log(response);
  } catch (error) {
    console.error("산책 종료를 실패했어요:", error);
    throw error;
  }
};
