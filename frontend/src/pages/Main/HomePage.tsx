import Trail from "@/components/@common/Trail";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import testImg from "@/assets/image/testmap.png";
import FootInfoWrapper from "@/components/@common/FootInfo/FootInfoWrapper";
import FootInfoItem from "@/components/@common/FootInfo/FootInfoItem";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/services/UserService";
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";

const PageCss = css({
  width: "100%",
  height: "100vh",
});

const ProfileCss = css({
  width: "100%",
  height: "60%",
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
  height: "15%",
  marginTop: "8%",
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

const loadingCss = css({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const RecommandCss = css({
  overflowX: "scroll",
  overflow: "hidden",
  display: "flex",
  gap: "2px",
});

export default function HomePage() {
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProducts,
  });
  const navigate = useNavigate();
  const handleClickStartrun = () => {
    if (confirm("타이머가 바로 시작됩니다. 산책을 시작할까요?")) {
      navigate("startrun");
    }
  };

  const {
    setNickname,
    setAreaName,
    setWalkStartTime,
    setWalkEndTime,
    setProfileImage,
    setlikedTrailDtos,
  } = useUserStore();

  useEffect(() => {
    if (profile) {
      setNickname(profile.nickName);
      setAreaName(profile.address);
      setWalkStartTime(profile.requiredTimeStart);
      setWalkEndTime(profile.requiredTimeEnd);
      setProfileImage(profile.profileImg);
      setlikedTrailDtos(profile.likedTrailDtos);
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

  if (isLoading) {
    return (
      <div css={[PageCss]}>
        <div css={loadingCss}>
          <CircularProgress />
        </div>
      </div>
    );
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
          <div>14˚</div>
          <div>토글</div>
        </div>
        <div css={ProfileImageWrapper}>
          <div
            css={[
              ImageWrapper,
              {
                backgroundImage: "url(src/assets/image/profile.jpg)",
                backgroundPosition: "center center",
                backgroundSize: "cover",
              },
            ]}
          >
            <img src="" alt="" />
          </div>
        </div>
        <FootInfoWrapper wrapperCss={InfoWrapper}>
          <FootInfoItem title="시간" value="00:00:01" />
          <FootInfoItem title="거리(km)" value="4.2" />
          <FootInfoItem title="kcal" value="254" />
        </FootInfoWrapper>
        <div
          css={[
            InfoWrapper,
            {
              height: "13%",
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
      <div>추천은 수정예정</div>
      <div id="recommand" css={RecommandCss}>
        <div css={{ transform: "scale(0.7)", minWidth: "400px" }}>
          <Trail url="startrun" imgSrc={testImg} />
        </div>
        <div css={{ transform: "scale(0.7)" }}>
          <Trail url="startrun" imgSrc={testImg} />
        </div>
      </div>
    </div>
  );
}
