import { css } from "@emotion/react";
import React from "react";
import GearIcon from "@/assets/image/GearSix.png"; // GearSix 이미지 경로를 임포트합니다.
// import { useStore as useTokenStore } from "@/store/token";
import { useUserStore } from "@/store/useUserStore";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

// 아바타 뒷배경 스타일
const avatarBackgroundStyle = css({
  width: "412px", // 아바타 배경 크기 (아바타보다 약간 크게 설정)
  height: "360px",
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
  backgroundColor: "#ccc", // 기본 배경색
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden", // 이미지가 원형을 벗어나지 않도록
  margin: "80px auto", // 페이지 중앙에 위치
  border: "8px solid lightgray", // light gray 테두리 추가
  boxShadow: "0 8px 8px rgba(0, 0, 0, 0.1)", // 그림자 추가
  zIndex: "10", // 아바타보다 뒤에 오도록 z-index 설정
});
// 설정 아이콘 스타일
const settingsIconStyle = css({
  position: "absolute", // 부모 컨테이너 대비 절대 위치
  top: "20px", // 상단에서 20px 떨어진 위치
  right: "20px", // 우측에서 20px 떨어진 위치
  cursor: "pointer", // 마우스 오버시 포인터로 변경
  width: "30px", // 아이콘 크기 설정
  height: "30px",
  zIndex: "11",
});

// 아바타 내부 이미지 스타일
const innerImageStyle = css({
  width: "100%", // 부모 요소의 100% 크기로 설정
  height: "100%", // 부모 요소의 100% 높이로 설정
  objectFit: "cover", // 이미지가 컨테이너를 가득 채우도록 조정
  borderRadius: "50%", // 이미지를 원형으로 만듦
});

// 프로필 컨테이너 스타일
const profileContainerStyle = css({
  position: "relative", // 내부 절대 위치 아이템을 위한 상대 위치
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

// 컴포넌트 선언
const ProfilePage: React.FC = () => {
  const { nickname, profileImage, } = useUserStore(
    (state) => ({
      setNickname: state.setNickname,
      nickname: state.nickname,
      setProfileImage: state.setProfileImage,
      profileImage: state.profileImage,
    })
  );
  // // useStore1에서 토큰 상태를 가져옵니다.
  // const token = useTokenStore((state) => state.token);

  const navigate = useNavigate();

  // useEffect(() => {
  //   // // 로컬 스토리지에서 'products' 키로 저장된 데이터를 가져옵니다.
  //   // const storedData = localStorage.getItem("userInfo");

  //   // // 데이터가 존재한다면, JSON 형태로 파싱합니다.
  //   // if (storedData) {
  //   //   const parsedData = JSON.parse(storedData);

  //     // 파싱된 데이터에서 'nickName'과 'profileImg' 값을 가져옵니다.
  //     const { nickName, profileImg } = useUserStore()

  //     // Zustand 스토어의 상태 업데이트 함수를 사용해, 스토어의 상태를 업데이트합니다.
  //     setNickname(nickName);
  //     setProfileImage(profileImg);
  //   }
  // }, [setNickname, setProfileImage]);

  const gosetting = () => {
    navigate("/setting");
    return;
  };

  return (
    <div css={profileContainerStyle}>
      {/* 설정 아이콘으로 GearIcon을 사용합니다. */}
      <img
        onClick={gosetting}
        src={GearIcon}
        css={settingsIconStyle}
        alt="Settings"
      />
      <div>
        <img css={avatarBackgroundStyle} src={profileImage} />
      </div>
      {/* 아바타 뒷배경 추가 */}
      <div css={avatarStyle}>
        {/* 아바타 이미지를 여기에 넣어야 합니다. 예를 들어: */}
        <img css={innerImageStyle} src={profileImage} alt="Profile" />
      </div>
      <div>{nickname}</div>
    </div>
  );
};

export default ProfilePage;
