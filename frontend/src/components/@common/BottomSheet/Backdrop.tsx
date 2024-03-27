import { BottomSheetContext } from "@/store/BottomSheetContext";
import { css } from "@emotion/react";
import { useContext, ReactNode } from "react";

const backdropCss = css({
  width: '100%',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 11,
});


interface BackdropProps {
  children : ReactNode
}
export default function Backdrop({ children }: BackdropProps) {
  const { closeBottom } = useContext(BottomSheetContext);
  return (
    <div onClick={closeBottom} css={backdropCss}>
      {children}
    </div>
  );
}
