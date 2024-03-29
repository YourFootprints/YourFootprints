import axios from "axios";

export const fetchProducts = (token: null | string) =>
  axios
    .get(`${import.meta.env.VITE_API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
      console.log(token);
    });
