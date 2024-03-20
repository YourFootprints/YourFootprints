import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
// import HomePage from "./pages/Main/HomePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StartrunPage from "./pages/Main/StartrunPage";

const router = createBrowserRouter([
  // 메인 홈페이지
  {
    path: "/",
    element: <StartrunPage />,
  },
  {
    path: "/startrun",
    element: <StartrunPage />,
  },
  // 로그인
  {
    path: "/login",
    element: <LoginPage />,
  },
  // 추가 정보 입력
  // {
  //   path: '/signup',
  //   element: <자기 페이지>,
  // },
  // 프로필
  // {
  //   path: '/profile',
  //   element: <자기 페이지>,
  // },
  // 산책로
  // {
  //   path: '/trails',
  //   element: <자기 페이지>,
  // },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
