import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import Change from "@/assets/image/change.png";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/store/store";
// import { useStore as useTokenStore } from "@/store/token";
import axios from "axios";

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
const ProfileSetting = () => {
  const { nickname, setNickname, setProfileImage, profileImage } = useStore(
    (state) => ({
      setNickname: state.setNickname,
      setProfileImage: state.setProfileImage,
      profileImage: state.profileImage,
      nickname: state.nickname,
    })
  );
  const navigate = useNavigate();
  // 상태 관리
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(
    profileImage
  );
  // const [nickName, setNickName] = useState(""); // 닉네임 상태
  // const [address, setAddress] = useState(""); // 주소 상태
  // const [requiredTimeStart, setRequiredTimeStart] = useState(0); // 시작 시간 상태
  // const [requiredTimeEnd, setRequiredTimeEnd] = useState(0); // 종료 시간 상태
  const token = localStorage.getItem("token"); // 로그인 토큰

  // 초기 렌더링 시 로컬 스토리지에서 프로필 이미지 로드
  useEffect(() => {
    const storedData = localStorage.getItem("products");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      // `parsedData.data`가 존재하는지 확인
      if (parsedData && parsedData.data) {
        // `nickName`과 `profileImg`를 안전하게 구조 분해 할당
        const { nickName, profileImg } = parsedData.data;
        setNickname(nickName);
        setProfileImage(profileImg);
      }
    }
  }, [setNickname, setProfileImage]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newFile = event.target.files[0];
      setFile(newFile);
      setPreviewUrl(URL.createObjectURL(newFile)); // 미리보기 URL 업데이트
    }
  };

  const handleComplete = async () => {
    const formData = new FormData();
    if (file) {
      formData.append("imgUrl", file);
    }
    // formData.append("nickName", nickName);
    // formData.append("address", address);
    // formData.append("requiredTimeStart", requiredTimeStart.toString());
    // formData.append("requiredTimeEnd", requiredTimeEnd.toString());

    try {
      const response = await axios.put(
        "http://localhost:8080/api/users/profile/edit",
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // 성공 시 Zustand 스토어와 로컬 스토리지 업데이트
      const newImageUrl = response.data.profileImg;
      setProfileImage(newImageUrl);
      localStorage.setItem("profileImage", newImageUrl);
      alert("프로필이 성공적으로 업데이트되었습니다.");
      navigate("/profile");
    } catch (error) {
      console.error("이미지 업로드 실패", error);
      alert("프로필 이미지 업데이트에 실패했습니다.");
    }
  };

  return (
    <div>
      <div css={headerStyle}>
        <button css={headerButtonStyle} onClick={() => navigate(-1)}>
          뒤로
        </button>
        프로필 수정
        <button css={headerButtonStyle} onClick={handleComplete}>
          완료
        </button>
      </div>
      <div css={profileContainerStyle}>
        <div css={avatarBackgroundStyle}>
          <img
            src={previewUrl || profileImage}
            alt="Profile Background"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div css={avatarStyle}>
          <img
            css={innerImageStyle}
            src={previewUrl || profileImage}
            alt="Profile"
          />
          <label css={changeImageButtonStyle} htmlFor="fileInput">
            <img src={Change} alt="Change" css={changeimage} />
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>
        <div>{nickname}</div>
      </div>
    </div>
  );
};

export default ProfileSetting;
