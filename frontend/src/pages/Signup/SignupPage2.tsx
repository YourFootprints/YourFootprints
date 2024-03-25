import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { useStore } from "@/store/store";
import { useFindArea } from "./FindArea"; // 경로는 실제 구조에 맞게 조정해주세요

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

const SignupPage2: React.FC = () => {
  const setAreaName = useStore((state) => state.setAreaName);
  const [areaName, settingAreaName] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const { handleGetCurrentLocation } = useFindArea();

  // Zustand 스토어에서 위치상태를 가져옵니다.
  const areanameFromStore = useStore((state) => state.areaName);

  // 컴포넌트가 마운트될 때 스토어에서 가져온 지역으로 상태를 업데이트합니다.
  useEffect(() => {
    settingAreaName(areanameFromStore);
  }, [areanameFromStore]); // 스토어의 지역이 변경될 때마다 실행

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    settingAreaName(value);
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

export default SignupPage2;
