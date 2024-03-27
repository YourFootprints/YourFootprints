import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStore } from "@/store/token"; // 스토어 임포트

// const VITE_API_BASE_URL = "http://localhost:8080"; // 로컬용
const VITE_API_BASE_URL = "https://j10d207.p.ssafy.io";
// const VITE_API_BASE_NEXT_URL = "/api/oauth/callback/kakao/token/l-t-l?code"; // 로컬용
const VITE_API_BASE_NEXT_URL = "/api/oauth/callback/kakao/token/d-t-d?code"; // 배포용

export default function KakaoCallbackPage() {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code"); // 인가 코드
  const setToken = useStore((state) => state.setToken); // 스토어의 setToken 함수를 가져옴

  useEffect(() => {
    if (code) {
      axios
        .get(`${VITE_API_BASE_URL}${VITE_API_BASE_NEXT_URL}=${code}`)
        .then((res) => {
          setToken(res.headers.authorization); // 스토어에 토큰 저장
          console.log(res.data.data.isFirst);
          console.log(res);
          // 사용자가 첫 로그인인 경우 회원가입 페이지로, 그렇지 않은 경우 로그인 성공 페이지로 이동
          if (res.data.data.isFirst) {
            navigate("/signup");
          } else {
            navigate("/signup");
          }
        })
        .catch((err) => {
          console.error("로그인 에러", err);
        });
    }
  });

  return (
    <div>
      <div>로그인 중입니다...</div>
    </div>
  );
}
