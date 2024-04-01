import DetailHeader from "@/components/@common/DetailHeader";
import { css } from "@emotion/react";
import FilterIcon from "@/assets/Trail/FilterIcon.svg?react";
import ResetIcon from "@/assets/Trail/ResetIcon.svg?react";
import CrosshairIcon from "@/assets/Trail/CrosshairIcon.svg?react";
import XIcon from "@/assets/@common/XIcon.svg?react";
import SubtractIcon from "@/assets/Trail/SubtractIcon.svg?react";
import Trail from "@/components/@common/Trail";
import { useState } from "react";
import BottomSheet from "@/components/@common/BottomSheet/BottomSheet";
import { useUserStore } from "@/store/useUserStore";
import Slider from "@mui/material/Slider";
import { recordState } from "@/store/Record/Records";

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

const PageCss = css({
  width: "100%",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const filterButtonCss = css({
  display: "flex",
  gap: "5px",
  color: "var(--gray-200)",
  justifyContent: "center",
  alignItems: "center",
});

const badgeCss = css({
  fontSize: "12px",
  color: "var(--white)",
  backgroundColor: "var(--gray-200)",
  padding: "10px 15px",
  borderRadius: "30px",
});

const listWrapperCss = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  height: "80% ",
  marginTop: "1rem",
  gap: "1rem",
  overflowY: "scroll",
  overflow: "hidden",
  padding: "16px 0",
});

const filterCss = css({
  width: "95%",
  display: "flex",
  justifyContent: "space-between",
  marginTop: "1rem",
  fontSize: "12px",
});

const contentCss = css({
  width: "90%",
  height: "90%",
  display: "flex",
  fontSize: "1rem",
  flexDirection: "column",
  alignItems: "start",
  gap: "2rem",
});

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
});

const crosshairCss = css({
  fontSize: "12px",
  display: "flex",
  alignItems: "center",
  gap: "5px",
  color: "var(--gray-200)",
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

export default function TrailListPage() {
  const [isFilter, setIsFilter] = useState(false);
  const closeBottom = () => {
    setIsFilter(false);
  };
  const { walkStartTime, walkEndTime } = useUserStore();
  const [timeFilter, setTimeFilter] = useState<number[]>([
    walkStartTime,
    walkEndTime,
  ]);

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
    <div css={PageCss}>
      <DetailHeader title="산책로 목록" backURL="/" />
      <div css={[filterCss]}>
        <div css={[filterButtonCss]}>
          <span css={[badgeCss]}>2시간~3시간</span>
          <span css={[badgeCss]}>대구 북구 진평동</span>
        </div>
        <div css={[filterButtonCss, { gap: "10px" }]}>
          <div css={[filterButtonCss]}>
            <ResetIcon />
            초기화
          </div>
          <div
            onClick={() => {
              setIsFilter(true);
            }}
            css={[filterButtonCss]}
          >
            <FilterIcon />
            필터
          </div>
        </div>
      </div>
      <div css={[listWrapperCss]} id="ListWrapper">
        <Trail url={`/record/${1}`} record={recordState} />
        <Trail url={`/record/${1}`} record={recordState} />
        <Trail url={`/record/${1}`} record={recordState} />
        <Trail url={`/record/${1}`} record={recordState} />
      </div>
      {isFilter && (
        <BottomSheet title="필터" isFilter={true} closeBottom={closeBottom}>
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
                <div css={[crosshairCss]}>
                  <CrosshairIcon />
                  현재위치
                </div>
              </div>
              <div css={[areaInputWrapperCss]}>
                <div css={[areaInputCss]}>
                  <SubtractIcon />
                  <div css={[areaInputContentCss]}>내용</div>
                  <XIcon />
                </div>
              </div>
            </div>
          </div>
        </BottomSheet>
      )}
    </div>
  );
}
