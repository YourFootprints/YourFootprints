import { css } from "@emotion/react";
import StopIcon from "@/assets/@common/StopIcon.svg?react";

const CircleCss = css({
  width: "130px",
  height: "130px",
  borderRadius: "100%",
  border: "7px solid black",
  backgroundColor: "var(--white)",
  fontSize: "24px",
  fontFamily: "exbold",
  letterSpacing: "7px",
  "&:active": {
    backgroundColor: "var(--gray-50)",
  },
});

const CircleWrapper = css({
  display: "flex",
  justifyContent: "center",
  gap: "2.5rem",
  textAlign: "center",
  marginTop: "5%",
});
interface props {
  handleClickWalking: any;
  isWalking: boolean;
  stopWalk: any;
}
export default function StopWatch({
  handleClickWalking,
  isWalking,
  stopWalk,
}: props) {
  return (
    <div>
      <div css={CircleWrapper}>
        <button
          onClick={handleClickWalking}
          css={[
            CircleCss,
            { borderColor: "var(--main-color)", color: "var(--black)" },
          ]}
        >
          {isWalking ? <StopIcon /> : "START"}
        </button>
        <button
          onClick={stopWalk}
          css={[CircleCss, { borderColor: "var(--error-color)" }]}
        >
          STOP
        </button>
      </div>
    </div>
  );
}
