import { useEffect, useRef, useState } from "react";
import Map from "@/components/@common/Map";
import { CircularProgress } from "@mui/material";
import { css } from "@emotion/react";

const loadingCss = css({
  width: "100%",
  height: "432px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
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
  const [test, setTest] = useState<kakao.maps.Map | null>(null);

  const onTest = (value: kakao.maps.Map) => {
    setTest(value);
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
    if (test && locationList.length > 0 && window.kakao.maps) {
      if (!polylineRef.current) {
        const polyline = new window.kakao.maps.Polyline({
          path: locationList,
          strokeWeight: 5,
          strokeColor: "#4ACF9A",
          strokeOpacity: 0.7,
          strokeStyle: "solid",
        });
        polyline.setMap(test);
        polylineRef.current = polyline;
      } else {
        polylineRef.current.setPath(locationList);
      }
    }
  }, [locationList, location.center, test]);

  useEffect(() => {
    const markerPosition = new kakao.maps.LatLng(
      location.center.lat,
      location.center.lng
    );
    if (test && window.kakao.maps) {
      if (markerRef.current) {
        markerRef.current.setPosition(markerPosition);
        setCenter(markerPosition);
      } else {
        const marker = new kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(test);
        markerRef.current = marker;
      }
    }
  }, [location.center, test]);

  return (
    <>
      {location.isLoading ? (
        <div css={loadingCss}>
          <CircularProgress />
        </div>
      ) : (
        <Map
          width="100%"
          height="432px"
          lat={location.center.lat}
          lng={location.center.lng}
          onTest={onTest}
        />
      )}
    </>
  );
}
