import { css } from "@emotion/react";

const buttonboxCss = css`
  width: 100%;
  height: 10%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: end;
  border: none;
`;

const buttonCss = css`
  padding: 5px;
  margin: 0 15px;
  font-size: 1rem;
  :hover {
    cursor: pointer;
  }
`;
export default function BottomSheetButton1() {
  return (
    <div css={buttonboxCss}>
      <p css={buttonCss}>취소</p>
      <p css={buttonCss}>저장</p>
    </div>
  );
}
