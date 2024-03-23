import { useState } from "react";
import { useStore } from "@/store/store";
// Material UI에서 필요한 컴포넌트를 가져옵니다.
import { MobileStepper, Button, Box } from "@mui/material";

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
  const nickname = useStore((state) => state.nickname); // Zustand 스토어에서 닉네임 가져오기

  // 총 단계의 수입니다.
  const maxSteps = 3;

  const handleNext = () => {
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
          disabled={activeStep === maxSteps - 1}
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
          다음
        </Button>
      </Box>
      {getContentForStep(activeStep)}
    </Box>
  );
}
