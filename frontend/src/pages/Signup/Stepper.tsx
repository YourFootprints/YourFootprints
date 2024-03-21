import { useState } from "react";
import { MobileStepper, Button, Box } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

import SignupPage1 from "./SignupPage1";
import SignupPage2 from "./SignupPage2";
import SignupPage3 from "./SignupPage3";

const getContentForStep = (step: number): JSX.Element => {
  switch (step) {
    case 0:
      return <SignupPage1 />;
    case 1:
      return <SignupPage2 />;
    case 2:
      return <SignupPage3 />;
    default:
      throw new Error("Unknown step");
  }
};

export default function SignupStepper() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const maxSteps = 3;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: "100%", flexGrow: 1, flexDirection: "column" }}>
      <MobileStepper
        variant="dots"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{
          justifyContent: "center",
          "& .MuiMobileStepper-dot": {
            width: 8, // 기본 dot 크기 설정
            height: 8,
            borderRadius: "50%",
            margin: "0 4px", // 좌우 여백 설정
            backgroundColor: "rgba(0, 0, 0, 0.26)", // 비활성 dot 색상 설정
          },
          "& .MuiMobileStepper-dotActive": {
            width: 16, // 활성 dot 길게 설정
            height: 8,
            borderRadius: 4, // 모서리를 약간 둥글게
            margin: "0 4px",
            backgroundColor: "#ff6f00", // 주황색으로 설정
          },
        }}
        nextButton={<></>}
        backButton={<></>}
      />
      <Box
        sx={{ display: "flex", justifyContent: "space-between", padding: 1 }}
      >
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
          <KeyboardArrowLeft />
          뒤로
        </Button>
        <Button
          size="small"
          onClick={handleNext}
          disabled={activeStep === maxSteps - 1}
        >
          다음
          <KeyboardArrowRight />
        </Button>
      </Box>
      {getContentForStep(activeStep)}
    </Box>
  );
}
