
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
  level?: number;
  handleCopyMap: (value: kakao.maps.Map) => void;
}
