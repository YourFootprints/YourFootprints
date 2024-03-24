// React와 필요한 Material-UI 컴포넌트들을 임포트합니다.
import React, { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography"; // Typography 컴포넌트를 import 합니다.
import Box from "@mui/material/Box";
import { css } from "@emotion/react";
import { useStore } from "@/store/store";

// Slider의 값을 문자열로 변환하는 함수입니다.
// 예를 들어, 선택된 값이 3일 경우 "3시간"이라는 문자열을 반환합니다.

// 값이 30분 단위로 표시되도록 valuetext 함수를 업데이트합니다.
function valuetext(value: number) {
  const hours = Math.floor(value / 2);
  const minutes = (value % 2) * 30;
  if (hours === 0 && minutes === 30) {
    return `30분`; // "0시간" 대신 "30분"만 반환
  }
  return `${hours}시간 ${minutes ? "30분" : ""}`;
}

const sliderStyle = css({
  marginTop: "100px",
});

// Slider에서 선택 가능한 최소 거리입니다.
const minDistance = 0;

// Slider에서 선택 가능한 최대 거리를 정의합니다.
const maxDistance = 10;

// SignupPage3 컴포넌트 정의
export const SignupPage3: React.FC = () => {
  // useState를 사용하여 Slider의 값(state)을 관리합니다.
  // 초기값으로 [2, 3]을 설정하여, 슬라이더가 처음에 2시간에서 3시간 사이를 가리키도록 합니다.
  const [value1, setValue1] = useState<number[]>([2, 3]);
  const setWalkStartTime = useStore((state) => state.setWalkStartTime);
  const setWalkEndTime = useStore((state) => state.setWalkEndTime);

  // Zustand 스토어에서 산책시간을 가져옵니다.
  const walkStartTimeFromStore = useStore((state) => state.walkStartTime);
  const walkEndTimeFromStore = useStore((state) => state.walkEndTime);

  // 컴포넌트가 마운트될 때 스토어에서 가져온 산책시간으로 상태를 업데이트합니다.
  useEffect(() => {
    // 스토어에서 가져온 산책 시작 시간과 종료 시간으로 슬라이더의 상태를 업데이트합니다.
    setValue1([walkStartTimeFromStore, walkEndTimeFromStore]);
  }, [walkStartTimeFromStore, walkEndTimeFromStore]);

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

    // newValue 배열에서 시작과 끝 시간을 추출합니다.
    const [start, end] = newValue;

    // 스토어에 시작 및 끝 시간 저장
    setWalkStartTime(start);
    setWalkEndTime(end);

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
        css={sliderStyle}
        getAriaLabel={() => "Minimum distance shift"}
        value={value1}
        onChange={handleChange1}
        valueLabelDisplay="on"
        getAriaValueText={valuetext}
        valueLabelFormat={valuetext}
        step={1} // 슬라이더를 한 단계 이동할 때마다 1 증가 (30분 단위)
        marks
        disableSwap
        min={minDistance}
        max={maxDistance}
        sx={{
          color: "#4acf9a", // 슬라이더의 활성 색상을 초록색으로 설정합니다.
          "& .MuiSlider-thumb": {
            color: "#4acf9a", // thumb의 색상을 초록색으로 설정합니다.
          },
          "& .MuiSlider-track": {
            color: "#4acf9a", // track의 색상을 초록색으로 설정합니다.
          },
          "& .MuiSlider-rail": {
            color: "#bfbfbf", // rail의 색상을 회색으로 설정합니다.
          },
          "& .MuiSlider-markLabel": {
            color: "black", // 마크 라벨의 색상을 검정색으로 설정합니다.
          },
          "& .MuiSlider-markLabelActive": {
            color: "black", // 활성 마크 라벨의 색상을 검정색으로 설정합니다.
          },
          "& .MuiSlider-mark": {
            backgroundColor: "lightgray", // 마크의 색상을 진한 회색으로 설정합니다.
            width: "4px", // 마크의 너비를 설정합니다.
            height: "4px", // 마크의 높이를 설정합니다. 필요에 따라 조정 가능
            borderRadius: "50%", // 마크를 완전히 동그랗게 만듭니다.
          },
          "& .MuiSlider-valueLabel": {
            backgroundColor: "transparent", // 박스의 배경색을 투명하게 설정합니다.
            color: "grey", // 텍스트의 색상을 회색으로 설정합니다.
          },
        }}
      />
    </Box>
  );
};

export default SignupPage3;
