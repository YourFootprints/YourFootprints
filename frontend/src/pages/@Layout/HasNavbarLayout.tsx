import Navbar from "@/components/@common/Navbar";
import { Outlet } from "react-router-dom";

export default function HasNavbarLayout() {
  return (
    <>
      <Outlet />
      <Navbar />
    </>
  );
}
