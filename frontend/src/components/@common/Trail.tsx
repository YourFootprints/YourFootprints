import React from "react";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import HeartIcon from "@/assets/Record/Heart.svg?react"
import { RecordType } from "@/store/Record/Records";

interface TrailProps {
  url: string;      // 상세페이지 경로
  record: RecordType;
}

const Trail: React.FC<TrailProps> = ({ url, record }) => {
	const navigate = useNavigate();

  return (
    <div
      css={style.box}
      onClick={() => { navigate(`${url}`) }}
    >
      <div css={style.info}>
        <div>
          <div>
            <HeartIcon css={(!record.like)?[heart, heartClick]:heart} />
          </div>
          <span>{record.likeNum}</span>
        </div>
        <div>
          <span>{record.distance} km</span>
          <span>·</span>
          <span>{record.runtime} 분</span>
          <span>·</span>
          <span>{record.address}</span>
        </div>
      </div>
      <img css={style.img} src={record.trailsImg} />
    </div>
  )
}

const style = {
  box: css({
    width: "88vw",
    height: "64vw",
    margin: "0 6vw",
    position: "relative",
    cursor: "pointer",
    '@media(min-width: 430px)': {
      width: "378px",
      height: "275px",
      margin: "0 26px",
    }
  }),

  img: css({
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    zIndex: 0,
    objectFit: "cover",
  }),

  map: css({
    width: "100%",
    height: "100%",
    borderRadius: "10px",
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

const heart = css({
  width: "3.5vw",
  '@media(min-width: 430px)': {
    width: "15px",
  },
})

const heartClick = css({
  "path": {
    fill: "var(--white)"
  }
})

export default Trail;