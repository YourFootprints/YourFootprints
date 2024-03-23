import Navbar from "@/components/@common/Navbar";
import { Outlet } from "react-router-dom";
import { css } from "@emotion/react";

export default function HasNavbarLayout() {
  const style = css({
    marginBottom: "84px",
  })
  return (
    <div css={style}>
      <Outlet />
      <Navbar />
    </div>
  );
}
