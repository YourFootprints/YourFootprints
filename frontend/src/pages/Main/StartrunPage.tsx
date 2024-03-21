import { useEffect, useRef, useState } from "react";
import Mab from "@/components/@common/Map";
import { CircularProgress } from "@mui/material";

export default function StartrunPage() {
  const polylineRef = useRef(null); // polyline 객체를 저장할 ref
  const [location, setLocation] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    isLoading: true,
  });
  const [locationList, setLocationList] = useState<any>([]);
  const [test, setTest] = useState(null);

  const onTest = (value: any) => {
    setTest(value);
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      // Geolocation API를 사용할 수 있는 경우
      navigator.geolocation.watchPosition(
        (position) => {
          // 위치 정보를 가져오는데 성공한 경우
          // position 객체에서 좌표 정보를 가지고 옵니다
          const lat = position.coords.latitude; // 위도
          const lng = position.coords.longitude; // 경도
          setLocation((pre) => ({
            ...pre,
            center: {
              lat: lat,
              lng: lng,
            },
            isLoading: false,
          }));
          setLocationList((pre: any) => {
            return [...pre, new kakao.maps.LatLng(lat, lng)];
          });
          console.log(locationList);
        },
        (error) => {
          // 위치 정보를 가져오는데 실패한 경우`
          console.log(error);
        },
        {
          // 옵션: 높은 정확도의 위치 정보를 요청할 수 있음
          enableHighAccuracy: true,
          // 옵션: 위치 정보가 캐시되는 최대 시간
          maximumAge: 1000,
          // 옵션: 위치 정보 요청의 최대 대기 시간
          timeout: 2000,
        }
      );
    } else {
      /* geolocation IS NOT available */
      console.log("Geolocation is not available.");
    }
  }, []);

  // // 라인을 그리는 함수
  // const makeLine = useCallback(
  //   (position: any) => {
  //     const linePath = position;

  //     const polyline = new window.kakao.maps.Polyline({
  //       path: linePath,
  //       strokeWeight: 5,
  //       strokeColor: "#FFAE00",
  //       strokeOpacity: 0.7,
  //       strokeStyle: "solid",
  //     });

  //     // 지도에 선을 표시합니다
  //     polyline.setMap(map);
  //   },
  //   [map]
  // );

  // // 라인을 그리기 위한 좌표 배열을 만들어주는 함수
  // const setLinePathArr = (position: GeolocationPosition) => {
  //   const moveLatLon = new window.kakao.maps.LatLng(
  //     position.coords.latitude,
  //     position.coords.longitude
  //   );
  //   console.log(moveLatLon, "move");
  //   const newPosition = positionArr.concat(moveLatLon); // positionArr는 kakao.maps.LatLng 객체의 배열이어야 합니다.
  //   console.log(newPosition);
  //   setPositionArr(newPosition);

  //   // 라인을 그리는 함수 호출
  //   makeLine(newPosition); // 수정된 호출 방식
  // };

  // useEffect(() => {
  //   // map이 변경될 시 확인하고 map이 존재하면 5초마다 현재 위치를 가져오는 함수를 실행
  //   if (map) {
  //     const interval = setInterval(() => {
  //       navigator.geolocation.getCurrentPosition(setLinePathArr);
  //       console.log("실행중");
  //     }, 5000);

  //     return () => {
  //       clearInterval(interval);
  //     };
  //   }
  // }, [map]);

  // 마커가 표시될 위치입니다
  const markerPosition = new kakao.maps.LatLng(
    location.center.lat,
    location.center.lng
  );

  // 마커를 생성합니다
  const marker = new kakao.maps.Marker({
    position: markerPosition,
  });

  // 마커가 지도 위에 표시되도록 설정합니다
  marker.setMap(test);

  // const polyline = new kakao.maps.Polyline({
  //   path: locationList, // 선을 구성하는 좌표배열 입니다
  //   strokeWeight: 5, // 선의 두께 입니다
  //   strokeColor: "#FFAE00", // 선의 색깔입니다
  //   strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
  //   strokeStyle: "solid", // 선의 스타일입니다
  // });

  // polyline.setMap(test);

  useEffect(() => {
    // 지도 객체 (test)와 locationList가 업데이트될 때 실행됩니다.
    if (test && locationList.length > 0 && window.kakao.maps) {
      if (!polylineRef.current) {
        // polyline 객체가 아직 없으면 새로 생성합니다.
        const polyline = new window.kakao.maps.Polyline({
          path: locationList, // 선을 구성하는 좌표 배열
          strokeWeight: 5,
          strokeColor: "#FFAE00",
          strokeOpacity: 0.7,
          strokeStyle: "solid",
        });
        polyline.setMap(test); // 지도에 선을 표시합니다
        polylineRef.current = polyline; // 생성된 polyline 객체를 저장합니다.
      } else {
        // 이미 polyline 객체가 있으면 경로만 업데이트합니다.
        polylineRef.current.setPath(locationList);
      }
    }
  }, [locationList, test]); // 의존성 배열에 locationList와 test를 추가합니다.

  return (
    <>
      {location.isLoading ? (
        <div
          css={{
            width: "100%",
            height: "432px",
          }}
        >
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
