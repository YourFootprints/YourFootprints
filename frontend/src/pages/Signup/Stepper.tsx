import { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { useTokenStore } from "@/store/useTokenStore";
// Material UI에서 필요한 컴포넌트를 가져옵니다.
import { MobileStepper, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// 가입 페이지 컴포넌트들을 가져옵니다.
import SignupPage1 from "./SignupPage1";
import SignupPage2 from "./SignupPage2";
import SignupPage3 from "./SignupPage3";

// 스텝퍼 단계에 따라 보여줄 컨텐츠를 반환하는 함수입니다.
const getContentForStep = (step: number): JSX.Element => {
  switch (step) {
    case 0:
      return <SignupPage1 />;
    case 1:
      return <SignupPage2 />;
    case 2:
      return <SignupPage3 />;
    default:
      // 정의되지 않은 단계일 경우 에러를 던집니다.
      throw new Error("Unknown step");
  }
};

export default function SignupStepper() {
  // 현재 활성화된 단계를 관리하는 상태입니다.
  const [activeStep, setActiveStep] = useState<number>(0);
  const nickname = useUserStore((state:any) => state.nickname); // Zustand 스토어에서 닉네임 가져오기
  const areaName = useUserStore((state:any) => state.areaName); // Zustand 스토어에서 지역 가져오기
  const walkStartTime = useUserStore((state:any) => state.walkStartTime); // Zustand 스토어에서 시간 가져오기
  const walkEndTime = useUserStore((state:any) => state.walkEndTime);
  const navigate = useNavigate();
  // useStore1에서 토큰 상태를 가져옵니다.
  const token = useTokenStore((state:any) => state.token);

  // 총 단계의 수입니다.
  const maxSteps = 3;

  // 산책 시간을 올바른 형식의 문자열로 변환하는 함수
  const formatWalkTime = (timeValue: number): string => {
    const hours = Math.floor(timeValue / 2);
    const minutes = (timeValue % 2) * 30;
    return `${hours > 0 ? `${hours}시간` : ""}${
      minutes > 0 ? ` ${minutes}분` : ""
    }`.trim();
  };

  const handleNext = () => {
    // 마지막 스텝에서 완료 버튼 클릭 처리
    if (activeStep === maxSteps - 1) {
      // 서버로 보낼 데이터 객체를 생성합니다.
      const userData = {
        nickName: nickname,
        address: areaName,
        requiredTimeStart: walkStartTime,
        requiredTimeEnd: walkEndTime,
      };

      const config = {
        headers: {
          Authorization: token,
        },
      };
      // Axios를 사용하여 put 요청을 보냅니다.
      axios
        .put(
          // "http://localhost:8080/api/users/remain-info", // 로컬용
          "https://j10d207.p.ssafy.io/api/users/remain-info", // 배포용
          userData,
          config
        )
        .then((_response) => {
          // 요청이 성공적으로 완료되면 실행됩니다.
          alert(
            `회원가입이 완료되었습니다 \n닉네임 : ${nickname} \n지역 : ${areaName} \n산책시간: ${formatWalkTime(
              walkStartTime
            )} ~ ${formatWalkTime(walkEndTime)}`
          );
          navigate("/"); // 사용자를 원하는 경로로 리디렉션할 수 있습니다.
        })
        .catch((error) => {
          // 요청이 실패하면 실행됩니다.
          console.error("회원가입 실패:", error);
          alert("회원가입에 실패했습니다. 다시 시도해주세요.");
        });
      return;
    }

    if (activeStep === 0) {
      // 닉네임 길이 검사와 특수 문자 검사
      if (
        nickname.length < 2 ||
        nickname.length > 10 ||
        !/^[a-zA-Z0-9가-힣]+$/.test(nickname)
      ) {
        alert("닉네임이 올바른 형식이 아닙니다. (특수문자 없이 2~10자 이내)");
        return; // 조건이 맞지 않으면 여기서 함수 실행을 중단합니다.
      }
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  // 이전 단계로 이동하는 함수
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // 컴포넌트의 렌더링
  return (
    <Box sx={{ width: "100%", flexGrow: 1, flexDirection: "column" }}>
      <MobileStepper
        // 점 형태의 스테퍼를 나타냅니다.
        variant="dots"
        // 총 단계의 수입니다.
        steps={maxSteps}
        // 스테퍼의 위치 설정입니다.
        position="static"
        // 현재 활성화된 단계입니다.
        activeStep={activeStep}
        sx={{
          // 중앙 정렬합니다.
          justifyContent: "center",
          // 비활성화된 점의 스타일을 정의
          "& .MuiMobileStepper-dot": {
            width: 8, // 기본 dot 크기 설정
            height: 8,
            borderRadius: "50%",
            margin: "0 4px", // 좌우 여백 설정
            backgroundColor: "rgba(0, 0, 0, 0.26)", // 비활성 dot 색상 설정
          },
          "& .MuiMobileStepper-dotActive": {
            width: 17, // 활성 dot 길게 설정
            height: 8,
            borderRadius: 4, // 모서리를 약간 둥글게
            margin: "0 4px",
            backgroundColor: "#4acf9a", // 메인색깔로 설정
          },
        }}
        nextButton={<></>}
        backButton={<></>}
      />
      <Box
        sx={{ display: "flex", justifyContent: "space-between", padding: 1 }}
      >
        <Button
          size="small"
          onClick={handleBack}
          disabled={activeStep === 0}
          sx={{
            fontSize: "17px",
            color: activeStep === 0 ? "lightgray" : "black", // 비활성화 시 lightgray, 활성화 시 black
            "&:hover": {
              color: "black", // 호버 상태일 때의 텍스트 색상
              fontWeight: "bold", // 호버 상태일 때 텍스트를 볼드처리
            },
            ...(activeStep === 0 && {
              color: "gray", // 비활성화 상태일 때의 텍스트 색상을 명시적으로 설정
            }),
          }}
        >
          뒤로
        </Button>

        <Button
          size="small"
          onClick={handleNext}
          // 마지막 스텝에서는 "완료" 버튼을 비활성화하지 않습니다.
          disabled={false}
          sx={{
            fontSize: "17px",
            color: activeStep === maxSteps - 1 ? "lightgray" : "black", // 비활성화 시 lightgray, 활성화 시 black
            "&:hover": {
              color: "black", // 호버 상태일 때의 텍스트 색상
              fontWeight: "bold", // 호버 상태일 때 텍스트를 볼드처리
            },
            ...(activeStep === maxSteps - 1 && {
              color: "gray", // 비활성화 상태일 때의 텍스트 색상을 명시적으로 설정
            }),
          }}
        >
          {activeStep === maxSteps - 1 ? "완료" : "다음"}
        </Button>
      </Box>
      {getContentForStep(activeStep)}
    </Box>
  );
}
