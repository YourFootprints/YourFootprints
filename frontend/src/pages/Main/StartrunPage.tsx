import { useEffect, useRef, useState } from "react";
import Mab from "@/components/@common/Map";
import { CircularProgress } from "@mui/material";
import { css } from "@emotion/react";

const loadingCss = css({
  width: "100%",
  height: "432px",
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
});

export default function StartrunPage() {
  const polylineRef = useRef<kakao.maps.Polyline | null>(null); // polyline 객체를 저장할 ref
  const [location, setLocation] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    isLoading: true,
  });
  const [locationList, setLocationList] = useState<kakao.maps.LatLng[]>([]);
  const [test, setTest] = useState(null);

  const onTest = (value: any) => {
    setTest(value);
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      // let watchId = null
      // watchId = navigator.geolocation.watchPosition
      navigator.geolocation.watchPosition(
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
    // return () => {
    //   if (watchId !== null) {
    //     navigator.geolocation.clearWatch(watchId);
    //   }
    // };
  }, []);

  useEffect(() => {
    if (test && locationList.length > 0 && window.kakao.maps) {
      if (!polylineRef.current) {
        const polyline = new window.kakao.maps.Polyline({
          path: locationList,
          strokeWeight: 5,
          strokeColor: "#FFAE00",
          strokeOpacity: 0.7,
          strokeStyle: "solid",
        });
        polyline.setMap(test);
        polylineRef.current = polyline;
      } else {
        polylineRef.current.setPath(locationList);
      }
    }
  }, [locationList, location.center]);

  return (
    <>
      {location.isLoading ? (
        <div css={loadingCss}>
          <CircularProgress />
        </div>
      ) : (
        <Mab
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
