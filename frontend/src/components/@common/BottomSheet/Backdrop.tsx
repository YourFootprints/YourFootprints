import { css } from "@emotion/react";
import { ReactNode } from "react";

const backdropCss = css({
  width: "100%",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 11,
});

interface Props {
  children?: ReactNode;
  closeBottom?: () => void;
}
export default function Backdrop({ children, closeBottom }: Props) {
  return (
    <div onClick={closeBottom} css={backdropCss}>
      {children}
    </div>
  );
}
