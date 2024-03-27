import { css } from "@emotion/react";
import kakaoimage from "@/assets/image/kakaoLoginImage.png";

// 로그인 버튼 스타일
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

// 환경변수 사용하기
// 실제 배포시에는 .env 파일 등을 사용하여 API 키와 Redirect URI를 관리하는 것이 좋습니다.
const VITE_KAKAO_REST_API_KEY = "387a65778152cfac269066d65fc23ab8";
// const VITE_KAKAO_REDIRECT_URI =
// "http://localhost:5173/oauth/callback/kakao/token"; // 로컬 개발용 Redirect URI
const VITE_KAKAO_REDIRECT_URI =
  "https://j10d207.p.ssafy.io/oauth/callback/kakao/token";

export default function Login() {
  // 카카오 로그인 URL 생성
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${VITE_KAKAO_REST_API_KEY}&redirect_uri=${VITE_KAKAO_REDIRECT_URI}&response_type=code`;

  // 로그인 핸들러: 버튼 클릭 시 카카오 로그인 페이지로 리다이렉트
  const loginHandler = () => {
    window.location.href = link;
  };

  // 로그인 버튼 렌더링
  return (
    <div>
      <div css={loginButtonStyle} onClick={loginHandler}>
        <img css={kakaoIconStyle} src={kakaoimage} alt="Kakao login" />
        <span css={kakaoTextStyle}>카카오 로그인</span>
      </div>
    </div>
  );
}
