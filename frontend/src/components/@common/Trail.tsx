import React from "react";
import { css } from "@emotion/react";
import { StaticMap } from "react-kakao-maps-sdk";

interface TrailProps {
  lat: number;  // 위도 latitude
  lon: number;  // 경도 longitude
}

const Trail: React.FC<TrailProps> = ({ lat, lon }) => {
  const style = {
    basic: css({
      width: "88vw",
      height: "64vw",
      margin: "0 6vw",
      position: "relative",
      '@media(min-width: 430px)': {
        width: "378px",
        height: "275px",
        margin: "0 26px",
      }
    }),

    map: css({
      width: "100%",
      height: "100%",
      borderRadius: "10px",
      cursor: "default",
      position: "absolute",
      zIndex: 0,
    }),

    info: css({
      width: "100%",
      height: "20%",
      borderBottomLeftRadius: "10px",
      borderBottomRightRadius: "10px",
      boxSizing: "border-box",
      padding: "0 6%",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: "3.5vw",
      color: "white",
      position: "absolute",
      bottom: 0,
      zIndex: 1,
      '@media(min-width: 430px)': {
        fontSize: "15px",
      },

      "*": {
        color: "white",
        fontFamily: "bold"
      },

      "div": {
        display: "flex"
      },

      "span": {
        marginLeft: "1vw",
      }
    })
  }

  return (
    <>
      <div
        css={style.basic}
      // FIXME detail 페이지?로 이동
      // onClick={() => { navigate("/") }}
      >
        <div css={style.info}>
          <div>
            <div>♡</div>  {/* <div>{"좋아요 했으면" ? "♥" : "♡"}</div> */} {/* FIXME <img>로 수정 */}
            <span>좋아요수</span>
          </div>
          <div>
            <span>km</span>
            <span>·</span>
            <span>분</span>
            <span>·</span>
            <span>주소</span>
          </div>
        </div>
        <StaticMap
          center={{ lat: lat, lng: lon }}
          css={style.map}
          marker={false}
          // [TYPE] event 타입
          onClick={(e: React.MouseEvent) => { e.preventDefault(); }}
        />
      </div>
    </>
  )
}

export default Trail;