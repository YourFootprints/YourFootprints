import { axiosAuthRequest } from "./axios";

export const fetchMainInfo = async () => {
  try {
    const response = await axiosAuthRequest.get(`/api/main`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Detail:", error);
  }
};
