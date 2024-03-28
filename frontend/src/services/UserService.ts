import axios from "axios";

const token = localStorage.getItem("token");
export const fetchProducts = () =>
  axios
    .get("http://localhost:8080/api/users/profile", {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => {
      localStorage.setItem("products", JSON.stringify(response.data));
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
