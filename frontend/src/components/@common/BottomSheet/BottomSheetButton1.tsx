import { css } from "@emotion/react";

const buttonboxCss = css({
  width: '100%',
  height: '10%',
  backgroundColor: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'end',
  border: 'none',
});


const buttonCss = css({
  padding: '5px',
  margin: '0 15px',
  fontSize: '1rem',
  ':hover': {
    cursor: 'pointer',
  },
});
export default function BottomSheetButton1() {
  return (
    <div css={buttonboxCss}>
      <p css={buttonCss}>취소</p>
      <p css={buttonCss}>저장</p>
    </div>
  );
}
