import { css } from "@emotion/react";
import Backdrop from "../@common/BottomSheet/Backdrop";

const modalCss = css({
  width: "70%",
  height: "45%",
  zIndex: 12,
  top: "30%",
  left: "15%",
  position: "absolute",
  backgroundColor: "var(--white)",
  borderRadius: "15px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

interface porps {
  children: any;
}

export default function Modal({ children }: porps) {
  return (
    <Backdrop>
      <div css={[modalCss]}>{children}</div>
    </Backdrop>
  );
}
