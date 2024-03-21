// React와 필요한 Material-UI 컴포넌트들을 임포트합니다.
import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography"; // Typography 컴포넌트를 import 합니다.
import Box from "@mui/material/Box";

// Slider의 값을 문자열로 변환하는 함수입니다.
// 예를 들어, 선택된 값이 3일 경우 "3시간"이라는 문자열을 반환합니다.
function valuetext(value: number) {
  return `${value}시간`; // 예를 들어 '시간' 단위를 사용합니다.
}

// Slider에서 선택 가능한 최소 거리입니다.
const minDistance = 0;

// Slider에서 선택 가능한 최대 거리를 정의합니다.
const maxDistance = 10;

// SignupPage3 컴포넌트 정의
export const SignupPage3: React.FC = () => {
  // useState를 사용하여 Slider의 값(state)을 관리합니다.
  // 초기값으로 [2, 7]을 설정하여, 슬라이더가 처음에 2시간에서 7시간 사이를 가리키도록 합니다.
  const [value1, setValue1] = useState<number[]>([2, 7]);

  // Slider 값이 변경될 때 호출되는 함수입니다.
  // activeThumb은 현재 움직이고 있는 Slider의 thumb을 가리킵니다.
  const handleChange1 = (
    _: Event, // 첫 번째 매개변수인 이벤트 객체는 사용하지 않으므로, _로 표시합니다.
    newValue: number | number[],
    activeThumb: number
  ) => {
    // newValue가 배열이 아니라면 함수를 종료합니다.
    // Slider의 `range` 모드에서는 newValue가 항상 배열입니다.
    if (!Array.isArray(newValue)) {
      return;
    }

    // 첫 번째 thumb을 움직이는 경우입니다.
    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      // 두 번째 thumb을 움직이는 경우입니다.
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  return (
    // Box 컴포넌트를 사용하여 레이아웃을 구성합니다.
    <Box
      sx={{
        display: "flex", // flexbox 레이아웃을 사용합니다.
        flexDirection: "column", // 항목들을 세로로 배치합니다.
        margin: "20px", // 마진을 설정하여 주변 요소와의 간격을 줍니다.
      }}
    >
      {/* 'Typography' 컴포넌트를 사용하여 스타일을 적용한 텍스트를 렌더링합니다. */}
      <Typography
        sx={{
          fontSize: "20px", // 폰트 크기를 설정합니다.
          fontWeight: "bold", // 폰트 두께를 bold로 설정합니다.
          marginBottom: "10px", // 아래쪽 마진을 설정하여 요소 사이의 간격을 줍니다.
          alignSelf: "flex-start", // flexbox 컨테이너 내에서 자기 자신을 왼쪽 정렬합니다.
        }}
        component="label" // 이 컴포넌트가 렌더링할 HTML 엘리먼트의 종류를 'label'로 지정합니다.
        htmlFor="nickname" // 연결된 폼 요소의 ID를 지정합니다. 이 경우는 사용되지 않습니다.
      >
        희망 산책 시간을 설정해주세요
      </Typography>

      {/* Slider 컴포넌트를 렌더링합니다. */}
      <Slider
        getAriaLabel={() => "Minimum distance shift"} // 슬라이더의 목적을 설명하는 ARIA 라벨을 제공합니다. 스크린 리더가 이 정보를 사용자에게 읽어줍니다.
        value={value1} // 현재 슬라이더의 값입니다. 이 경우, `value1` 상태의 값([2, 7])을 사용하며, 이는 슬라이더의 두 개의 선택된 값(썸)을 나타냅니다.
        onChange={handleChange1} // 값이 변경될 때 호출되는 이벤트 핸들러 함수입니다.
        valueLabelDisplay="auto" // 슬라이더 위에 현재 값의 레이블을 자동으로 표시합니다. 사용자가 슬라이더를 조작할 때 값이 보입니다.
        getAriaValueText={valuetext} // 슬라이더의 현재 값을 문자열로 변환하여 스크린 리더 사용자에게 읽어주는 함수입니다.
        valueLabelFormat={valuetext} // 값 레이블의 포맷을 결정하는 함수입니다. "시간" 단위를 추가합니다.
        disableSwap // 두 썸(thumb) 간의 위치가 교환되는 것을 방지합니다.
        min={minDistance} // 슬라이더의 최소값을 정의합니다.
        max={maxDistance} // 슬라이더의 최대값을 정의합니다.
      />
    </Box>
  );
};

export default SignupPage3;
