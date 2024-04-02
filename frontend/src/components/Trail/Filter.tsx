import CrosshairIcon from "@/assets/Trail/CrosshairIcon.svg?react";
import XIcon from "@/assets/@common/XIcon.svg?react";
import SubtractIcon from "@/assets/Trail/SubtractIcon.svg?react";
import Slider from "@mui/material/Slider";
import { css } from "@emotion/react";
import { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import BottomShhetButtonFilter from "../@common/BottomSheet/BottomShhetButtonFilter";
import { useProfileFindArea } from "@/pages/Profile/ProfileFindArea";

const contentCss = css({
  width: "90%",
  height: "90%",
  display: "flex",
  fontSize: "1rem",
  flexDirection: "column",
  alignItems: "start",
  gap: "2rem",
});

const sxCss = {
  color: "var(--main-color)",
  "& .MuiSlider-thumb": {
    color: "var(--main-color)",
  },
  "& .MuiSlider-track": {
    color: "var(--main-color)",
  },
  "& .MuiSlider-rail": {
    color: "var(--gray-100)",
  },
  "& .MuiSlider-markLabel": {
    color: "black",
  },
  "& .MuiSlider-markLabelActive": {
    color: "black",
  },
  "& .MuiSlider-mark": {
    backgroundColor: "var(--gray-200)",
    height: "4px",
    borderRadius: "50%",
  },
  "& .MuiSlider-valueLabel": {
    backgroundColor: "transparent",
    color: "var(--gray-200)",
    fontSize: "14px",
  },
};

const areaTitleCss = css({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
});

const areaInputWrapperCss = css({
  backgroundColor: "white",
  width: "100%",
  height: "50px",
  margin: "10px 0",
  borderRadius: "7px",
  outline: "1px solid var(--gray-100)",
  display: "flex",
  justifyContent: "center",
});

const areaInputCss = css({
  width: "95%",
  height: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1rem",
});

const areaInputContentCss = css({
  flexGrow: "10",
  display: "flex",
  justifyContent: "start",
  border: "none",
  "&:focus": {
    outline: "none",
  },
});

const crosshairCss = css({
  fontSize: "12px",
  display: "flex",
  alignItems: "center",
  gap: "5px",
  color: "var(--gray-200)",
});

const mainCss = css({
  width: "100%",
  height: "40%",
  backgroundColor: "var(--white)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderBottom: "1px solid var(--gray-100)",
});

function valuetext(value: number) {
  const hours = Math.floor(value / 2);
  const minutes = (value % 2) * 30;
  if (hours === 0 && minutes === 30) {
    return `30분`;
  }
  return `${hours}시간 ${minutes ? "30분" : ""}`;
}

const minDistance = 0;
const maxDistance = 10;

interface props {
  handleChangeParam: (value: {}) => void;
  closeBottom: () => void;
}

export default function Filter({ handleChangeParam, closeBottom }: props) {
  const { walkStartTime, walkEndTime, areaName} = useUserStore();
  const [timeFilter, setTimeFilter] = useState<number[]>([
    walkStartTime,
    walkEndTime,
  ]);
  const [area, setArea] = useState(areaName);

  const { handleGetCurrentLocation } = useProfileFindArea(setArea);

  const resetValue = () => {
    setTimeFilter([4, 6]);
    setArea("");
  };

  // 주소 변경 함수
  const handleInputChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setArea(value);
  };

  const handleChange = (
    _: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setTimeFilter([
        Math.min(newValue[0], timeFilter[1] - minDistance),
        timeFilter[1],
      ]);
    } else {
      setTimeFilter([
        timeFilter[0],
        Math.max(newValue[1], timeFilter[0] + minDistance),
      ]);
    }
  };

  return (
    <>
      <div css={mainCss}>
        <div css={[contentCss]}>
          <div>산책시간</div>
          <Slider
            css={[{ margin: "0 auto" }]}
            getAriaLabel={() => "Minimum distance shift"}
            value={timeFilter}
            onChange={handleChange}
            valueLabelDisplay="on"
            getAriaValueText={valuetext}
            valueLabelFormat={valuetext}
            step={1}
            marks
            disableSwap
            min={minDistance}
            max={maxDistance}
            sx={sxCss}
          />
          <div css={[{ width: "100%" }]}>
            <div css={[areaTitleCss]}>
              <div>동네</div>
              <div onClick={handleGetCurrentLocation} css={[crosshairCss]}>
                <CrosshairIcon />
                현재위치
              </div>
            </div>
            <div css={[areaInputWrapperCss]}>
              <div css={[areaInputCss]}>
                <SubtractIcon />
                <input
                  value={area}
                  onChange={handleInputChange2}
                  css={[areaInputContentCss]}
                />
                <XIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomShhetButtonFilter
        closeBottom={closeBottom}
        timeFilter={timeFilter}
        area={area}
        handleChangeParam={handleChangeParam}
        resetValue={resetValue}
      />
    </>
  );
}
