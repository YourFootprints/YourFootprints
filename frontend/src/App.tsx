import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "@pages/Login/LoginPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SignupPage from "./pages/Signup/Stepper";
import StartWalkPage from "./pages/Main/StartWalkPage";
import HomePage from "./pages/Main/HomePage";
import HasNavbarLayout from "./pages/@Layout/HasNavbarLayout";
import ErrorLayout from "./pages/@Layout/ErrorLayout";
import RecordPage from "@pages/Record/RecordPage";
import RecordTrailDetailPage from "./pages/Record/RecordTrailDetailPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import FirstLoginPage from "@/pages/Login/FirstLoginPage";
import ProfileSetting from "@/pages/Profile/ProfileSetting";
import RecordEditPage from "@pages/Record/RecordEditPage";
import RankingPage from "./pages/Ranking/RankingPage";
import TrailDetailPage from "./pages/Trail/TrailDetailPage";
import TrailListPage from "./pages/Trail/TrailListPage";
import PrivateRoute from "./pages/@Layout/PrivateRoute";

const router = createBrowserRouter([
  // Navbar 레이아웃이 필요 할 경우, 여기 children 등록하세요
  {
    path: "/",
    element: <HasNavbarLayout />,
    errorElement: <ErrorLayout />,
    children: [
      // 메인
      {
        path: "/",
        element: <HomePage />,
      },
      // 프로필
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      // 기록
      {
        path: "/record",
        element: <RecordPage />,
      },
      // 랭킹
      {
        path: "/ranking",
        element: <RankingPage />,
      },
      // 산책로
      {
        path: "/trails",
        element: <TrailListPage />,
      },
    ],
  },
  // 산책 시작
  {
    path: "/startrun",
    element: (
      <PrivateRoute>
        <StartWalkPage />
      </PrivateRoute>
    ),
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
    path: "/record/:id",
    element: (
      <PrivateRoute>
        <RecordTrailDetailPage />
      </PrivateRoute>
    ),
  },

  // 기록 수정
  {
    path: "/record/edit/:id",
    element: (
      <PrivateRoute>
        <RecordEditPage />
      </PrivateRoute>
    ),
  },

  // 카카오 로그인 콜백 처리를 위한 라우트
  {
    path: "/oauth/callback/kakao/token",
    element: <FirstLoginPage />,
  },

  // 프로필 수정
  {
    path: "/setting",
    element: (
      <PrivateRoute>
        <ProfileSetting />
      </PrivateRoute>
    ),
  },
  // 산책로 디테일 페이지
  {
    path: "/trail/:id",
    element: (
      <PrivateRoute>
        <TrailDetailPage />
      </PrivateRoute>
    ),
  },
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
