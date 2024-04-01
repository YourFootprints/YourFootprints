import axios from "axios";

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
        latitude: lat,
        longitude: lon,
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
  La: number;
  Ma: number;
}

interface inja {
  runtime: string;
  distance: number;
  calorie: number | string;
  spotLists: Location[] | [];
  id: number | null;
  token: string | null;
}
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
      }
    );
    console.log(response);
  } catch (error) {
    console.error("산책 종료를 실패했어요:", error);
    throw error;
  }
};
