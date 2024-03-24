// FindArea.tsx
import { useState } from "react";
import { useStore } from "@/store/store";

// 카카오 API 키를 상수로 정의합니다. 이 키는 카카오 개발자 사이트에서 발급받은 것을 사용해야 합니다.
const KAKAO_API_KEY = "f8374c041c61f91ded91087620306233"; // 올바른 API 키 사용

// 위도와 경도를 인자로 받아 카카오 API를 호출하고, 행정구역 정보를 문자열로 반환하는 비동기 함수입니다.
const fetchKakaoAPI = async (
  latitude: number,
  longitude: number
): Promise<string> => {
  // API 요청을 위한 URL을 구성합니다. 경도(x)와 위도(y)를 쿼리 파라미터로 포함합니다.
  const url = `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`;
  // fetch 함수를 사용해 API 요청을 보냅니다. 인증을 위해 'Authorization' 헤더에 API 키를 포함시킵니다.
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `KakaoAK ${KAKAO_API_KEY}`,
    },
  });
  // 응답이 정상적이지 않을 경우, 에러를 발생시킵니다.
  if (!response.ok) {
    throw new Error("카카오 API 호출 실패");
  }
  // 응답 데이터를 JSON 형태로 변환합니다.
  const data = await response.json();
  // 응답 데이터에서 행정구역 정보를 추출하여 문자열로 반환합니다.
  // 해당 정보가 없을 경우 에러를 발생시킵니다.
  if (data.documents && data.documents.length > 0) {
    const regionInfo = data.documents[0];
    return `${regionInfo.region_1depth_name} ${regionInfo.region_2depth_name} ${regionInfo.region_3depth_name}`;
  } else {
    throw new Error("행정구역 정보를 찾을 수 없습니다");
  }
};

// 사용자의 현재 위치를 가져와 카카오 API를 호출하는 커스텀 훅입니다.
export const useFindArea = () => {
  // Zustand를 사용해 전역 상태인 지역명을 업데이트하는 함수를 가져옵니다.
  const setAreaName = useStore((state) => state.setAreaName);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); // 타입 수정

  // 사용자의 현재 위치를 가져오는 함수입니다. 비동기로 처리되며, 성공 시 카카오 API를 호출해 지역명을 업데이트합니다.
  const handleGetCurrentLocation = async () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const areaName = await fetchKakaoAPI(latitude, longitude);
            setAreaName(areaName);
          } catch (err) {
            if (err instanceof Error) {
              // 타입 가드
              setError(err.message); // 'err' 타입을 'unknown'에서 'Error'로 좁힘
            } else {
              setError("알 수 없는 에러 발생");
            }
          }
          setIsLoading(false);
        },
        (error) => {
          setError(error.message); // 타입 단언이 필요없음
          setIsLoading(false);
        }
      );
    } else {
      setError("이 브라우저에서는 위치 서비스를 지원하지 않습니다.");
      setIsLoading(false);
    }
  };

  // 이 훅을 사용하는 컴포넌트에서 현재 위치를 가져오는 함수, 로딩 상태, 에러 상태를 사용할 수 있게
  // 반환합니다. 이를 통해 컴포넌트에서 사용자의 현재 위치를 기반으로 추가적인 작업을 수행할 수 있습니다.
  return { handleGetCurrentLocation, isLoading, error };
};
