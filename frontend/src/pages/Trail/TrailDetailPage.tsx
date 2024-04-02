import DetailHeader from "@/components/@common/DetailHeader";
import MapBox from "@/components/@common/MapBox";
import UnderLineButton from "@/components/@common/UnderLineButton";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { FacilityList, safetyFacilityList } from "@/constants/FacilityList";
import FootInfoWrapper from "@/components/@common/FootInfo/FootInfoWrapper";
import FootInfoItem from "@/components/@common/FootInfo/FootInfoItem";
import FootInfoItemStar from "@/components/@common/FootInfo/FootInfoItemStar";
import { Review } from "@/components/Record/Review";
import { backgroundTheme } from "@/constants/ColorScheme";
import PathIcon from "@/assets/Navbar/PathIcon.svg?react";
import HeartIcon from "@/assets/@common/HeartIcon.svg?react";
import GrayBar from "@/components/@common/GrayBar";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchTrailDetail } from "@/services/TrailService";
import { postStartWalk } from "@/services/StartWalkService";
import { postEndWalk } from "@/services/StartWalkService";
import { useWalkStore } from "@/store/useWalkStore";
import { useTokenStore } from "@/store/useTokenStore";
import { useUserStore } from "@/store/useUserStore";

const first = "편의시설";
const second = "안전시설";
export default function TrailDetailPage() {
  const navigate = useNavigate();
  const {
    totalTime,
    totalDistance,
    totalKal,
    locationList,
    setTotalDistance,
    resetTime,
    setTotalTime,
    setTotalKal,
    resetLocationList,
  } = useWalkStore();

  const { location } = useUserStore();

  const [copyMap, setCopyMap] = useState<any>(null);
  const [select, setSelect] = useState(first);
  const { id } = useParams();
  const { token } = useTokenStore();

  const StartWalk = async () => {
    const response = await postStartWalk(location[0], location[1], token);
    return response;
  };

  const handliClickSelect = (value: string) => {
    setSelect(value);
  };
  const handleCopyMap = (value: any) => {
    setCopyMap(value);
  };

  const { data: trailInfo, isLoading } = useQuery({
    queryKey: ["trail", id],
    queryFn: () => fetchTrailDetail(id),
  });

  const StartWalkmutation = useMutation({
    mutationFn: StartWalk,
    onSuccess: (data) => {
      // id 추가
      localStorage.setItem("walkId", data.data.id);
      navigate("/startrun");
    },
  });

  const EndWalkmutation = useMutation({
    mutationFn: postEndWalk,
    onSuccess: () => {
      setTotalDistance(0),
        resetTime(),
        setTotalTime("00:00:00"),
        setTotalKal(0),
        resetLocationList(),
        localStorage.removeItem("walkId");
      StartWalkmutation.mutate();
    },
  });

  // 폴리라인 그리는 것
  useEffect(() => {
    if (
      copyMap &&
      trailInfo?.data.coordinateList.length > 0 &&
      window.kakao.maps
    ) {
      const locationList = trailInfo?.data.coordinateList.map(
        //위도 경도 바꿔야함
        (item: any) => new window.kakao.maps.LatLng(item.la, item.lo)
      );
      const polyline = new window.kakao.maps.Polyline({
        path: locationList,
        strokeWeight: 7.5,
        strokeColor: "#4394EE",
        strokeOpacity: 0.3,
        strokeStyle: "solid",
      });
      polyline.setMap(copyMap);
    }
  }, [copyMap, trailInfo?.data.coordinateList]);

  if (isLoading) {
    return <div>loding...</div>;
  }

  console.log(trailInfo);

  const handleClickStartrun = () => {
    const walkIdValue = localStorage.getItem("walkId");
    if (walkIdValue) {
      // 이전 산책이 있을 경우
      if (
        confirm(
          "진행 중인 산책이 있어요! 재시작할까요? 취소시, 이전 산책을 저장하고 새로운 산책을 시작합니다."
        )
      ) {
        navigate("startrun");
      } else {
        // 이전 산책 저장하고, 새로운 산책 시작
        localStorage.setItem(
          "course",
          JSON.stringify(trailInfo?.data.coordinateList)
        );
        EndWalkmutation.mutate({
          runtime: totalTime,
          distance: totalDistance,
          calorie: Math.floor(+totalKal),
          spotLists: locationList,
          id: +walkIdValue,
          token: token,
        });
      }
    } else {
      if (confirm("현재 산책로 코스로 산책을 시작할까요?")) {
        localStorage.setItem(
          "course",
          JSON.stringify(trailInfo?.data.coordinateList)
        );
        StartWalkmutation.mutate();
      }
    }
  };

  return (
    <div css={PageCss}>
      <DetailHeader
        title={`${trailInfo?.data.nickName}님의 발자국`}
        backURL="/"
      />
      <MapBox
        width="100%"
        height="40%"
        // 나중에 순서 바꿔줘야함
        lat={trailInfo?.data.centralCoordinatesLa}
        lng={trailInfo?.data.centralCoordinatesLo}
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
            <div key={Facility.name} css={[FacilityIconCss]}>
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
            <div key={Facility.name} css={[FacilityIconCss]}>
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
        <FootInfoItem title="시간" value={trailInfo?.data.runtime} />
        <FootInfoItem title="거리(km)" value={trailInfo?.data.distance} />
        <FootInfoItem
          title={`${trailInfo?.data.siDo} ${trailInfo?.data.siGunDo}`}
          value={trailInfo?.data.eupMyeonDong}
        />
        <FootInfoItemStar value={trailInfo?.data.starRanking} />
      </FootInfoWrapper>
      <GrayBar />
      <div css={reviews.box}>
        <Review title={"메모"} content={<div css={reviews.memo}>'gege</div>} />
      </div>
      <div css={[navCss]}>
        <div css={[likedCss]}>
          <HeartIcon css={trailInfo?.data.like ? [heart, heartClick] : heart} />
          {trailInfo?.data.likedNum}
        </div>
        <div
          onClick={handleClickStartrun}
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

const heart = css({
  width: "3.5vw",
  "@media(min-width: 430px)": {
    width: "15px",
  },
});

const heartClick = css({
  path: {
    fill: "var(--white)",
  },
});
