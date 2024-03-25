import { BottomSheetContext } from "@/store/BottomSheetContext";
import { css } from "@emotion/react";
import { useContext } from "react";

const backdropCss = css`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
`;
export default function Backdrop({ children }) {
  const {closeBottom} = useContext(BottomSheetContext)
  return <div onClick={closeBottom} css={backdropCss}>{children}</div>;
}
