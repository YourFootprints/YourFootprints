import { css } from "@emotion/react";
import { backgroundTheme, fontTheme } from "@/constants/ColorScheme";
import "@components/Ranking/Marker.css";
import UnderLineButton from "@/components/@common/UnderLineButton";
import MapBox from "@/components/@common/MapBox";
import Top from "@/components/Ranking/Top";
import Low from "@/components/Ranking/Low";
import Marker from "@/components/Ranking/Marker";
import { RankingType } from "@/store/Ranking/Ranking";
import { getMyFootprint, getAroundFootprint, getRanking } from "@/services/Ranking";
import { useEffect, useRef, useState } from "react";
import { useUserStore } from "@/store/useUserStore";

export default function RankingPage() {
  const { location } = useUserStore();                   // 지도 중심좌표
  const [copyMap, setCopyMap] = useState<any>(null);
  
  const [my, around] = ["나의 발자국", "동네 발자국"];
  const [select, setSelect] = useState<string>(my);

  // 발자국
  const myMarkers = useRef([]);                          // 내 발자국
  const aroundMarkers = useRef([]);                      // 동네 발자국
  const [myFoots, setMyFoots] = useState([]);
  const [aroundFoots, setAroundFoots] = useState([]);

  const [ranking, setRanking] = useState<RankingType[]>([]);  // 랭킹

  async function fetchMyFootprint() {
    try {
      const myFootprintData = await getMyFootprint();
      setMyFoots(myFootprintData)
    } catch (err) {
      console.log(err);
    }
  }
  
  async function fetchAroundFootprint() {
    try {
      const aroundFootprintData = await getAroundFootprint();
      setAroundFoots(aroundFootprintData);
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

  function addMarker(position:any, markers:any, img:string) {
    const marker = new window.kakao.maps.CustomOverlay({
      position: position,
      content: Marker(img),
      yAnchor: 1,
    })

    marker.setMap(copyMap)
    markers.push(marker)
  }

  function addMarkers(foots:any, markers:any) {
    foots.forEach((foot:any) => {
      const position = new window.kakao.maps.LatLng(foot.la, foot.lo)
      addMarker(position, markers, foot.userImgUrl);
    })
  }

  function removeMarkers(markers:any) {
    markers.forEach((marker:any) => {
      marker.setMap(null);
    })
  }

  if (select===my) {
    removeMarkers(aroundMarkers.current);
    addMarkers(myFoots, myMarkers.current)
  } else {
    removeMarkers(myMarkers.current);
    addMarkers(aroundFoots, aroundMarkers.current)
  }
  
  const handleCopyMap = (value: any) => {
    setCopyMap(value);
  };

  const handleClickSelect = (value: string) => {
    setSelect(value);
  }

  useEffect(() => {
    fetchMyFootprint();
    fetchAroundFootprint();
    fetchRanking();
  }, [])

  return (
    <div>
      <UnderLineButton first={my} second={around} select={select} handleClickSelect={handleClickSelect} />

      {/* 지도 */}
      <MapBox 
        width="100%"
        height="400px"
        level={5}
        lat={location[0]}
        lng={location[1]}
        handleCopyMap={handleCopyMap}
      />

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

const ranks = {
  box: css({
    width: "100%",
    padding: "0 4%",
    paddingTop: "3.5vw",
    paddingBottom: "1rem",
    boxSizing: "border-box",
    minHeight: "calc(100vh - 560.8px)",
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
  }, fontTheme),
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