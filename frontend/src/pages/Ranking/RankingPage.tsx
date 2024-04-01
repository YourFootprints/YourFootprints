import { css } from "@emotion/react";
import "@components/Ranking/Marker.css";
import { useState } from "react";
import MapBox from "@/components/@common/MapBox";
// import UnderLineButton from "@/components/@common/UnderLineButton";
import Top from "@/components/Ranking/Top";
import Low from "@/components/Ranking/Low";
import profileImg from "@/assets/image/profile.jpg";
import profileImg2 from "@/assets/image/sample.jpg";
import profileImg3 from "@/assets/image/profile3.jpg";
import profileImg4 from "@/assets/image/profile4.jpg";
import { backgroundTheme } from "@/constants/ColorScheme";
import Marker from "@/components/Ranking/Marker";

export default function RankingPage() {
  const [select, setSelect] = useState<string>("my");
  const [copyMap, setCopyMap] = useState<any>(null);
  console.log(select)

  // FIXME 지우기
  const markers = [
    {
      "position": new window.kakao.maps.LatLng(33.450704, 126.570667),
      "content": Marker(profileImg),
    },
    {
      "position": new window.kakao.maps.LatLng(33.452000, 126.570800),
      "content": Marker(profileImg2),
    },
    {
      "position": new window.kakao.maps.LatLng(33.451500, 126.571500),
      "content": Marker(profileImg3),
    },
  ]

  markers.forEach(foot=>{
    // const customMarker = 
    new window.kakao.maps.CustomOverlay({
      map: copyMap,
      position: foot.position,
      content: foot.content,
      yAnchor: 1,
    })
  })

  const handleTabClick = (tab: string) => {
    setSelect(tab)
  };
  
  const handleCopyMap = (value: any) => {
    setCopyMap(value);
  };

  return (
    <div>
      {/* FIXME 탭헤더 공통컴포넌트 들어갈 부분 */}
      <div css={{height: "60px", display:"flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid var(--gray-100)"}}>
        <div css={tab} onClick={()=>{handleTabClick("my")}}>나의 산책로</div>
        <div css={tab} onClick={()=>{handleTabClick("around")}}>동네 산책로</div>
      </div>

      {/* 지도 */}
      <MapBox 
        width="100%"
        height="400px"
        lat={33.450701}   // [API]
        lng={126.570667}  // [API]
        handleCopyMap={handleCopyMap}
      />

      {/* [API] */}
      {/* 랭킹 */}
      <div css={rank.box}>
        <div css={rank.title}>이번주 랭킹</div>
        <div css={rank.top}>
          <Top img={profileImg2} rank="2" nickname={"펭둔"} foots={28} />
          <Top img={profileImg} rank="1" nickname={"경범"} foots={30} />
          <Top img={profileImg3} rank="3" nickname={"최대열글자까지닉네임"} foots={24} />
        </div>
        <div css={rank.low}>
          <Low img={profileImg4} rank="4" nickname={"최대열글자까지닉네임"} foots={24} />
          <Low img={profileImg4} rank="5" nickname={"ㅎㅎ"} foots={24} />
          <Low img={profileImg4} rank="6" nickname={"닉네임"} foots={24} />
          <Low img={profileImg4} rank="7" nickname={"최대열글자까지닉네임"} foots={24} />
          <Low img={profileImg4} rank="8" nickname={"최대열글자까지닉네임"} foots={24} />
          <Low img={profileImg4} rank="9" nickname={"최대열글자까지닉네임"} foots={24} />
          <Low img={profileImg4} rank="10" nickname={"최대열글자까지닉네임"} foots={24} />
          <Low img={profileImg4} rank="11" nickname={"최대열글자까지닉네임"} foots={24} />
          <Low img={profileImg4} rank="12" nickname={"최대열글자까지닉네임"} foots={24} />
          <Low img={profileImg4} rank="13" nickname={"최대열글자까지닉네임"} foots={24} />
          <Low img={profileImg4} rank="14" nickname={"최대열글자까지닉네임"} foots={24} />
          <Low img={profileImg4} rank="15" nickname={"최대열글자까지닉네임"} foots={24} />
        </div>
      </div>
    </div>
  )
}

const tab = css({
  cursor: "pointer"
})

const rank = {
  box: css({
    width: "100%",
    padding: "0 4%",
    boxSizing: "border-box",
    paddingTop: "3.5vw",
    '@media(min-width: 430px)': {
      paddingTop: "15px",
    }, 
  },
  backgroundTheme.custom
  ),
  title: css({
    fontFamily: "bold",
    fontSize: "4.2vw",
    marginBottom: "4.8vw",
    boxSizing: "border-box",
    '@media(min-width: 430px)': {
      fontSize: "18px",
      marginBottom: "20px",
    }
  }),
  top: css({
    display: "flex",
    justifyContent: "space-between",
  }),
  low: css({
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridColumnGap: "2.3vw",
    gridRowGap: "2.79vw",
    marginTop: "2.79vw",
    justifyContent: "space-between",
    '@media(min-width: 430px)': {
      gap: "10px",
      marginTop: "10px",
    }
  })
}