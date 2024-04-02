import { css } from "@emotion/react";
import kakaoimage from "@/assets/image/kakaoLoginImage.png";

// 로그인 버튼 스타일
const loginButtonStyle = css({
  display: "flex", // 내부 요소를 수평으로 정렬합니다.
  alignItems: "center", // 세로 중앙 정렬을 합니다.
  justifyContent: "center", // 가로 중앙 정렬을 합니다.
  width: "80%", // 최대 너비
  height: "60px", // 버튼의 높이
  backgroundColor: "#FEE500", // 배경색 지정
  border: "none", // 테두리 없앰
  borderRadius: "10px", // 모서리 둥글게
  fontSize: "18px", // 폰트 크기
  fontWeight: "bold", // 폰트 두께
  color: "black", // 폰트 색상
  cursor: "pointer", // 커서 모양 변경
  boxSizing: "border-box", // 박스 크기 계산 방식 변경
});

const kakaoIconStyle = css({
  height: "30px", // 아이콘의 높이를 고정값으로 설정
  marginLeft: "15px",
});

const kakaoTextStyle = css({
  flex: 1, // 텍스트 요소가 남은 공간을 모두 차지하도록 설정
  textAlign: "center", // 텍스트를 중앙 정렬
  paddingRight: "30px",
});

export default function Login() {
  // 카카오 로그인 URL 생성
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${
    import.meta.env.VITE_KAKAO_REST_API_KEY
  }&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`;

  // 로그인 핸들러: 버튼 클릭 시 카카오 로그인 페이지로 리다이렉트
  const loginHandler = () => {
    window.location.href = link;
  };

  // 로그인 버튼 렌더링
  return (
    <>
      <div css={loginButtonStyle} onClick={loginHandler}>
        <img css={kakaoIconStyle} src={kakaoimage} alt="Kakao login" />
        <span css={kakaoTextStyle}>카카오 로그인</span>
      </div>
    </>
  );
}
