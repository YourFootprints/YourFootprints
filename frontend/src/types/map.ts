import "react-kakao-maps-sdk";

declare global {
  interface Window {
    kakao: any;
  }
}

export {};

export interface MapboxProps {
  width: string;
  height: string;
  lat: number;
  lng: number;
  onTest: (value: kakao.maps.Map) => void;
}
