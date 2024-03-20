import { css } from "@emotion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const mapcss = css({
  width: "100%",
  height: "432px",
  border: "1px solid red",
});

export default function StartrunPage() {
  const kakaomap = useRef<HTMLDivElement>(null);
  const [lat, setLat] = useState<number[]>([]);
  const [map, setMap] = useState(null);
  const [positionArr, setPositionArr] = useState([]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      // Geolocation API를 사용할 수 있는 경우
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // 위치 정보를 가져오는데 성공한 경우
          // position 객체에서 좌표 정보를 가지고 옵니다
          const lats = position.coords.latitude; // 위도
          const lons = position.coords.longitude; // 경도
          console.log(lats, lons);
          setLat([lats, lons]);
        },
        (error) => {
          // 위치 정보를 가져오는데 실패한 경우`
          console.log(error);
        }
      );
    } else {
      /* geolocation IS NOT available */
      console.log("Geolocation is not available.");
    }
  }, []);

  useEffect(() => {
    if (lat.length > 0) {
      const options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new window.kakao.maps.LatLng(lat[0], lat[1]), //지도의 중심좌표.
        level: 3, //지도의 레벨(확대, 축소 정도)
      };
      console.log(lat, "lat");
      const maps = new window.kakao.maps.Map(kakaomap.current, options); //지도 생성 및 객체 리턴
      setMap(maps);
    }
  }, [lat]);

  // 라인을 그리는 함수
  const makeLine = useCallback(
    (position: GeolocationPosition) => {
      const linePath = position;

      const polyline = new window.kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 5,
        strokeColor: "#FFAE00",
        strokeOpacity: 0.7,
        strokeStyle: "solid",
      });

      // 지도에 선을 표시합니다
      polyline.setMap(map);
    },
    [map]
  );

  // 라인을 그리기 위한 좌표 배열을 만들어주는 함수
  const setLinePathArr = (position: GeolocationPosition) => {
    const moveLatLon = new window.kakao.maps.LatLng(
      position.coords.latitude,
      position.coords.longitude
    );
    const newPosition = positionArr.concat(moveLatLon); // positionArr는 kakao.maps.LatLng 객체의 배열이어야 합니다.
    setPositionArr(newPosition);

    // 라인을 그리는 함수 호출
    makeLine(newPosition); // 수정된 호출 방식
  };

  useEffect(() => {
    // map이 변경될 시 확인하고 map이 존재하면 5초마다 현재 위치를 가져오는 함수를 실행
    if (map) {
      const interval = setInterval(() => {
        navigator.geolocation.getCurrentPosition(setLinePathArr);
        console.log("실행중");
      }, 5000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [map]);

  return <div ref={kakaomap} id="map" css={mapcss}></div>;
}
