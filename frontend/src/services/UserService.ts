import axios from "axios";

export const fetchProducts = (token: null | string) =>
  axios
    .get(
      // "http://localhost:8080/api/users/profile", // 로컬용
      "https://j10d207.p.ssafy.io/api/users/profile", //배포용
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
      console.log(token);
    });
