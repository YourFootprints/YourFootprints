import { css } from "@emotion/react";

const buttonBoxCss = css({
  width: "100%",
  height: "10%",
  backgroundColor: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "end",
  border: "none",
});

const buttonCss = css({
  padding: "5px",
  margin: "0 15px",
  fontSize: "1rem",
  ":hover": {
    cursor: "pointer",
  },
});
interface Props {
  closeBottom?: () => void;
  saveButton?: () => void;
}
export default function BottomSheetButtonMemo({ closeBottom, saveButton }: Props) {
  return (
    <div css={buttonBoxCss}>
      <p onClick={closeBottom} css={buttonCss}>
        취소
      </p>
      <p onClick={saveButton} css={buttonCss}>저장</p>
    </div>
  );
}
