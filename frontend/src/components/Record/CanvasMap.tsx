import "@/index.css";
import { css } from "@emotion/react";
import { useContext } from "react";
import CanvasDraw from "react-canvas-draw";
import { CanvasMapContext } from "@components/Record/CanvasMapWrap";
import { CustomMapContext } from "@/pages/Record/RecordEditPage";
import testImg from "@/assets/image/testmap.png"

interface CanvasMapProps {
  imgSrc: string;
}

const CanvasMap: React.FC<CanvasMapProps> = ({ imgSrc }) => {
  console.log(imgSrc); // [REMOVE]

  const {
    brushColor,
    // setBrushColor,
    brushSize,
    // setBrushSize,
    customMap,
    mapImg,
    // clear,
    // undo,
  } = useContext(CanvasMapContext);
  const { isDraw, setIsDraw } = useContext(CustomMapContext);

  return (
    <>
    <div css={map.wrap} ref={mapImg}>
      <CanvasDraw 
        // 고정값
        ref={customMap}
        css={map.draw}
        // imgSrc={imgSrc}
        hideGrid={true}
        backgroundColor="none"
				lazyRadius={1}
        style={{width:"100%", height:"100%"}}
        onChange={()=>{
          // 값이 한번이라도 바꼈으면, 저장 버튼 활성화 / 뒤로가기 confirm !
          if (!isDraw) {
            setIsDraw(true)
          }
        }}

        // 사용자 설정
        brushColor={brushColor}
        brushRadius={brushSize}
				catenaryColor={brushColor}
      />

      {/* <img css={map.img} src={"https://d1l3cj2w0ipefz.cloudfront.net/6dfdd892-0d6d-4ddf-a9ca-2754d7b138bb"} /> */}
      <img css={map.img} src={imgSrc} />
      {/* <img css={map.img} src={testImg} /> */}
    </div>
    </>
  );
};

/* CSS */
const map = {
  wrap: css({
    width: "100%",
    height: "80vw",
    position: "relative",
    "@media(min-width: 430px)": {
      height: "350px",
    },
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
  }),
};

export default CanvasMap;