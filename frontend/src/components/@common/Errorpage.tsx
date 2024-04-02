import { css } from "@emotion/react";
import Lottie from "react-lottie";
import { loadingOptions, errorOptions } from "@/assets/lotties/lottiesOptions";
import { useNavigate } from "react-router-dom";

const foot = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const minifoot = css({});

const buttonStyle = css({
  backgroundColor: "#007bff",
  color: "#fff",
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer",
  width: "300px",
  height: "30px",
  margin: "auto",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "#0056b3",
  },
  fontSize: "22px",
});
export default function Errorpage() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/login"); // "/login"으로 이동하는 함수
  };

  return (
    <div>
      <div css={foot}>
        <Lottie options={errorOptions} />
      </div>
      <h2>잘못된 접근입니다!</h2>
      <div css={buttonStyle} onClick={handleNavigate}>
        네 발자국 사이트로 가기
      </div>
      <div css={minifoot}>
        <Lottie options={loadingOptions} />
      </div>
    </div>
  );
}
