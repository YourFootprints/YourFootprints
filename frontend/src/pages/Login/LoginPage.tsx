import { css } from "@emotion/react";
// import { useNavigate } from "react-router-dom"; // useNavigate 훅 추가
import background from "@/assets/image/LoginPrint.png";
import KakaoButton from "@/components/Login/KakaoButton";

function LoginPage() {
  // const navigate = useNavigate(); // useNavigate 훅 사용

  const backgroundStyle = css({
    width: "430px", // 전체 너비
    height: "932px", // 이미지 비율에 맞게 높이 조정
  });

  return (
    <div>
      <img css={backgroundStyle} src={background} alt="background" />
      <KakaoButton />
    </div>
  );
}

export default LoginPage;
