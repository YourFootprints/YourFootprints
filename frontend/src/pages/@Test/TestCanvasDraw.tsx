// import React from "react";
// import ReactDOM from "react-dom";
import "@/index.css";
import { css } from "@emotion/react";
import { useState } from "react";
import CanvasDraw from "react-canvas-draw";
import testImg from "@/assets/image/testmap.png";

export default function TestCanvasDraw() {
  const Color = () => {
    return (
      <div>
        
      </div>
    )
  }

  const [brushColor, setBrushColor] = useState("black");
  const [brushSize, setBrushSize] = useState(3);
  return (
    <div css={map.wrap}>
      <img css={map.img} src={testImg} />
      <CanvasDraw 
        // 고정값
        css={map.draw}
        hideGrid={true}
        backgroundColor="none"
        style={{width:"100%", height:"100%"}}

        // 사용자 설정
        brushColor={brushColor}
        brushRadius={brushSize}
      />
    </div>
  )
}


/* CSS */
const map = {
  wrap: css({
    width: "100%",
    height: "80vw",
    position: "relative",
    '@media(min-width: 430px)': {
      height: "350px",
    }
  }),
  img: css({
    width: "100%",
    height: "100%",
    objectFit: "cover",
  }),
  draw: css({
    width: "100%",
    height: "100%",
    top: "50%",
    left: "50%",
    transform: "translate( -50%, -50% )",
    position: "absolute",
    cursor: "pointer",
  })
}