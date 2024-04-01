import { useTokenStore } from "@/store/useTokenStore";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
interface props {
  children: ReactNode;
}
export default function PrivateRoute({ children }: props) {
  const { token } = useTokenStore();
  if (token) {
    return <>{children}</>;
  } else {
    alert("로그인을 먼저 해주세요!");
    return <Navigate to="/login" replace />;
  }
}
