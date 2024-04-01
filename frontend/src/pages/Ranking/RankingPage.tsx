import { css } from "@emotion/react";
import "@components/Ranking/Marker.css";
import { useEffect, useState } from "react";
import MapBox from "@/components/@common/MapBox";
// import UnderLineButton from "@/components/@common/UnderLineButton";
import Top from "@/components/Ranking/Top";
import Low from "@/components/Ranking/Low";
import { backgroundTheme } from "@/constants/ColorScheme";
import Marker from "@/components/Ranking/Marker";
import { getMyFootprint, getAroundFootprint, getRanking } from "@/services/Ranking";
import profile from "@/assets/image/profile.png"
import { RankingType } from "@/store/Ranking/Ranking";

export default function RankingPage() {
  // const [select, setSelect] = useState<string>("my");
  const [copyMap, setCopyMap] = useState<any>(null);

  const [myFoots, setMyFoots] = useState([]);
  const [aroundFoots, setAroundFoots] = useState([]);
  const [ranking, setRanking] = useState<RankingType[]>([]);

  const [markers, setMarkers] = useState([
    {
      position: new window.kakao.maps.LatLng(0, 0), 
      content: Marker(profile)
    }
  ]);

  async function fetchMyFootprint() {
    try {
      const myFootprintData = await getMyFootprint();
      const myMarkers = myFootprintData.map((foot: { la: number; lo: number; userImgUrl: string; }) => ({
        position: new window.kakao.maps.LatLng(foot.la, foot.lo),
        content: Marker(foot.userImgUrl)
      }))
      setMyFoots(myMarkers);
      setMarkers(myMarkers);
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchAroundFootprint() {
    try {
      const aroundFootprintData = await getAroundFootprint();
      const aroundMarkers = aroundFootprintData.map((foot: { la: number; lo: number; userImgUrl: string; }) => ({
        position: new window.kakao.maps.LatLng(foot.la, foot.lo),
        content: Marker(foot.userImgUrl)
      }))
      setAroundFoots(aroundMarkers);
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchRanking() {
    try {
      const rankingData = await getRanking();
      setRanking(rankingData);
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchMyFootprint();
    fetchAroundFootprint();
    fetchRanking();
  }, [])

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
    // setSelect(tab);
    tab==="my"?setMarkers(myFoots):setMarkers(aroundFoots);
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
        level={5}
        // FIXME 중심좌표..
        lat={36.1055} 
        lng={128.416}
        handleCopyMap={handleCopyMap}
      />

      {/* [API] */}
      {/* 랭킹 */}
      <div css={ranks.box}>
        <div css={ranks.title}>이번주 랭킹</div>
        <div css={ranks.top}>
          {ranking.slice(0, 3).map(rank => 
            <Top img={rank.userImgUrl} rank={rank.rank.toString()} nickname={rank.userName} foots={rank.visitedNum} />
          )}
        </div>
        <div css={ranks.low}>
          {ranking.slice(3, 15).map(rank => 
            <Low img={rank.userImgUrl} rank={rank.rank.toString()} nickname={rank.userName} foots={rank.visitedNum} />
          )}
        </div>
      </div>
    </div>
  )
}

const tab = css({
  cursor: "pointer"
})

const ranks = {
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