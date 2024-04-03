import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import FootInfoWrapper from "@/components/@common/FootInfo/FootInfoWrapper";
import FootInfoItem from "@/components/@common/FootInfo/FootInfoItem";
import ModeToggle from "@/components/Main/ModeToggle";
import RecommendTrail from "@/components/Main/RecommendTrail";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchProfile } from "@/services/UserService";
import { useUserStore } from "@/store/useUserStore";
import { useEffect, useState } from "react";
import { useTokenStore } from "@/store/useTokenStore";
import { useWalkStore } from "@/store/useWalkStore";
import Wheater from "@/components/Main/Wheater";
import { getCurrentLocation } from "@/utils/CurrentLocation";
import { postStartWalk } from "@/services/StartWalkService";
import { postEndWalk } from "@/services/StartWalkService";
import { fetchMainInfo } from "@/services/MainService";
import Loading from "@/components/@common/Loading";

export default function HomePage() {
  const [startX, setStartX] = useState(0); // 터치 시작 X 좌표
  const [moveX, setMoveX] = useState(0); // 터치 이동 중 X 좌표
  const [isSlidingAround, setIsSlidingAround] = useState(false); // 주변 산책로 슬라이드 여부
  const [isSlidingSafe, setIsSlidingSafe] = useState(false); // 안전한 산책로 슬라이드 여부

  const [slideOffsetAround, setSlideOffsetAround] = useState(0); // 주변 산책로 슬라이드 위치
  const [slideOffsetSafe, setSlideOffsetSafe] = useState(0); // 안전한 산책로 슬라이드 위치

  // 주변 산책로 터치 이벤트 핸들러
  const handleTouchStartAround = (event: any) => {
    setStartX(event.touches[0].clientX);
    setIsSlidingAround(true);
  };

  const handleTouchMoveAround = (event: any) => {
    if (isSlidingAround) {
      setMoveX(event.touches[0].clientX);
      const offset = moveX - startX;
      setSlideOffsetAround(offset);
    }
  };

  const handleTouchEndAround = () => {
    setIsSlidingAround(false);
    // 슬라이드 완료 후 위치 조정
    if (slideOffsetAround > -50) {
      setSlideOffsetAround(-100); // 다음 요소로 이동
    }
  };

  // 안전한 산책로 터치 이벤트 핸들러
  const handleTouchStartSafe = (event: any) => {
    setStartX(event.touches[0].clientX);
    setIsSlidingSafe(true);
  };

  const handleTouchMoveSafe = (event: any) => {
    if (isSlidingSafe) {
      setMoveX(event.touches[0].clientX);
      const offset = moveX - startX;
      setSlideOffsetSafe(offset);
    }
  };

  const handleTouchEndSafe = () => {
    setIsSlidingSafe(false);
    // 슬라이드 완료 후 위치 조정
    if (slideOffsetSafe > -50) {
      setSlideOffsetSafe(-100); // 다음 요소로 이동
    }
  };

  const navigate = useNavigate();
  const { token } = useTokenStore();
  const {
    setNickname,
    setAreaName,
    setWalkStartTime,
    setWalkEndTime,
    setProfileImage,
    setlikedTrailDtos,
    location,
    setLocation,
  } = useUserStore();

  const {
    totalTime,
    totalDistance,
    totalKal,
    locationList,
    setTotalDistance,
    resetTime,
    setTotalTime,
    setTotalKal,
    resetLocationList,
  } = useWalkStore();

  const StartWalk = async () => {
    const response = await postStartWalk(location[0], location[1], token);
    return response;
  };

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => fetchProfile(token),
  });

  const { data: mainInfo, isLoading: mainLoading } = useQuery({
    queryKey: ["main"],
    queryFn: fetchMainInfo,
  });

  const StartWalkmutation = useMutation({
    mutationFn: StartWalk,
    onSuccess: (data) => {
      // id 추가
      localStorage.setItem("walkId", data.data.id);
      navigate("startrun");
    },
  });

  const EndWalkmutation = useMutation({
    mutationFn: postEndWalk,
    onSuccess: () => {
      setTotalDistance(0),
        resetTime(),
        setTotalTime("00:00:00"),
        setTotalKal(0),
        resetLocationList(),
        localStorage.removeItem("walkId");
      StartWalkmutation.mutate();
    },
  });

  const handleClickStartrun = () => {
    const walkIdValue = localStorage.getItem("walkId");
    if (walkIdValue) {
      // 이전 산책이 있을 경우
      if (
        confirm(
          "진행 중인 산책이 있어요! 재시작할까요? 취소시, 이전 산책을 저장하고 새로운 산책을 시작합니다."
        )
      ) {
        navigate("startrun");
      } else {
        // 이전 산책 저장하고, 새로운 산책 시작
        EndWalkmutation.mutate({
          runtime: totalTime,
          distance: totalDistance,
          calorie: Math.floor(+totalKal),
          spotLists: locationList,
          id: +walkIdValue,
          token: token,
        });
      }
    } else {
      if (confirm("타이머가 바로 시작됩니다. 산책을 시작할까요?")) {
        StartWalkmutation.mutate();
      }
    }
  };

  useEffect(() => {
    if (profile) {
      setNickname(profile.data.nickName);
      setAreaName(profile.data.address);
      setWalkStartTime(profile.data.requiredTimeStart);
      setWalkEndTime(profile.data.requiredTimeEnd);
      setProfileImage(profile.data.profileImg);
      setlikedTrailDtos(profile.data.likedTrailDtos);
    }
  }, [
    profile,
    setNickname,
    setAreaName,
    setWalkStartTime,
    setWalkEndTime,
    setProfileImage,
    setlikedTrailDtos,
  ]);

  useEffect(() => {
    const fetchLatLon = async () => {
      const position = await getCurrentLocation();
      setLocation([position.coords.latitude, position.coords.longitude]);
    };
    fetchLatLon();
  }, []);

  if (profileLoading || mainLoading) {
    return <Loading />;
  }

  return (
    <div css={[PageCss]}>
      <div
        css={[
          ProfileCss,
          {
            backgroundImage: "url(src/assets/image/sample1.png)",
            backgroundPosition: "center center",
            backgroundSize: "cover",
          },
        ]}
      >
        <div css={ProfileHeaderWrapper}>
          <Wheater lat={location[0]} lon={location[1]} />
          <ModeToggle isWhite={true} />
        </div>
        <div css={ProfileImageWrapper}>
          <div
            css={[
              ImageWrapper,
              {
                backgroundPosition: "center center",
                backgroundSize: "cover",
              },
            ]}
          >
            <img
              css={[
                {
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                },
              ]}
              src={profile.data.profileImg}
              alt=""
            />
          </div>
        </div>
        <FootInfoWrapper wrapperCss={InfoWrapper}>
          <FootInfoItem
            title="월간 누적시간"
            value={mainInfo.data.accumulatedWalkingTime}
          />
          <FootInfoItem
            title="누적 거리(km)"
            value={mainInfo.data.accumulatedDistance.toFixed(2)}
          />
          <FootInfoItem
            title="누적 발자국"
            value={mainInfo.data.accumulatedFootstep}
          />
        </FootInfoWrapper>
        <div
          css={[
            InfoWrapper,
            {
              height: "10%",
              margin: "5%",
              fontSize: "1.5rem",
              display: "flex",
              justifyItems: "center",
              alignItems: "center",
              borderRadius: "25px",
            },
          ]}
        >
          <div
            onClick={handleClickStartrun}
            css={{ width: "100%", fontFamily: "bold" }}
          >
            산책 시작
          </div>
        </div>
      </div>
      <div
        css={RecommandTextWrapperCss}
        onTouchStart={handleTouchStartAround}
        onTouchMove={handleTouchMoveAround}
        onTouchEnd={handleTouchEndAround}
      >
        <div
          css={[
            {
              width: "90%",
              textAlign: "start",
              fontSize: "1.25rem",
              fontFamily: "exbold",
              color: "var(--gray-200)",
            },
          ]}
        >
          당신을 위한 산책로 추천!
        </div>
        <div
          id="recommand"
          css={[
            RecommandCss,
            { transform: `translateX(${slideOffsetAround}px)` },
          ]}
        >
          {mainInfo.data.aroundTrailsRecommend.map((item: any) => (
            <RecommendTrail
              key={item.trailsId}
              url={`/trail/${item.trailsId}`}
              record={item}
            />
          ))}
        </div>
      </div>
      {mainInfo.data.safeTrailsRecommend.length > 0 && (
        <div
          css={RecommandTextWrapperCss}
          onTouchStart={handleTouchStartSafe}
          onTouchMove={handleTouchMoveSafe}
          onTouchEnd={handleTouchEndSafe}
        >
          <div
            css={[
              {
                width: "90%",
                textAlign: "start",
                fontSize: "1.25rem",
                fontFamily: "exbold",
                color: "var(--gray-200)",
              },
            ]}
          >
            어두운 밤길, 야간 산책로 추천!
          </div>
          <div
            id="recommand"
            css={[
              RecommandCss,
              { transform: `translateX(${slideOffsetSafe}px)` },
            ]}
          >
            {mainInfo.data.safeTrailsRecommend.map((item: any) => (
              <RecommendTrail
                key={item.trailsId}
                url={`/trail/${item.trailsId}`}
                record={item}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const PageCss = css({
  width: "100%",
  overflowX: "hidden",
});

const ProfileCss = css({
  width: "100%",
  minHeight: "450px",
  height: "70%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const ProfileHeaderWrapper = css({
  width: "90%",
  height: "15%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "5%",
});

const ProfileImageWrapper = css({
  height: "200px",
  width: "200px",
  borderRadius: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(255, 255, 255, 0.55)",
  boxShadow: "1px 1px 15px 5px #8888",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.18)",
});

const ImageWrapper = css({
  height: "90%",
  width: "90%",
  borderRadius: "100%",
});

const InfoWrapper = css({
  width: "85%",
  height: "30%",
  minHeight: "70px",
  marginTop: "7%",
  background: "rgba(255, 255, 255, 0.25)",
  backdropFilter: "blur(5px)",
  WebkitBackdropFilter: "blur(5px)",
  borderRadius: "10px",
  boxShadow: "1px 1px 15px 1px rgba(255, 255, 255, 0.8) inset",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
});

const RecommandCss = css({
  overflowX: "scroll",
  // overflow: "hidden",
  // touchAction: "pan-x",
  display: "flex",
  gap: "1rem",
  width: "90%",
  height: "180px",
  alignItems: "center",
  justifyContent: "start",
});

const RecommandTextWrapperCss = css({
  width: "200vw", // 화면 너비의 90%
  flexDirection: "column",
  margin: "20px",
  alignItems: "center",
});
