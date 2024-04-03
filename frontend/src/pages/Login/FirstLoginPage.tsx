import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTokenStore } from "@/store/useTokenStore"; // 스토어 임포트
import Loading from "@/components/@common/Loading";

export default function KakaoCallbackPage() {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code"); // 인가 코드
  const setToken = useTokenStore((state: any) => state.setToken); // 스토어의 setToken 함수를 가져옴
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    if (code) {
      axios
        .get(
          `${import.meta.env.VITE_API_BASE_URL}${
            import.meta.env.VITE_API_BASE_NEXT_URL
          }=${code}`
        )
        .then((res) => {
          setToken(res.headers.authorization); // 스토어에 토큰 저장
          // localStorage.setItem("token", res.headers.authorization); // 로컬 스토리지에 토큰 저장
          // 사용자가 첫 로그인인 경우 회원가입 페이지로, 그렇지 않은 경우 로그인 성공 페이지로 이동
          if (res.data.data.isFirst) {
            navigate("/signup");
          } else {
            navigate("/");
          }
        })
        .catch((err) => {
          console.error("로그인 에러", err);
        })
        .finally(() => {
          setIsLoading(false); // 로딩 완료 후 상태 변경
        });
    }
  }, [code, navigate, setToken]);

  // 로딩 중에는 로딩 컴포넌트만 렌더링
  if (isLoading) {
    return <Loading />;
  }

  // 로딩이 끝나면 null을 반환하여 다른 컴포넌트가 렌더링되도록 함
  return null;
}
