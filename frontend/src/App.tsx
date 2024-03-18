import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/Login/LoginPage";
import HomePage from "./pages/Main/HomePage";


const router = createBrowserRouter ([
  // 메인 홈페이지
  {
    path: '/',
    element: <HomePage />,
  },
  // 로그인
  {
    path: '/login',
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

])


function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
