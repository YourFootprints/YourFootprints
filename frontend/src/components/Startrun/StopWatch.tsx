import { css } from "@emotion/react";
import StopIcon from "@/assets/@common/StopIcon.svg?react";

const CircleCss = css({
  width: "130px",
  height: "130px",
  borderRadius: "100%",
  border: "7px solid black",
  backgroundColor: "var(--white)",
  fontSize: "24px",
  fontFamily: "exBold",
  letterSpacing: "7px",
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
}
export default function StopWatch({ handleClickWalking, isWalking }: props) {
  return (
    <div>
      <div css={CircleWrapper}>
        <button
          onClick={handleClickWalking}
          css={[CircleCss, { borderColor: "var(--main-color)" }]}
        >
          {isWalking ? <StopIcon /> : "START"}
        </button>
        <button css={[CircleCss, { borderColor: "var(--error-color)" }]}>
          STOP
        </button>
      </div>
    </div>
  );
}
