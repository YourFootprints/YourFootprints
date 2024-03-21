import React, { useState } from "react";
import { css } from "@emotion/react";

// 폼 전체 스타일
const formStyle = css({
  display: "flex",
  flexDirection: "column",
  margin: "20px",
});

// 라벨 스타일
const labelStyle = css({
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "10px",
  alignSelf: "flex-start", // 왼쪽 상단 정렬
});

// 입력 필드 스타일
const inputStyle = css({
  marginTop: "35px",
  border: "none", // 테두리 없음
  borderBottom: "1px solid #ccc", // 밑줄 스타일
  padding: "10px",
  marginBottom: "10px",
  outline: "none", // 클릭 시 테두리 없음
  "&:focus": {
    borderBottom: "2px solid #666", // 포커스 시 밑줄 굵게 및 색상 변경
  },
});

// 힌트 스타일 (힌트의 보이기/숨기기 상태를 제어)
const hintStyle = (visible: boolean) =>
  css({
    visibility: visible ? "visible" : "hidden",
    color: "red",
    fontSize: "12px",
    alignSelf: "flex-start", // 왼쪽 상단 정렬
    marginBottom: "10px",
    marginLeft: "12px",
  });

// 닉네임 입력 폼 컴포넌트
const SignupPage1: React.FC = () => {
  const [nickname, setNickname] = useState("");
  const [isHintVisible, setHintVisible] = useState(false);

  // 입력 필드 변경 시 호출되는 함수
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNickname(value);
    // 입력된 값의 길이가 2보다 작거나 10보다 클 경우 힌트를 보여줌
    setHintVisible(value.length > 0 && (value.length < 2 || value.length > 10));
  };

  return (
    <div css={formStyle}>
      <label css={labelStyle} htmlFor="nickname">
        닉네임을 입력해주세요
      </label>
      <input
        css={inputStyle}
        type="text"
        id="nickname"
        name="nickname"
        placeholder="닉네임"
        value={nickname}
        onChange={handleInputChange}
        maxLength={10} // 닉네임 입력 최대 길이를 10글자로 제한
      />
      <div css={hintStyle(isHintVisible)}>
        두 글자 이상, 열 글자 이하로 작성해주세요
      </div>
      {/* 여기에 버튼 또는 다른 폼 요소를 추가할 수 있습니다. */}
    </div>
  );
};

export default SignupPage1;
