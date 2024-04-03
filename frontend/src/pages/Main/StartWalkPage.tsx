import { useEffect, useRef, useState } from "react";
import MapBox from "@/components/@common/MapBox";
import { CircularProgress } from "@mui/material";
import { css } from "@emotion/react";
import StopWatch from "@/components/Startrun/StopWatch";
import FootInfoItem from "@/components/@common/FootInfo/FootInfoItem";
import FootInfoWrapper from "@/components/@common/FootInfo/FootInfoWrapper";
import Marker from "@/components/Ranking/Marker";
import { formatTime, caloriesPerSecond } from "@/utils/Startrun";
import { useWalkStore } from "@/store/useWalkStore";
import { useTokenStore } from "@/store/useTokenStore";
import { postEndWalk, putPicture } from "@/services/StartWalkService";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";
import Modal from "@/components/Main/Modal";

const maxSize = 10 * 1024 * 1024; // 최대 10MB

export default function StartrunPage() {
  const navigate = useNavigate();
  const [isWalking, setIsWalking] = useState(true);
  const polylineRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const [pictureURL, setPictureURL] = useState<any>(null);
  const [realFile, setRealFile] = useState<any>(null);

  const { profileImage, location: area, areaName } = useUserStore();

  const dong = areaName.split(" ");

  const {
    setLocationList: setAreaList,
    locationList: areaList,
    resetLocationList,
    setTotalDistance,
    totalDistance,
    setTotalKal,
    totalKal,
    setTotalTime,
    totalTime,
    time,
    setTime,
    resetTime,
  } = useWalkStore();

  const { token } = useTokenStore();

  const [location, setLocation] = useState({
    center: {
      lat: area[0],
      lng: area[1],
    },
    isLoading: true,
  });
  const [locationList, setLocationList] = useState<any>([]);
  const [copyMap, setCopyMap] = useState<any>(null);
  const [isPicture, setIsPicture] = useState(false);

  const EndWalkmutation = useMutation({
    mutationFn: postEndWalk,
    onSuccess: () => {
      setTotalDistance(0),
        resetTime(),
        setTotalTime("00:00:00"),
        setTotalKal(0),
        resetLocationList(),
        localStorage.removeItem("course");
      localStorage.removeItem("walkId");
      alert("산책이 저장되었습니다!");
      navigate("/");
    },
  });

  // const { mutate: fileMutate } = useMutation({
  //   mutationFn: putPicture,
  // });

  const handleCopyMap = (value: any) => {
    setCopyMap(value);
  };

  const handleClickWalking = () => {
    setIsWalking((pre) => !pre);
  };

  const confirmStopWalk = () => {
    const walkIdValue = localStorage.getItem("walkId");
    if (walkIdValue) {
      if (confirm("산책을 종료할까요?")) {
        setIsPicture(true);
        setIsWalking(false);
      }
    } else {
      alert("오류가 발생했습니다. 다시 시작하기를 눌러주세요!");
      navigate("/");
    }
  };

  const stopWalk = () => {
    const walkIdValue = localStorage.getItem("walkId");
    const formData = new FormData();
    if (realFile) {
      formData.append("trailsImg", realFile);
    }

    if (walkIdValue) {
      EndWalkmutation.mutate({
        runtime: totalTime,
        distance: totalDistance,
        calorie: Math.floor(+totalKal),
        spotLists: areaList,
        id: +walkIdValue,
        token: token,
      });
      putPicture(token, +walkIdValue, realFile);
    } else {
      alert("오류가 발생했습니다. 다시 시작하기를 눌러주세요!");
      navigate("/");
    }
  };

  const handlePictureChange = (event: any) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.size > maxSize) {
        alert("이미지 크기는 10MB를 초과할 수 없습니다.");
        event.target.value = null; // 파일 선택 창 비우기
      } else {
        setRealFile(file);
        setPictureURL(URL.createObjectURL(file));
      }
    }
  };

  useEffect(() => {
    console.log(realFile);
    console.log(pictureURL);
  }, [pictureURL, realFile]);

  useEffect(() => {
    const walkIdValue = localStorage.getItem("walkId");
    if (!walkIdValue) {
      alert("실행 중 오류가 발생했습니다. 다시 시도해주세요!");
      navigate("/");
    }
  }, []);

  // 만약 진행중인 산책이 있을 경우 이전 산책 폴리라인 불러오기
  useEffect(() => {
    if (areaList.length > 0) {
      const preList = areaList.map(
        (item: any) => new window.kakao.maps.LatLng(item.la, item.lo)
      );
      setLocationList((pre: any) => [...pre, ...preList]);
    }
  }, []);

  // 만약 산책 코스로 걷기이면 로컬스토리지에 저장 된 폴리라인 불러오기
  useEffect(() => {
    const courseString = localStorage.getItem("course");
    if (courseString) {
      const course = JSON.parse(courseString);
      const courseList = course.map(
        (item: any) => new window.kakao.maps.LatLng(item.la, item.lo)
      );
      const polyline = new window.kakao.maps.Polyline({
        path: courseList,
        strokeWeight: 7.5,
        strokeColor: "#4394EE",
        strokeOpacity: 0.5,
        strokeStyle: "solid",
      });
      polyline.setMap(copyMap);
    }
  }, [copyMap]);

  // 위치를 실시간으로 받아오고 로케이션으로 넣어줌
  useEffect(() => {
    let watchId: number | null = null;
    const startLocationTracking = () => {
      if ("geolocation" in navigator) {
        watchId = navigator.geolocation.watchPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            console.log(new window.kakao.maps.LatLng(lat, lng));
            setLocation((pre) => ({
              ...pre,
              center: { lat, lng },
              isLoading: false,
            }));
            setLocationList((pre: any) => [
              ...pre,
              new window.kakao.maps.LatLng(lat, lng),
            ]);
            setAreaList({ la: lat, lo: lng });
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
    };

    // `isWalking` 상태가 true일 때만 위치 추적을 시작합니다.
    if (isWalking) {
      startLocationTracking();
    }

    // 클린업 함수에서는 위치 추적을 중단합니다.
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [isWalking, setLocationList]); // `isWalking` 상태가 변경될 때마다 이 useEffect를 다시 실행합니다.

  // 폴리라인 그리는 것
  useEffect(() => {
    if (copyMap && locationList.length > 0 && window.kakao.maps) {
      if (!polylineRef.current) {
        const polyline = new window.kakao.maps.Polyline({
          path: locationList,
          strokeWeight: 7.5,
          strokeColor: "#4ACF9A",
          strokeOpacity: 0.7,
          strokeStyle: "solid",
        });
        polyline.setMap(copyMap);
        polylineRef.current = polyline;
      } else {
        polylineRef.current.setPath(locationList);
      }
    }
  }, [locationList, location.center, copyMap]);
  // 마커
  useEffect(() => {
    const markerPosition = new window.kakao.maps.LatLng(
      location.center.lat,
      location.center.lng
    );
    if (copyMap && window.kakao.maps) {
      if (markerRef.current) {
        markerRef.current.setPosition(markerPosition);
        copyMap.setCenter(markerPosition);
      } else {
        const marker = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content: Marker(profileImage),
          yAnchor: 1,
        });
        marker.setMap(copyMap);
        markerRef.current = marker;
      }
    }
  }, [location.center, copyMap, profileImage]);
  // 스톱 워치
  useEffect(() => {
    let interval: any;

    if (isWalking) {
      // 스톱워치가 실행 중일 때 1초마다 time 상태를 업데이트합니다.
      interval = setInterval(() => {
        setTime();
      }, 1000);
    }

    // 컴포넌트가 언마운트되거나 isRunning 상태가 변경될 때 인터벌을 정리합니다.
    return () => clearInterval(interval);
  }, [isWalking, setTime]);
  // 거리 계산
  useEffect(() => {
    if (polylineRef.current) {
      // 폴리라인의 총 길이(거리)를 계산하여 상태를 업데이트합니다.
      const distanceM = polylineRef.current.getLength();
      const distanceKM = (distanceM / 1000).toFixed(2);
      setTotalDistance(+distanceKM);
      setTotalKal(Math.floor(caloriesPerSecond(+distanceKM, 60)));
    }
    setTotalTime(formatTime(time));
  }, [locationList, setTotalDistance, setTotalKal, setTotalTime, time]); // locationList가 변경될 때마다 이 useEffect를 실행합니다.

  // 산책 중에 화면이 꺼지지 않도록 하는 기능
  useEffect(() => {
    let wakeLock: any = null;

    async function requestWakeLock() {
      if ("wakeLock" in navigator) {
        try {
          wakeLock = await navigator.wakeLock.request("screen");
          console.log("Screen Wake Lock activated");
        } catch (err) {
          console.error(`에러가 났어용`);
        }
      }
    }

    requestWakeLock();

    return () => {
      if (wakeLock !== null) {
        wakeLock.release().then(() => {
          wakeLock = null;
          console.log("Screen Wake Lock released");
        });
      }
    };
  }, []);

  return (
    <div css={WrapperCss}>
      {location.isLoading ? (
        <div css={loadingCss}>
          <CircularProgress />
        </div>
      ) : (
        <div
          css={css({
            width: "432px",
            height: "50%",
            maxHeight: "432px",
          })}
        >
          <MapBox
            width="100%"
            height="100%"
            lat={location.center.lat}
            lng={location.center.lng}
            handleCopyMap={handleCopyMap}
          />
        </div>
      )}
      <div css={TimeWrapperCss}>
        <div css={{ fontSize: "42px", fontFamily: "exBold" }}>{totalTime}</div>
        <div css={{ color: "var(--gray-200)" }}>산책 시간</div>
      </div>
      <FootInfoWrapper wrapperCss={InfoWrapperCss}>
        <FootInfoItem title="지역" value={dong[2]} />
        <FootInfoItem title="거리(km)" value={totalDistance.toFixed(2)} />
        <FootInfoItem title="kcal" value={+totalKal} />
      </FootInfoWrapper>
      <StopWatch
        isWalking={isWalking}
        handleClickWalking={handleClickWalking}
        stopWalk={confirmStopWalk}
      />
      {isPicture && (
        <Modal>
          <div
            css={[
              {
                width: "90%",
                height: "95%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "15px",
              },
            ]}
          >
            <label
              css={[
                {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                },
              ]}
              htmlFor="picture"
            >
              <div css={[{ color: "var(--gray-200)" }]}>
                사진과 함께 발자국을 남겨보세요!
              </div>
              <div css={[{ fontSize: "18px", fontFamily: "exbold" }]}>
                사진 선택 또는 찍기
              </div>
            </label>
            <input
              css={[{ display: "none" }]}
              type="file"
              id="picture"
              name="picture"
              accept="image/png, image/jpeg"
              onChange={handlePictureChange}
            />
            {pictureURL && (
              <>
                <div css={[{ width: "200px", height: "150px" }]}>
                  <img
                    src={pictureURL}
                    css={[
                      { width: "100%", height: "100%", objectFit: "contain" },
                    ]}
                  />
                </div>
                <div
                  onClick={() => {
                    stopWalk();
                  }}
                  css={[
                    {
                      width: "70%",
                      height: "35px",
                      lineHeight: "35px",
                      backgroundColor: "var(--main-color)",
                      borderRadius: "5px",
                      color: "white",
                    },
                  ]}
                >
                  선택하고 저장하기
                </div>
              </>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}

const loadingCss = css({
  width: "100%",
  height: "432px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const WrapperCss = css({
  width: "100%",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const TimeWrapperCss = css({
  width: "100%",
  height: "15%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "3%",
});

const InfoWrapperCss = css({
  width: "100%",
  height: "50px",
  backgroundColor: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
});
