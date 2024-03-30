import DetailHeader from "@/components/@common/DetailHeader";
import MapBox from "@/components/@common/MapBox";
import UnderLineButton from "@/components/@common/UnderLineButton";
import { css } from "@emotion/react";
import { useState } from "react";
import { FacilityList, safetyFacilityList } from "@/constants/FacilityList";
import FootInfoWrapper from "@/components/@common/FootInfo/FootInfoWrapper";
import FootInfoItem from "@/components/@common/FootInfo/FootInfoItem";
import FootInfoItemStar from "@/components/@common/FootInfo/FootInfoItemStar";
import { Review } from "@/components/Record/Review";
import { backgroundTheme } from "@/constants/ColorScheme";
import BottomSheet from "@/components/@common/BottomSheet/BottomSheet";
import PathIcon from "@/assets/Navbar/PathIcon.svg?react";
import HeartIcon from "@/assets/@common/HeartIcon.svg?react";
// import NoheartIcon from "@/assets/@common/NoheartIcon.svg?react";

const PageCss = css({
  width: "100%",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const FacilityListWraaper = css({
  width: "90%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "start",
  gap: "25px",
  marginTop: "1.5rem",
});

const FacilityCss = css({
  width: "50px",
  height: "50px",
  borderRadius: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const FacilityIconCss = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "5px",
});

const lineCss = css({
  width: "100%",
  height: "10px",
  backgroundColor: "var(--gray-50)",
});

const navCss = css({
  width: "100%",
  maxWidth: "430px",
  height: "60px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#f4f4f4",
  position: "fixed",
  bottom: "0",
  zIndex: "10",
});

const likedCss = css({
  width: "30%",
  height: "100%",
  backgroundColor: "var(--gray-100)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "var(--white)",
  fontSize: "18px",
  gap: "5px",
});

const startCss = css({
  width: "70%",
  height: "100%",
  backgroundColor: "var(--main-color)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "var(--white)",
  fontSize: "18px",
  gap: "5px",
});

const reviews = {
  box: css(
    {
      width: "90%",
      marginTop: "2rem",
      display: "flex",
      flexDirection: "column",
      gap: "8vw",
      "@media(min-width: 430px)": {
        gap: "36px",
      },
    },
    backgroundTheme.basic
  ),

  memo: css({
    width: "100%",
    minHeight: "25vw",
    maxHeight: "50vw",
    overflow: "scroll",
    overflowY: "hidden",
    border: "1px solid var(--gray-100)",
    borderRadius: "10px",
    padding: "3.5vw",
    boxSizing: "border-box",
    textAlign: "left",
    fontSize: "2.8vw",
    "@media(min-width: 430px)": {
      minHeight: "110px",
      maxHeight: "220px",
      padding: "15px",
      fontSize: "12px",
    },
  }),
};

const first = "편의시설";
const second = "안전시설";
export default function TrailDetailPage() {
  const [_copyMap, setCopyMap] = useState<any>(null);
  const [select, setSelect] = useState(first);
  const [editMemo, setEditMemo] = useState(false);

  const handliClickSelect = (value: string) => {
    setSelect(value);
  };
  const handleCopyMap = (value: any) => {
    setCopyMap(value);
  };
  return (
    <div css={PageCss}>
      <DetailHeader title="ㅇㅇ님의 발자국" backURL="/" />
      <MapBox
        width="100%"
        height="40%"
        lat={33.450701}
        lng={126.570667}
        handleCopyMap={handleCopyMap}
      />
      <UnderLineButton
        first={first}
        second={second}
        select={select}
        handliClickSelect={handliClickSelect}
      />
      {select === first ? (
        <div css={[FacilityListWraaper]}>
          {FacilityList.map((Facility) => (
            <div css={[FacilityIconCss]}>
              <div
                key={Facility.name}
                css={[FacilityCss, { backgroundColor: Facility.bgColor }]}
              >
                {Facility.icon}
              </div>
              <div css={[{ fontSize: "12px" }]}>{Facility.name}</div>
            </div>
          ))}
        </div>
      ) : (
        <div css={[FacilityListWraaper]}>
          {safetyFacilityList.map((Facility) => (
            <div css={[FacilityIconCss]}>
              <div
                key={Facility.name}
                css={[FacilityCss, { backgroundColor: Facility.bgColor }]}
              >
                {Facility.icon}
              </div>
              <div css={[{ fontSize: "12px" }]}>{Facility.name}</div>
            </div>
          ))}
        </div>
      )}
      <FootInfoWrapper>
        <FootInfoItem title="시간" value="01:20:15" />
        <FootInfoItem title="거리" value="4.2km" />
        <FootInfoItem title="서울시 도로구" value="개봉동" />
        <FootInfoItemStar value="4.0" />
      </FootInfoWrapper>
      <div css={[lineCss]} />
      <div css={reviews.box}>
        <Review
          title={"메모"}
          content={<div css={reviews.memo}>'gege</div>}
          click={() => {
            setEditMemo(true);
          }}
        />
        {editMemo && (
          <BottomSheet
            closeBottom={() => {
              setEditMemo(false);
            }}
            title="메모"
            content={"few"} // [API]
            isFilter={false}
          />
        )}
      </div>

      <div css={[navCss]}>
        <div css={[likedCss]}>
          <HeartIcon />
          79
        </div>
        <div
          css={[
            startCss,
            {
              path: {
                stroke: "var(--white)",
              },
            },
          ]}
        >
          <PathIcon />
          산책시작!
        </div>
      </div>
    </div>
  );
}
