import { useEffect, useRef, useState } from "react";
import Map from "@/components/@common/Map";
import { CircularProgress } from "@mui/material";
import { css } from "@emotion/react";
import StopWatch from "@/components/Startrun/StopWatch";
import FootInfoItem from "@/components/@common/FootInfo/FootInfoItem";
import FootInfoWrapper from "@/components/@common/FootInfo/FootInfoWrapper";
import { formatTime, caloriesPerSecond } from "@/utils/Startrun";

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

export default function StartrunPage() {
  // 시간 상태를 관리합니다. 초기값은 0입니다.
  const [time, setTime] = useState(0);
  // 스톱워치가 실행 중인지 여부를 관리합니다.
  const [isWalking, setIsWalking] = useState(true);
  const [totalDistance, setTotalDistance] = useState(0);
  const polylineRef = useRef<kakao.maps.Polyline | null>(null); // polyline 객체를 저장할 ref
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
  // 칼로리 계산
  const calorie = caloriesPerSecond(60, 3, time);

  const handleCopyMap = (value: kakao.maps.Map) => {
    setCopyMap(value);
  };

  const handleClickWalking = () => {
    setIsWalking((pre) => !pre);
  };

  // 위치를 실시간으로 받아오고 로케이션으로 넣어줌
  useEffect(() => {
    let watchId: number | null = null;

    const startLocationTracking = () => {
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
    };

    // `isWalking` 상태가 true일 때만 위치 추적을 시작합니다.
    if (isWalking) {
      startLocationTracking();
    }

    // 클린업 함수에서는 위치 추적을 중단합니다.
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [isWalking]); // `isWalking` 상태가 변경될 때마다 이 useEffect를 다시 실행합니다.

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
  // 마커
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
  // 스톱 워치
  useEffect(() => {
    let interval: any;

    if (isWalking) {
      // 스톱워치가 실행 중일 때 1초마다 time 상태를 업데이트합니다.
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    // 컴포넌트가 언마운트되거나 isRunning 상태가 변경될 때 인터벌을 정리합니다.
    return () => clearInterval(interval);
  }, [isWalking]);
  // 거리 계산
  useEffect(() => {
    if (polylineRef.current) {
      // 폴리라인의 총 길이(거리)를 계산하여 상태를 업데이트합니다.
      const distanceM = polylineRef.current.getLength();
      const distanceKM = distanceM / 1000
      setTotalDistance(distanceKM);
    }
  }, [locationList]); // locationList가 변경될 때마다 이 useEffect를 실행합니다.

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
        <div css={{ fontSize: "42px", fontFamily: "exBold" }}>
          {formatTime(time)}
        </div>
        <div css={{ color: "var(--gray-200)" }}>산책 시간</div>
      </div>
      <FootInfoWrapper wrapperCss={InfoWrapperCss}>
        <FootInfoItem title="지역" value="대봉동" />
        <FootInfoItem title="거리(km)" value={totalDistance.toFixed(2)} />
        <FootInfoItem title="kcal" value={calorie} />
      </FootInfoWrapper>
      <StopWatch handleClickWalking={handleClickWalking} />
    </div>
  );
}
