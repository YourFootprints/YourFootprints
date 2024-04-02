import DetailHeader from "@/components/@common/DetailHeader";
import { css } from "@emotion/react";
import FilterIcon from "@/assets/Trail/FilterIcon.svg?react";
import ResetIcon from "@/assets/Trail/ResetIcon.svg?react";
import Trail from "@/components/@common/Trail";
import { useState } from "react";
import BottomSheet from "@/components/@common/BottomSheet/BottomSheet";
import { useUserStore } from "@/store/useUserStore";
import { useQuery } from "@tanstack/react-query";
import { fetchTrailList } from "@/services/TrailService";
import Filter from "@/components/Trail/Filter";
import Backdrop from "@/components/@common/BottomSheet/Backdrop";
import BottomSheetHeader from "@/components/@common/BottomSheet/BottomSheetHeader";
import { RecordType } from "@/store/Record/Records";

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
  // overflow: "hidden",
  padding: "16px 0",
});

const filterCss = css({
  width: "95%",
  display: "flex",
  justifyContent: "space-between",
  marginTop: "1rem",
  fontSize: "12px",
});

const wapperCss = css({
  width: "100%",
  height: "100vh",
  zIndex: 12,
  position: "fixed",
  top: "40%",
});

function valuetext(value: number) {
  const hours = Math.floor(value / 2);
  const minutes = (value % 2) * 30;
  if (hours === 0 && minutes === 30) {
    return `30분`;
  }
  return `${hours}:${minutes ? "30" : "00"}`;
}

export default function TrailListPage() {
  const [isFilter, setIsFilter] = useState(false);
  const [param, setParam] = useState({
    startTime: 12,
    endTime: 12,
    address: "",
  });
  const closeBottom = () => {
    setIsFilter(false);
  };

  const handleChangeParam = (value: {}) => {
    setParam((pre) => ({
      ...pre,
      ...value,
    }));
  };

  const { data, isLoading } = useQuery({
    queryKey: ["trails", param.startTime, param.endTime, param.address],
    queryFn: () =>
      fetchTrailList(param.startTime, param.endTime, param.address),
  });

  if (isLoading) {
    return <div>isLoding...</div>;
  }
  return (
    <div css={PageCss}>
      <DetailHeader title="산책로 목록" backURL="/" />
      <div css={[filterCss]}>
        <div css={[filterButtonCss]}>
          {param.startTime === 12 && param.startTime === 12 ? (
            <span></span>
          ) : (
            <span css={[badgeCss]}>
              {valuetext(param.startTime)}~{valuetext(param.endTime)}
            </span>
          )}
          {param.address === "" ? (
            <span></span>
          ) : (
            <span css={[badgeCss]}>{param.address}</span>
          )}
        </div>
        <div css={[filterButtonCss, { gap: "10px" }]}>
          <div
            onClick={() => {
              handleChangeParam({
                startTime: 12,
                endTime: 12,
                address: "",
              });
            }}
            css={[filterButtonCss]}
          >
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
        {data.data.trailsList.length > 0 ? (
          data.data.trailsList.map((trail: RecordType) => (
            <Trail
              key={trail.trailsId}
              url={`/trail/${trail.trailsId}`}
              record={trail}
            />
          ))
        ) : (
          <div css={[{ margin: "auto" }]}>찾으시는 산책로가 없어요...</div>
        )}
      </div>
      {isFilter && (
        <BottomSheet>
          <Backdrop closeBottom={closeBottom}>
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              css={wapperCss}
            >
              <BottomSheetHeader title="필터" />
              <Filter
                closeBottom={closeBottom}
                handleChangeParam={handleChangeParam}
              />
            </div>
          </Backdrop>
        </BottomSheet>
      )}
    </div>
  );
}
