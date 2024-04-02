import { css } from "@emotion/react";
// import { useNavigate } from "react-router-dom"; // useNavigate 훅 추가
import background from "@/assets/image/LoginPrint.png";
import KakaoButton from "@/components/Login/KakaoButton";
import Lottie from "react-lottie";
import {
  printOptions,
  loginwalkingOptions,
} from "@/assets/lotties/lottiesOptions";

const printStyle = css({
  position: "absolute", // Lottie에 absolute 설정
  bottom: "73.2%", // 아래에서 20px 떨어진 곳에 위치
  left: "56%", // 가로 중앙에 배치
  transform: "translateX(-50%)", // left 값의 50%만큼 왼쪽으로 이동하여 정중앙에 배치
  zIndex: 10, // 필요하다면 z-index 설정
  // 여기에 필요한 다른 스타일을 추가합니다.
});

const walkingStyle = css({
  position: "absolute", // Lottie에 absolute 설정
  bottom: "6%", // 아래에서 20px 떨어진 곳에 위치
  left: "50%", // 가로 중앙에 배치
  transform: "translateX(-50%)", // left 값의 50%만큼 왼쪽으로 이동하여 정중앙에 배치
  zIndex: 10, // 필요하다면 z-index 설정
  // 여기에 필요한 다른 스타일을 추가합니다.
});

function LoginPage() {
  // const navigate = useNavigate(); // useNavigate 훅 사용

  const backgroundStyle = css({
    width: "430px", // 전체 너비
    height: "932px", // 이미지 비율에 맞게 높이 조정
  });

  return (
    <div>
      <div css={printStyle}>
        <Lottie options={printOptions} height={90} width={90} />
      </div>
      <img css={backgroundStyle} src={background} alt="background" />
      <KakaoButton />
      <div css={walkingStyle}>
        <Lottie options={loginwalkingOptions} height={300} width={410} />
      </div>
    </div>
  );
}

export default LoginPage;
