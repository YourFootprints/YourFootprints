import { BottomSheetContext } from "@/store/BottomSheetContext";
import { css } from "@emotion/react";
import { useContext } from "react";

const buttonboxCss = css`
  width: 100%;
  height: 10%;
  background-color: red;
  display: flex;
  align-items: center;
  justify-content: end;
  border-bottom: 0px solid var(--gray-100);
`;
export default function BottomSheetButton2() {
  const {closeBottom} = useContext(BottomSheetContext)
  return (
    <div css={buttonboxCss}>
      <button onClick={closeBottom}>취소</button>
      <button>저장</button>
    </div>
  );
}
