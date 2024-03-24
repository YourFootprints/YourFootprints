import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "@pages/Login/LoginPage";
// import HomePage from "@pages/Main/HomePage";
import TestPage from "@pages/@Test/TestPage";
import TestDetailPage from "@pages/@Test/TestDetailPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SignupPage from "./pages/Signup/Stepper";
import StartrunPage from "./pages/Main/StartrunPage";
import HomePage from "./pages/Main/HomePage";
import HasNavbarLayout from "./pages/@Layout/HasNavbarLayout";
import ErrorLayout from "./pages/@Layout/ErrorLayout";
import RecordPage from "@pages/Record/RecordPage";
import RecordTrailDetailPage from "./pages/Record/RecordTrailDetailPage";
import ProfilePage from "./pages/Profile/ProfilePage";

const router = createBrowserRouter([
  ////// 테스트 페이지 (컴포넌트 확인용) //////
  // {
  //   path: "/test",
  //   element: <TestPage />,
  // },
  {
    path: "/testdetail/:id",
    element: <TestDetailPage />,
  },
  ///////////////////////////////////////////

  // Navbar 레이아웃이 필요 할 경우, 여기 children 등록하세요
  {
    path: "/",
    element: <HasNavbarLayout />,
    errorElement: <ErrorLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/startrun",
        element: <StartrunPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      // 기록
      {
        path: "/record",
        element: <RecordPage />,
        children: [
          // FIXME Navbar에 key 추가?
          // 기록 상세
          // {
          //   path: ":id",
          //   element: <RecordTrailDetailPage />
          // }
        ],
      },
      {
        path: "/test",
        element: <TestPage />,
      },
    ],
  },
  // 로그인
  {
    path: "/login",
    element: <LoginPage />,
  },

  // 추가 정보 입력
  {
    path: "/signup",
    element: <SignupPage />,
  },

  // 기록 상세
  {
    path: "/mytrail/:id",
    element: <RecordTrailDetailPage />,
  },

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
