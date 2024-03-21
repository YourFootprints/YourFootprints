import { useEffect, useRef } from "react";
import { css } from "@emotion/react";
import { MapboxProps } from "@/types/map";

export default function Map({ width, height, lat, lng, onTest }: MapboxProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(lat, lng), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };
    const map = new window.kakao.maps.Map(mapContainer.current, options); //지도 생성 및 객체 리턴
    onTest(map);
    // // 마커가 표시될 위치입니다
    // const markerPosition = new kakao.maps.LatLng(lat, lng);

    // // 마커를 생성합니다
    // const marker = new kakao.maps.Marker({
    //   position: markerPosition,
    // });

    // // 마커가 지도 위에 표시되도록 설정합니다
    // marker.setMap(map);
  }, []);

  return (
    <div
      ref={mapContainer}
      id="map"
      css={css({
        width: width,
        height: height,
      })}
    />
  );
}
