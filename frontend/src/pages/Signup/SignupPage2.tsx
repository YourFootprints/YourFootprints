import React, { useState } from "react";
import { css } from "@emotion/react";

const formStyle = css({
  display: "flex",
  flexDirection: "column",
  margin: "20px",
});

const labelStyle = css({
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "10px",
  alignSelf: "flex-start", // 왼쪽 상단 정렬
});

const inputStyle = css({
  border: "1px solid #ccc",
  borderRadius: "4px",
  padding: "10px",
  marginBottom: "10px",
});

const hintStyle = (visible: boolean) =>
  css({
    visibility: visible ? "visible" : "hidden",
    color: "red",
    fontSize: "12px",
    alignSelf: "flex-start", // 왼쪽 상단 정렬
    marginTop: "-10px",
    marginBottom: "10px",
  });

const SignupPage2: React.FC = () => {
  const [nickname, setNickname] = useState("");
  const [isHintVisible, setHintVisible] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNickname(value);
    setHintVisible(value.length > 0 && (value.length < 2 || value.length > 10));
  };

  return (
    <div css={formStyle}>
      <label css={labelStyle} htmlFor="nickname">
        거주지역을 입력해주세요
      </label>
      <input
        css={inputStyle}
        type="text"
        id="nickname"
        name="nickname"
        placeholder="닉네임"
        value={nickname}
        onChange={handleInputChange}
      />
      <div css={hintStyle(isHintVisible)}>
        두글자 이상, 열글자 이하로 작성해주세요
      </div>
      {/* 여기에 버튼 또는 다른 폼 요소를 추가할 수 있습니다. */}
    </div>
  );
};

export default SignupPage2;
