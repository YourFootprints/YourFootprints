import { useEffect, useRef, useState } from "react";
import Map from "@/components/@common/Map";
import { CircularProgress } from "@mui/material";
import { css } from "@emotion/react";
import FootInfo from "@/components/@common/FootInfo";
import StopIcon from "@/assets/@common/StopIcon.svg?react";

const loadingCss = css({
  width: "100%",
  height: "432px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const WrapperCss = css({
  width: "100%",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const TimeWrapperCss = css({
  width: "100%",
  height: "15%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "3%",
});

const InfoWrapperCss = css({
  width: "100%",
  height: "50px",
  backgroundColor: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
});

const CircleCss = css({
  width: "130px",
  height: "130px",
  borderRadius: "100%",
  border: "7px solid black",
  backgroundColor: "var(--white)",
  fontSize: "24px",
  fontFamily: "exBold",
  letterSpacing: "7px",
});

const CircleWrapper = css({
  display: "flex",
  justifyContent: "center",
  gap: "2.5rem",
  textAlign: "center",
  marginTop: "5%",
});

export default function StartrunPage() {
  const polylineRef = useRef(null); // polyline 객체를 저장할 ref
  const markerRef = useRef<kakao.maps.Marker | null>(null);
  const [location, setLocation] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    isLoading: true,
  });
  const [locationList, setLocationList] = useState<kakao.maps.LatLng[]>([]);
  const [copyMap, setCopyMap] = useState<kakao.maps.Map | null>(null);

  const handleCopyMap = (value: kakao.maps.Map) => {
    setCopyMap(value);
  };

  // 위치를 실시간으로 받아오고 로케이션으로 넣어줌
  useEffect(() => {
    let watchId: number | null = null;
    if ("geolocation" in navigator) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setLocation((pre) => ({
            ...pre,
            center: { lat, lng },
            isLoading: false,
          }));
          setLocationList((pre) => [...pre, new kakao.maps.LatLng(lat, lng)]);
        },
        (error) => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 1000,
          timeout: 2000,
        }
      );
    } else {
      console.log("Geolocation is not available.");
    }

    // 클린업 함수
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  // 폴리라인 그리는 것
  useEffect(() => {
    if (copyMap && locationList.length > 0 && window.kakao.maps) {
      if (!polylineRef.current) {
        const polyline = new window.kakao.maps.Polyline({
          path: locationList,
          strokeWeight: 7.5,
          strokeColor: "#4ACF9A",
          strokeOpacity: 0.7,
          strokeStyle: "solid",
        });
        polyline.setMap(copyMap);
        polylineRef.current = polyline;
      } else {
        (polylineRef.current as kakao.maps.Polyline).setPath(locationList);
      }
    }
  }, [locationList, location.center, copyMap]);

  useEffect(() => {
    const markerPosition = new kakao.maps.LatLng(
      location.center.lat,
      location.center.lng
    );
    if (copyMap && window.kakao.maps) {
      if (markerRef.current) {
        markerRef.current.setPosition(markerPosition);
        copyMap.setCenter(markerPosition);
      } else {
        const marker = new kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(copyMap);
        markerRef.current = marker;
      }
    }
  }, [location.center, copyMap]);

  return (
    <div css={WrapperCss}>
      {location.isLoading ? (
        <div css={loadingCss}>
          <CircularProgress />
        </div>
      ) : (
        <Map
          width="100%"
          height="50%"
          lat={location.center.lat}
          lng={location.center.lng}
          handleCopyMap={handleCopyMap}
        />
      )}
      <div css={TimeWrapperCss}>
        <div css={{ fontSize: "42px", fontFamily: "exBold" }}>1:35:17</div>
        <div css={{ color: "var(--gray-200)" }}>산책 시간</div>
      </div>
      <FootInfo
        first="거리(km)"
        second="칼로리"
        third="지역"
        isStar={false}
        wrapperCss={InfoWrapperCss}
      />
      <div css={CircleWrapper}>
        <button css={[CircleCss, { borderColor: "var(--main-color)" }]}>
          <StopIcon />
        </button>
        <button css={[CircleCss, { borderColor: "var(--error-color)" }]}>
          STOP
        </button>
      </div>
    </div>
  );
}
