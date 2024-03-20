import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 추가
import background from "@/assets/image/LoginPrint.png";
import kakaoimage from "@/assets/image/kakaoLoginImage.png";

function LoginPage() {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const backgroundStyle = css({
    width: "430px", // 전체 너비
    height: "932px", // 이미지 비율에 맞게 높이 조정
  });

  const loginButtonStyle = css({
    display: "flex", // 내부 요소를 수평으로 정렬합니다.
    alignItems: "center", // 세로 중앙 정렬을 합니다.
    justifyContent: "center", // 가로 중앙 정렬을 합니다.
    position: "absolute", // 절대 위치 지정
    bottom: "17%", // 이미지 하단으로부터 17% 위치에 배치
    left: "50%", // 가로축 중앙 정렬
    transform: "translateX(-50%)", // 가로축 중앙 정렬 fine-tuning
    width: "400px", // 최대 너비
    height: "50px", // 버튼의 높이
    backgroundColor: "#FEE500", // 배경색 지정
    border: "none", // 테두리 없앰
    borderRadius: "10px", // 모서리 둥글게
    fontSize: "18px", // 폰트 크기
    fontWeight: "bold", // 폰트 두께
    color: "black", // 폰트 색상
    cursor: "pointer", // 커서 모양 변경
    padding: "0 15px", // 내부 패딩 설정
    boxSizing: "border-box", // 박스 크기 계산 방식 변경
    WebkitJustifyContent: "center",
    paddingLeft: "15px", // 이미지가 왼쪽 끝에 닿지 않도록 패딩 추가
    paddingRight: "15px", // 텍스트가 오른쪽 끝에 닿지 않도록 패딩 추가
  });

  const kakaoIconStyle = css({
    height: "30px", // 아이콘의 높이를 고정값으로 설정
  });

  const kakaoTextStyle = css({
    flex: 1, // 텍스트 요소가 남은 공간을 모두 차지하도록 설정
    textAlign: "center", // 텍스트를 중앙 정렬
    paddingRight: "30px",
  });

  const handleSignupNavigation = () => {
    navigate("/signup"); // '/signup' 경로로 이동
  };

  return (
    <div>
      <img css={backgroundStyle} src={background} alt="background" />
      <div css={loginButtonStyle} onClick={handleSignupNavigation}>
        <img css={kakaoIconStyle} src={kakaoimage} alt="Kakao login" />
        <span css={kakaoTextStyle}>카카오 로그인</span>
      </div>
    </div>
  );
}

export default LoginPage;
