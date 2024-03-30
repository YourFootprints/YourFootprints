import { css } from "@emotion/react";
import ResetIcon from "@/assets/Trail/ResetIcon.svg?react";

const buttonBoxCss = css({
  width: "100%",
  height: "10%",
  backgroundColor: "var(--white)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderBottom: "0px solid var(--gray-100)",
});

const buttonBoxContentCss = css({
  width: "90%",
  height: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const filterButtonCss = css({
  display: "flex",
  gap: "5px",
  color: "var(--gray-200)",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "14px",
});

const buttonCss = css({
  backgroundColor: "var(--main-color)",
  width: "80px",
  height: "36px",
  borderRadius: "5px",
  lineHeight: "36px",
  textAlign: "center",
  color: "var(--white)",
  fontSize: "1rem",
});


export default function BottomShhetButtonFilter() {
  return (
    <div css={buttonBoxCss}>
      <div css={[buttonBoxContentCss]}>
        <div css={[filterButtonCss]}>
          <ResetIcon />
          초기화
        </div>
        <div css={[buttonCss]}>적용</div>
      </div>
    </div>
  );
}
