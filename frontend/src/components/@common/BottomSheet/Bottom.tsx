import { css } from "@emotion/react";
import BottomSheetHeader from "./BottomSheetHeader";
import BottomSheetMain from "./BottomSheetMain";
import BottomSheetButton1 from "./BottomSheetButton1";
import BottomSheetButton2 from "./BottomShhetButton2";
import { BottomSheetContext } from "@/store/BottomSheetContext";
import { useContext } from "react";

const wapperCss = css`
  width: 100%;
  height: 100vh;
  z-index: 12;
  position: fixed;
  top: 40%;
`;

export default function Bottom() {
  const { isFilter } = useContext(BottomSheetContext);

  return (
    <div css={wapperCss}>
      <BottomSheetHeader />
      <BottomSheetMain />
      {isFilter ? <BottomSheetButton2 /> : <BottomSheetButton1 />}
    </div>
  );
}
