import { useState } from "react";
import axios from "axios";
import { useUserStore } from "@/store/useUserStore";
import { useTokenStore } from "@/store/useTokenStore";

export const useFindArea = () => {
  const setAreaName = useUserStore((state: any) => state.setAreaName);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const token = useTokenStore((state: any) => state.token);

  const handleGetCurrentLocation = async () => {
    const config = {
      headers: {
        Authorization: token,
      },
    };
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // 사용자가 제공한 좌표를 서버로 전송하여 행정구역 정보를 가져옵니다.
            const response = await axios.post(
              `${import.meta.env.VITE_API_BASE_URL}/api/find-dong/coordinate`,
              {
                x: latitude,
                y: longitude,
              },
              config
            );
            // 서버로부터 받은 행정구역 정보를 지역명으로 설정합니다.
            setAreaName(response.data.data);
            setIsLoading(false);
          } catch (error) {
            setError("행정구역 정보를 가져오지 못했습니다.");
            setIsLoading(false);
          }
        },
        (error) => {
          setError(error.message);
          setIsLoading(false);
        }
      );
    } else {
      setError("이 브라우저에서는 위치 서비스를 지원하지 않습니다.");
      setIsLoading(false);
    }
  };

  return { handleGetCurrentLocation, isLoading, error };
};
