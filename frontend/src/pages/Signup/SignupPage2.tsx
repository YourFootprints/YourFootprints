import React, { useState } from "react";
import { css } from "@emotion/react";

// 폼 전체 스타일
const formStyle = css({
  display: "flex",
  flexDirection: "column",
  margin: "20px",
});

const FindAreaButton = css({
  height: "50px",
  backgroundColor: "#4acf9a", // 색상 값은 문자열로 주고, '#'을 앞에 붙여야 합니다.
  border: "none", // 버튼 테두리를 없애려면 이 속성을 추가합니다.
  color: "white", // 텍스트 색상을 흰색으로 설정합니다.
  fontSize: "16px", // 텍스트 크기를 설정합니다.
  cursor: "pointer", // 마우스를 올렸을 때 커서 모양을 손가락 모양으로 변경합니다.
  borderRadius: "8px",
  marginTop: "10px",
});

// 라벨 스타일
const labelStyle = css({
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "10px",
  alignSelf: "flex-start", // 왼쪽 상단 정렬
});

// 입력 필드 스타일
const inputStyle = css({
  marginTop: "35px",
  border: "none", // 테두리 없음
  borderBottom: "1px solid #ccc", // 밑줄 스타일
  padding: "10px",
  marginBottom: "10px",
  outline: "none", // 클릭 시 테두리 없음
  "&:focus": {
    borderBottom: "2px solid #666", // 포커스 시 밑줄 굵게 및 색상 변경
  },
});

// 리스트 스타일
const ulStyle = css({
  marginTop: "20px",
  listStyleType: "none",
  paddingLeft: "0", // 기본 리스트의 패딩을 제거
});

// 리스트 항목 스타일
const liStyle = css({
  padding: "10px 0", // 상하 패딩만 적용
  borderBottom: "1px solid #ccc", // 항목 사이에 줄 추가
  textAlign: "left", // 텍스트 왼쪽 정렬
  marginLeft: "0", // 항목의 왼쪽 마진 제거
  ":first-of-type": {
    fontWeight: "bold",
    borderBottom: "2px solid #4acf9a",
  },
});

// 힌트 스타일 (힌트의 보이기/숨기기 상태를 제어)
const hintStyle = css({
  marginTop: "20px",
  color: "lightgray",
  fontSize: "14px",
  marginBottom: "10px",
  marginLeft: "10px",
  transition: "opacity 0.25s", // 부드러운 효과를 위해 추가
});

const areaList: string[] = [
  "강남 읍사무소",
  "반곡 동사무소",
  "대전 동구 사무소",
  "서울 강남구 사무소",
  "서울 관악구 사무소",
  // ... 기타 지역들
];

const SignupPage1: React.FC = () => {
  const [areaName, setAreaName] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAreaName(value);

    if (value) {
      // 입력값이 있을 경우 더미 데이터에서 필터링
      const filteredResults = areaList.filter((area) =>
        area.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      // 입력값이 없을 경우 리스트를 비웁니다.
      setSearchResults([]);
    }
  };

  // 현재 위치를 가져오는 함수
  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // 예시로 위도와 경도를 input에 표시
          // 실제로는 이 값을 사용해 리버스 지오코딩 API를 호출하고, 결과를 input에 표시할 수 있습니다.
          setAreaName(`위도: ${latitude}, 경도: ${longitude}`);
        },
        (error) => {
          console.error("Geolocation Error:", error);
          alert("위치 정보를 가져올 수 없습니다.");
        }
      );
    } else {
      alert("이 브라우저에서는 위치 서비스를 지원하지 않습니다.");
    }
  };

  return (
    <div css={formStyle}>
      <label css={labelStyle} htmlFor="areaname">
        거주 지역을 입력해주세요
      </label>
      <input
        css={inputStyle}
        type="text"
        id="areaname"
        name="areaname"
        placeholder="내 동네 이름(동, 읍, 면)으로 검색"
        value={areaName}
        onChange={handleInputChange}
      />
      <button css={FindAreaButton} onClick={handleGetCurrentLocation}>
        현재 위치로 찾기
      </button>

      {/* 검색 결과가 있으면 결과 리스트를 표시합니다. */}
      {areaName && searchResults.length > 0 && (
        <ul css={ulStyle}>
          {/* 사용자가 입력한 검색어를 맨 위에 표시합니다. */}
          <li css={liStyle}>'{areaName}' 검색결과</li>
          {/* 나머지 검색 결과를 리스트 아이템으로 표시합니다. */}
          {searchResults.map((result, index) => (
            <li css={liStyle} key={index}>
              {result}
            </li>
          ))}
        </ul>
      )}

      {/* 검색 결과가 없으면 안내 메시지를 표시합니다. */}
      {!areaName && searchResults.length === 0 && (
        <div css={hintStyle}>
          <p>현재 위치로 찾기를 클릭하여 현재 위치를 받아보세요!</p>
          <p>내 동네 이름을 입력하면 자동으로 검색돼요!</p>
        </div>
      )}
    </div>
  );
};

export default SignupPage1;
