import { css } from "@emotion/react";
import React, { useState, useEffect } from "react";
import Change from "@/assets/image/change.png";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";
import axios from "axios";
import { useTokenStore } from "@/store/useTokenStore";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography"; // Typography 컴포넌트를 import 합니다.
import Box from "@mui/material/Box";
import CrosshairIcon from "@/assets/Trail/CrosshairIcon.svg?react";
import { useProfileFindArea } from "./ProfileFindArea";
import DetailHeader from "@/components/@common/DetailHeader";
import { backgroundTheme, fontTheme } from "@/constants/ColorScheme";

// 아바타 뒷배경 스타일
const avatarBackgroundStyle = css({
  width: "100%",
  height: "100%",
  backgroundColor: "#ccc",
  position: "absolute",
  top: "50%",
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

// 닉네임 스타일
const nicknameStyle = css(
  {
    fontWeight: "bold", // 볼드 처리
    fontSize: "28px", // 글자 크기 증가
    position: "absolute", // 절대 위치
    top: "89%", // 상단에서 50% 위치
    left: "50%", // 좌측에서 50% 위치
    transform: "translate(-50%, -50%)", // 정중앙으로 이동
    color: "black", // 글자 색상은 원하는 대로 조정
    zIndex: 10, // 이미지 위에 오도록 z-index 설정
  },
  fontTheme
);

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

// 폼 전체 스타일
const formStyle = css({
  display: "flex",
  flexDirection: "column",
  margin: "0 20px", // 상하 마진 0, 좌우 마진 20px
});

// 라벨 스타일
const labelStyle1 = css({
  marginTop: "40px",
  fontSize: "20px",
  fontWeight: "bold",
  marginLeft: "3px",
  marginBottom: "9px",
  alignSelf: "flex-start", // 왼쪽 상단 정렬
});

// // 라벨 스타일
// const labelStyle2 = css({
//   marginTop: "10px",
//   fontSize: "20px",
//   fontWeight: "bold",
//   marginLeft: "3px",
//   marginBottom: "9px",
//   alignSelf: "flex-start", // 왼쪽 상단 정렬
// });

// 라벨 스타일
const labelStyle3 = css({
  marginTop: "40px",
  fontSize: "20px",
  fontWeight: "bold",
  marginLeft: "3px",
  marginBottom: "9px",
  alignSelf: "flex-start", // 왼쪽 상단 정렬
});

// 입력 필드 스타일
const inputStyle = css(
  {
    border: "none", // 테두리 없음
    borderBottom: "1px solid #ccc", // 밑줄 스타일
    borderRadius: "7px",
    height: "30px",
    padding: "10px",
    outline: "none", // 클릭 시 테두리 없음
    "&:focus": {
      borderBottom: "2px solid #666", // 포커스 시 밑줄 굵게 및 색상 변경
    },
  },
  backgroundTheme.custom
);

// 현재 위치 버튼
const locationContainerStyle = css({
  cursor: "pointer", // 마우스를 버튼 위에 올리면 포인터로 변경
  display: "flex",
  alignItems: "center",
  gap: "5px", // 여기에 SVG 이미지와 '현재위치' 텍스트 사이의 간격을 조정할 수 있습니다.
});

const neighborhoodTextStyle = css({
  fontSize: "20px",
  fontWeight: "bold",
  marginLeft: "3px",
  alignSelf: "flex-start", // 왼쪽 상단 정렬
});

// div 스타일
const divStyle = css({
  position: "relative",
  // div에 대한 나머지 스타일...
});

const crosshairContainerStyle = css({
  display: "flex",
  justifyContent: "space-between",
  width: "100%", // 부모 컨테이너의 너비를 확정합니다.
});

const lastwalk = css({
  marginTop: "10px",
});

// 힌트 스타일 (힌트의 보이기/숨기기 상태를 제어)
const hintStyle = (visible: boolean) =>
  css({
    visibility: visible ? "visible" : "hidden",
    color: "red",
    fontSize: "12px",
    alignSelf: "flex-start", // 왼쪽 상단 정렬
    marginBottom: "10px",
    marginLeft: "10px",
  });

// // 파일 입력 라벨 스타일 (버튼처럼 보이게)
// const fileInputLabelStyle = css({
//   cursor: "pointer",
//   // 다른 스타일 속성이 필요하면 여기에 추가
// });

// 값이 30분 단위로 표시되도록 valuetext 함수를 업데이트합니다.
function valuetext(value: number) {
  const hours = Math.floor(value / 2);
  const minutes = (value % 2) * 30;
  if (hours === 0 && minutes === 30) {
    return `30분`; // "0시간" 대신 "30분"만 반환
  }
  return `${hours}시간 ${minutes ? "30분" : ""}`;
}

const sliderStyle = css({
  marginTop: "30px",
});

// 컴포넌트 선언
const ProfileSetting = () => {
  const {
    nickname,
    setProfileImage,
    profileImage,
    areaName,
    walkStartTime,
    walkEndTime,
    setNickname,
    setWalkStartTime,
    setWalkEndTime,
    setAreaName,
  } = useUserStore((state) => ({
    setNickname: state.setNickname,
    setProfileImage: state.setProfileImage,
    profileImage: state.profileImage,
    nickname: state.nickname,
    areaName: state.areaName,
    walkStartTime: state.walkStartTime,
    walkEndTime: state.walkEndTime,
    setAreaName: state.setAreaName,
    setWalkEndTime: state.setWalkEndTime,
    setWalkStartTime: state.setWalkStartTime,
  }));
  const navigate = useNavigate();
  // 상태 관리
  const [file, setFile] = useState<File | null>(null);
  const [areaList, setAreaList] = useState<string[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(
    profileImage
  );
  const [isHintVisible, setHintVisible] = useState(false);
  const [newNickname, setNewNickname] = useState(nickname);
  const [newAddress, setNewAddress] = useState(areaName);
  const [requiredNewTimeStart, setNewRequiredTimeStart] =
    useState(walkStartTime);
  const [requiredNewTimeEnd, setNewRequiredTimeEnd] = useState(walkEndTime);
  const [value1, setValue1] = useState<number[]>([walkStartTime, walkEndTime]);
  const { handleGetCurrentLocation } = useProfileFindArea(setNewAddress);

  // Slider에서 선택 가능한 최소 거리입니다.
  const minDistance = 0;

  // Slider에서 선택 가능한 최대 거리를 정의합니다.
  const maxDistance = 10;
  // const token = localStorage.getItem("token"); // 로그인 토큰
  const { token } = useTokenStore();

  // 컴포넌트가 마운트될 때 API 요청을 보내고 데이터를 가져옵니다.
  useEffect(() => {
    // 토큰이 유효한 경우에만 API 요청을 보냅니다.
    if (token) {
      const config = {
        headers: {
          Authorization: token,
        },
      };
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/find-full-dong-list`,
            config
          );
          setAreaList(response.data.data); // API 응답에서 데이터를 추출하여 상태를 업데이트합니다.
        } catch (error) {
          console.error("Error fetching dong list:", error);
        }
      };

      fetchData(); // 함수 호출
    }
  }, [token]); // 토큰이 변경될 때마다 useEffect가 다시 실행됩니다.

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newFile = event.target.files[0];
      setFile(newFile);
      setPreviewUrl(URL.createObjectURL(newFile)); // 미리보기 URL 업데이트
    }
  };

  // 닉네임 변경 함수
  const handleInputChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNewNickname(value);

    // 입력된 값의 길이가 2보다 작거나 10보다 클 경우 힌트를 보여줌
    setHintVisible(value.length > 0 && (value.length < 2 || value.length > 10));
  };

  // 주소 변경 함수
  const handleInputChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNewAddress(value);
  };

  // Slider 값이 변경될 때 호출되는 함수입니다.
  const handleChange3 = (
    _: Event, // 첫 번째 매개변수인 이벤트 객체는 사용하지 않으므로, _로 표시합니다.
    newValue: number | number[],
    activeThumb: number
  ) => {
    // newValue가 배열이 아니라면 함수를 종료합니다.
    // Slider의 `range` 모드에서는 newValue가 항상 배열입니다.
    if (!Array.isArray(newValue)) {
      return;
    }

    // newValue 배열에서 시작과 끝 시간을 추출합니다.
    const [start, end] = newValue;

    // 스토어에 시작 및 끝 시간 저장
    setNewRequiredTimeStart(start);
    setNewRequiredTimeEnd(end);

    // 첫 번째 thumb을 움직이는 경우입니다.
    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      // 두 번째 thumb을 움직이는 경우입니다.
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  const handleComplete = async () => {
    // 닉네임 유효성 검사
    if (
      newNickname.length < 2 ||
      newNickname.length > 10 ||
      !/^[a-zA-Z0-9가-힣]+$/.test(newNickname)
    ) {
      alert("닉네임이 올바른 형식이 아닙니다. (특수문자 없이 2~10자 이내)");
      return; // 조건이 맞지 않으면 함수 실행을 중단합니다.
    }

    if (areaList.indexOf(newAddress) === -1) {
      alert("입력하신 주소가 존재하지 않습니다. 다시 확인해주세요.");
      return; // 주소가 없으면 함수 실행을 중단하고 다음 스텝으로 넘어가지 않습니다.
    }

    if (walkStartTime === walkEndTime) {
      alert("산책시간을 범위로 주시길 바랍니다. 다시 확인해주세요.");
      return; // 시작시간과 끝시간이 같은지 확인하고 같으면 다음 스텝으로 넘어가지 않습니다.
     }
    


    const formData = new FormData();
    if (file) {
      formData.append("imgUrl", file);
    }

    formData.append("nickName", newNickname);
    formData.append("address", newAddress);
    formData.append("requiredTimeStart", requiredNewTimeStart.toString());
    formData.append("requiredTimeEnd", requiredNewTimeEnd.toString());

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/profile/edit`,
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // 성공 시 Zustand 스토어와 로컬 스토리지 업데이트

      const newImageUrl = response.data.data.profileImg;
      const editNickname = response.data.data.nickName;
      const editAddress = response.data.data.address;
      const editTimeStart = response.data.data.requiredTimeStart;
      const editTimeEnd = response.data.data.requiredTimeEnd;

      console.log(response);
      setProfileImage(newImageUrl);
      setNickname(editNickname);
      setAreaName(editAddress);
      setWalkStartTime(editTimeStart);
      setWalkEndTime(editTimeEnd);
      alert("프로필이 성공적으로 업데이트되었습니다.");
      navigate("/profile");
    } catch (error: any) {
      if (error.response && error.response.data.error.status === 401) {
        if (error.response.data.error.msg === "이미 존재하는 닉네임입니다.") {
          // 백엔드에서 401 에러와 함께 메시지를 보낸 경우
          const errorMessage = error.response.data.error.msg;
          alert(`프로필 업데이트 실패: ${errorMessage}`);
        }
      } else {
        // 그 외의 경우에는 기본 에러 메시지를 보여줍니다.
        alert("프로필 업데이트에 실패했습니다.");
      }
    }
  };

  return (
    <div css={divStyle}>
      <div>
        <DetailHeader
          title={"프로필 수정"}
          backURL={"/profile"}
          backConfirm={"수정된 내용은 저장되지 않습니다. 뒤로 가시겠습니까?"}
          content={<div onClick={handleComplete}>완료</div>}
        />
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
        <div css={nicknameStyle}> {nickname}</div>
      </div>
      <div css={formStyle}>
        <label css={labelStyle1} htmlFor="nickname">
          닉네임
        </label>
        <input
          css={inputStyle}
          type="text"
          id="nickname"
          name="nickname"
          placeholder={nickname}
          value={newNickname}
          onChange={handleInputChange1}
          maxLength={10} // 닉네임 입력 최대 길이를 10글자로 제한
        />
        <div css={hintStyle(isHintVisible)}>
          두 글자 이상, 열 글자 이하로 작성해주세요
        </div>
      </div>
      <div css={formStyle}>
        <div css={crosshairContainerStyle}>
          <div css={neighborhoodTextStyle}>동네</div>
          <div onClick={handleGetCurrentLocation} css={locationContainerStyle}>
            <CrosshairIcon />
            현재위치
          </div>
        </div>
        <input
          css={inputStyle}
          type="text"
          id="address"
          name="address"
          placeholder={areaName}
          value={newAddress}
          onChange={handleInputChange2}
        />
      </div>
      <div css={lastwalk}>
        <Box
          sx={{
            display: "flex", // flexbox 레이아웃을 사용합니다.
            flexDirection: "column", // 항목들을 세로로 배치합니다.
            margin: "20px", // 마진을 설정하여 주변 요소와의 간격을 줍니다.
          }}
        >
          {/* 'Typography' 컴포넌트를 사용하여 스타일을 적용한 텍스트를 렌더링합니다. */}
          <Typography
            sx={{
              fontSize: "20px", // 폰트 크기를 설정합니다.
              fontWeight: "bold", // 폰트 두께를 bold로 설정합니다.
              marginBottom: "10px", // 아래쪽 마진을 설정하여 요소 사이의 간격을 줍니다.
              alignSelf: "flex-start", // flexbox 컨테이너 내에서 자기 자신을 왼쪽 정렬합니다.
            }}
            component="label" // 이 컴포넌트가 렌더링할 HTML 엘리먼트의 종류를 'label'로 지정합니다.
            htmlFor="nickname" // 연결된 폼 요소의 ID를 지정합니다. 이 경우는 사용되지 않습니다.
          >
            <label css={labelStyle3} htmlFor="walktime">
              희망 산책 시간
            </label>
          </Typography>

          {/* Slider 컴포넌트를 렌더링합니다. */}
          <Slider
            css={sliderStyle}
            getAriaLabel={() => "Minimum distance shift"}
            value={value1}
            onChange={handleChange3}
            valueLabelDisplay="on"
            getAriaValueText={valuetext}
            valueLabelFormat={valuetext}
            step={1} // 슬라이더를 한 단계 이동할 때마다 1 증가 (30분 단위)
            marks
            disableSwap
            min={minDistance}
            max={maxDistance}
            sx={{
              color: "#4acf9a", // 슬라이더의 활성 색상을 초록색으로 설정합니다.
              "& .MuiSlider-thumb": {
                color: "#4acf9a", // thumb의 색상을 초록색으로 설정합니다.
              },
              "& .MuiSlider-track": {
                color: "#4acf9a", // track의 색상을 초록색으로 설정합니다.
              },
              "& .MuiSlider-rail": {
                color: "#bfbfbf", // rail의 색상을 회색으로 설정합니다.
              },
              "& .MuiSlider-markLabel": {
                color: "black", // 마크 라벨의 색상을 검정색으로 설정합니다.
              },
              "& .MuiSlider-markLabelActive": {
                color: "black", // 활성 마크 라벨의 색상을 검정색으로 설정합니다.
              },
              "& .MuiSlider-mark": {
                backgroundColor: "lightgray", // 마크의 색상을 진한 회색으로 설정합니다.
                width: "4px", // 마크의 너비를 설정합니다.
                height: "4px", // 마크의 높이를 설정합니다. 필요에 따라 조정 가능
                borderRadius: "50%", // 마크를 완전히 동그랗게 만듭니다.
              },
              "& .MuiSlider-valueLabel": {
                backgroundColor: "transparent", // 박스의 배경색을 투명하게 설정합니다.
                color: "grey", // 텍스트의 색상을 회색으로 설정합니다.
              },
            }}
          />
        </Box>
      </div>
    </div>
  );
};

export default ProfileSetting;
