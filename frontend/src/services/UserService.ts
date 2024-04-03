import axios from "axios";

// 프로필 요청
export const fetchProfile = async (token: null | string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/users/profile`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
};

// 날씨 요청
export const fetchWheater = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
        import.meta.env.VITE_OPEN_WEATHER_API_KEY
      }`
    );
    console.log(response)
    return response;
  } catch (error) {
    console.error("날씨를 받아오는데 실패했어요:", error);
  }
};
