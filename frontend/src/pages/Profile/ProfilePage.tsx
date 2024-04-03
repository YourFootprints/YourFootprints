import { css } from "@emotion/react";
import React from "react";
import GearIcon from "@/assets/@common/GearSix.svg?react"; // 뒤로가기
// import { useStore as useTokenStore } from "@/store/token";
import { useUserStore } from "@/store/useUserStore";
import { useNavigate } from "react-router-dom";
import Trail from "@/components/@common/Trail";
import { backgroundTheme, fontTheme, svgTheme } from "@/constants/ColorScheme";

// import axios from "axios";

// 아바타 뒷배경 스타일
const avatarBackgroundStyle = css({
  width: "100%", // 아바타 배경 크기 (아바타보다 약간 크게 설정)
  height: "100%",
  objectFit: "cover",
  backgroundColor: "#ccc",
  position: "absolute", // 절대 위치
  top: "50%", // 상단에서 50% 위치
  left: "50%", // 좌측에서 50% 위치
  transform: "translate(-50%, -50%)", // 정중앙으로 이동
  zIndex: 0, // 아바타보다 뒤에 오도록 z-index 설정
  opacity: 0.5, // 불투명도 설정
  backgroundSize: "cover", // 배경 이미지가 컨테이너를 가득 채우도록
});

// 아바타 스타일
const avatarStyle = css({
  width: "165px", // 아바타 크기
  height: "165px",
  borderRadius: "50%", // 원형 아바타
  backgroundColor: "rgba(255, 255, 255, 0.25)", // 기본 배경색
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden", // 이미지가 원형을 벗어나지 않도록
  margin: "80px auto", // 페이지 중앙에 위치
  border: "1px solid rgba(255, 255, 255, 0.18)", // light gray 테두리 추가
  boxShadow: "1px 1px 15px 5px #8888", // 그림자 추가
  zIndex: "10", // 아바타보다 뒤에 오도록 z-index 설정
});
// 설정 아이콘 스타일
const settingsIconStyle = css(
  {
    position: "absolute", // 부모 컨테이너 대비 절대 위치
    top: "20px", // 상단에서 20px 떨어진 위치
    right: "20px", // 우측에서 20px 떨어진 위치
    cursor: "pointer", // 마우스 오버시 포인터로 변경
    width: "30px", // 아이콘 크기 설정
    height: "30px",
    zIndex: "11",
  },
  svgTheme.stroke
);

// 아바타 내부 이미지 스타일
const innerImageStyle = css({
  width: "90%", // 부모 요소의 100% 크기로 설정
  height: "90%", // 부모 요소의 100% 높이로 설정
  objectFit: "cover", // 이미지가 컨테이너를 가득 채우도록 조정
  borderRadius: "50%", // 이미지를 원형으로 만듦
});

// 닉네임 스타일
const nicknameStyle = css(
  {
    fontWeight: "bold", // 볼드 처리
    fontSize: "28px", // 글자 크기 증가
    position: "absolute", // 절대 위치
    top: "85%", // 상단에서 50% 위치
    left: "50%", // 좌측에서 50% 위치
    transform: "translate(-50%, -50%)", // 정중앙으로 이동
    color: "black", // 글자 색상은 원하는 대로 조정
    zIndex: 10, // 이미지 위에 오도록 z-index 설정
  },
  fontTheme
);

// 프로필 컨테이너 스타일
const profileContainerStyle = css({
  position: "relative", // 내부 절대 위치 아이템을 위한 상대 위치
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const likeContainer = css(
  {
    backgroundColor: "white",
    borderRadius: "20px 20px 0 0", // 위쪽 왼쪽과 위쪽 오른쪽 모서리에만 radius 적용
    marginTop: "-20px", // 이 값을 조정하여 필요한 만큼 상단 div에서 떨어지게 할 수 있습니다.
    position: "sticky", // 이 요소가 새로운 레이어가 되도록 설정
    top: 0,
    zIndex: 2,
  },
  backgroundTheme.basic
);

const trails = css({
  marginBottom: "1rem",
  display: "inline-flex",
  flexDirection: "column",
  gap: "3.5vw",
  "@media(min-width: 430px)": {
    gap: "16px",
  },
});

// 라벨 스타일
const likelist = css(
  {
    height: "40px",
    borderRadius: "20px 20px 0 0", // 위쪽 왼쪽과 위쪽 오른쪽 모서리에만 radius 적용
    paddingTop: "20px",
    fontSize: "20px",
    fontWeight: "bold",
    paddingLeft: "28px",
    marginBottom: "9px",
    alignSelf: "flex-start", // 왼쪽 상단 정렬
    textAlign: "left", // 글자를 왼쪽으로 정렬
    position: "sticky", // sticky 포지셔닝 적용
    top: 0, // 상단에서 0px 위치에 고정
    backgroundColor: "white", // 스크롤되는 내용과 겹칠 때 배경색이 투명해 보이지 않도록 설정
    zIndex: 10, // 다른 콘텐츠 위에 오도록 z-index 설정
  },
  backgroundTheme.basic
);

// 컴포넌트 선언
const ProfilePage: React.FC = () => {
  const { nickname, profileImage, likedTrailDtos } = useUserStore((state) => ({
    setNickname: state.setNickname,
    nickname: state.nickname,
    setProfileImage: state.setProfileImage,
    profileImage: state.profileImage,
    likedTrailDtos: state.likedTrailDtos,
  }));

  // likedTrailDtos의 데이터를 RecordType 인터페이스에 맞게 변환합니다.
  interface likeTrail {
    likedTrailsId: number;
    trailsImgUrl: string;
    likedNum: number;
    distance: number;
    runtime: number;
    address: string;
    liked: boolean;
  }

  const navigate = useNavigate();

  const gosetting = () => {
    navigate("/setting");
    return;
  };

  return (
    <div>
      <div css={profileContainerStyle}>
        {/* 설정 아이콘으로 GearIcon을 사용합니다. */}
        <GearIcon onClick={gosetting} css={settingsIconStyle} />
        <div>
          <img css={avatarBackgroundStyle} src={profileImage} />
        </div>
        {/* 아바타 뒷배경 추가 */}
        <div css={avatarStyle}>
          {/* 아바타 이미지를 여기에 넣어야 합니다. 예를 들어: */}
          <img css={innerImageStyle} src={profileImage} alt="Profile" />
        </div>
        <div css={nicknameStyle}>{nickname}</div>
      </div>
      <div css={likeContainer}>
        <div css={likelist}>찜한 산책로</div>
        <div css={trails}>
          {likedTrailDtos &&
            likedTrailDtos.map((liked: likeTrail) => (
              <Trail
                key={liked.likedTrailsId}
                url={`/trail/${liked.likedTrailsId}`}
                record={{
                  address: liked.address,
                  distance: liked.distance,
                  like: liked.liked,
                  likeNum: liked.likedNum,
                  runtime: liked.runtime,
                  trailsId: liked.likedTrailsId,
                  trailsImg: liked.trailsImgUrl,
                }}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
