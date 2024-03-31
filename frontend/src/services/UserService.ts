import axios from "axios";

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

export const fetchWheater = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
        import.meta.env.VITE_OPEN_WEATHER_API_KEY
      }`
    );
    return response;
  } catch (error) {
    console.error("날씨를 받아오는데 실패했어요:", error);
  }
};
