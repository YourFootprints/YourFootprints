import Navbar from "@/components/@common/Navbar";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { css } from "@emotion/react";
import { useTokenStore } from "@/store/useTokenStore";

export default function HasNavbarLayout() {
  const { token } = useTokenStore();
  const location = useLocation();
  const style = css({
    minHeight: "100vh",
    paddingBottom: "100px",
    boxSizing: "border-box",
  });

  if (token) {
    return (
      <div css={style}>
        <Outlet />
        <Navbar />
      </div>
    );
  } else {
    if (location.pathname === "/") {
      return <Navigate to="/login" replace />;
    } else {
      alert("로그인을 먼저 해주세요!");
      return <Navigate to="/login" replace />;
    }
  }
}
