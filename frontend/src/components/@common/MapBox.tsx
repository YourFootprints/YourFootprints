import { useEffect, useRef } from "react";
import { css } from "@emotion/react";
import { MapboxProps } from "@/types/global";

export default function Map({ width, height, lat, lng, level, handleCopyMap }: MapboxProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(lat, lng), //지도의 중심좌표.
      level: (level?level:3), //지도의 레벨(확대, 축소 정도)
    };
    const map = new window.kakao.maps.Map(mapContainer.current, options); //지도 생성 및 객체 리턴
    handleCopyMap(map);
  }, []);

  return (
    <div
      ref={mapContainer}
      id="map"
      css={css({
        width: width,
        height: height,
        maxHeight: "432px",
      })}
    />
  );
}
