import Backdrop from "./Backdrop";
import { ReactNode } from "react";
import BottomSheetHeader from "./BottomSheetHeader";
import BottomSheetButtonMemo from "./BottomSheetButtonMemo";
import BottomShhetButtonFilter from "./BottomShhetButtonFilter";
import { css } from "@emotion/react";

const mainCss = css({
  width: "100%",
  height: "40%",
  backgroundColor: "var(--white)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderBottom: "1px solid var(--gray-100)",
});

// 텍스트에리어일때 쓰는것
// const contentCss = css({
//   width: "90%",
//   height: "90%",
//   display: "flex",
//   fontSize: "1.125rem",
//   overflowY: "scroll",
//   overflow: "hidden",
//   border: "none",
//   resize: "none",
//   "::placeholder": {
//     color: "var(--gray-100)",
//   },
//   ":focus": {
//     outline: "none",
//   },
// });

const wapperCss = css({
  width: "100%",
  height: "100vh",
  zIndex: 12,
  position: "fixed",
  top: "40%",
});

interface BottomSheetType {
  title?: string;
  children?: ReactNode;
  isFilter?: boolean;
  closeBottom?: () => void;
}

export default function BottomSheet({
  title,
  children,
  isFilter,
  closeBottom,
}: BottomSheetType) {
  return (
    <Backdrop closeBottom={closeBottom}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        css={wapperCss}
      >
        <BottomSheetHeader title={title} />
        <div css={mainCss}>{children}</div>
        {isFilter ? <></> : <BottomSheetButtonMemo closeBottom={closeBottom} />}
      </div>
    </Backdrop>
  );
}
