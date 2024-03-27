import { css } from "@emotion/react";
import React from "react";
import SampleIcon from "@/assets/image/sample.jpg";
import Change from "@/assets/image/change.png";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/store/store";
import { useState } from "react";

// 아바타 뒷배경 스타일
const avatarBackgroundStyle = css({
  width: "412px",
  height: "360px",
  backgroundColor: "#ccc",
  position: "absolute",
  top: "56%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 0,
  opacity: 0.5,
  backgroundSize: "cover",
});

// 아바타 스타일
const avatarStyle = css({
  width: "140px", // 아바타 크기
  height: "140px",
  borderRadius: "50%", // 원형 아바타
  backgroundColor: "#ccc", // 기본 배경색
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden", // 이미지가 원형을 벗어나지 않도록
  margin: "80px auto", // 페이지 중앙에 위치
  border: "8px solid lightgray", // light gray 테두리 추가
  boxShadow: "0 8px 8px rgba(0, 0, 0, 0.1)", // 그림자 추가
  zIndex: 10, // 아바타보다 뒤에 오도록 z-index 설정
});

// 헤더 스타일
const headerStyle = css({
  width: "412px", // 전체 너비
  height: "60px", // 헤더의 높이 지정
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#ffffff", // 헤더의 배경색을 흰색으로 설정
  fontSize: "18px",
  fontWeight: "bold",
  zIndex: 10,
});

// 헤더 내 버튼 스타일
const headerButtonStyle = css({
  padding: "10px",
  cursor: "pointer",
  backgroundColor: "transparent",
  border: "none",
  fontWeight: "bold",
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

// 이미지 변경 버튼 스타일
const changeImageButtonStyle = css({
  cursor: "pointer",
  position: "absolute", // 아바타 이미지 위에 위치하도록 절대 위치 사용
  bottom: "27%", // 아바타 이미지 하단에서 적당한 위치에 버튼 배치
  right: "30%", // 아바타 이미지 우측에서 적당한 위치에 버튼 배치
  backgroundColor: "#ffffff", // 버튼 배경색
  padding: "5px",
  borderRadius: "50%", // 원형 버튼
  boxShadow: "0 1px 4px rgba(0, 0, 0, 0.2)", // 버튼에 그림자 효과 추가
  "&:hover": {
    backgroundColor: "#f0f0f0", // 마우스 호버시 배경색 변경
  },
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 20, // 다른 요소 위에 오도록 z-index 설정
});

const changeimage = css({
  width: "40px",
  height: "40px",
});

// // 파일 입력 라벨 스타일 (버튼처럼 보이게)
// const fileInputLabelStyle = css({
//   cursor: "pointer",
//   // 다른 스타일 속성이 필요하면 여기에 추가
// });

// 컴포넌트 선언
const ProfileSetting: React.FC = () => {
  const usernameFromStore = useStore((state) => state.nickname);
  const { setProfileImage } = useStore();
  const [profileImage, settingProfileImage] = useState(SampleIcon); // 초기 이미지로 SampleIcon을 사용
  const navigate = useNavigate();

  // 이미지 파일을 선택했을 때 호출되는 핸들러
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const fileReader = new FileReader();

      fileReader.onload = (e) => {
        // 파일 읽기가 완료되면 상태 업데이트하여 아바타 이미지와 뒷배경 모두 변경
        const newImage = e.target?.result as string;
        setProfileImage(newImage); // 스토어의 setProfileImage 메서드를 호출하여 이미지 저장
        settingProfileImage(newImage);
      };

      fileReader.readAsDataURL(file); // 파일을 Data URL로 읽음
    }
  };

  // 뒤로 가기 버튼 이벤트 핸들러
  const handleBack = () => {
    navigate(-1);
  };

  // 완료 버튼 이벤트 핸들러
  const handleComplete = () => {
    // 여기에 설정을 저장하고 페이지를 이동하는 기능을 구현하세요.
  };

  return (
    <div>
      <div css={headerStyle}>
        <button css={headerButtonStyle} onClick={handleBack}>
          뒤로 가기
        </button>
        프로필 수정
        <button css={headerButtonStyle} onClick={handleComplete}>
          완료
        </button>
      </div>
      <div css={profileContainerStyle}>
        <div>
          <img css={avatarBackgroundStyle} src={profileImage} />
        </div>
        {/* 상태를 사용하여 뒷배경 이미지에도 적용 */}
        <div css={avatarStyle}>
          <img css={innerImageStyle} src={profileImage} alt="Profile" />
          {/* 이미지 변경 버튼 */}
          <label css={changeImageButtonStyle} htmlFor="fileInput">
            <img css={changeimage} src={Change} alt="Change" />
            {/* 아이콘 이미지 */}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
            id="fileInput"
          />
        </div>
        <div>{usernameFromStore}</div>
      </div>
    </div>
  );
};

export default ProfileSetting;
