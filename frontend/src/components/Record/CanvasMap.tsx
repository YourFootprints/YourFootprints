import "@/index.css";
import { css } from "@emotion/react";
import { useContext } from "react";
import CanvasDraw from "react-canvas-draw";
import { CanvasMapContext } from "@components/Record/CanvasMapWrap";
import { CustomMapContext } from "@/pages/Record/RecordEditPage";

interface CanvasMapProps {
  imgSrc: string;
}

const CanvasMap: React.FC<CanvasMapProps> = ({imgSrc}) => {
  const {
    brushColor, 
    // setBrushColor, 
    brushSize, 
    // setBrushSize,
    customMap, 
    // clear, 
    // undo,
  } = useContext(CanvasMapContext);
  const {isDraw, setIsDraw} = useContext(CustomMapContext);
  
  return (
    <>
    <div css={map.wrap}>
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
      <img css={map.img} src={imgSrc} />
    </div>
    </>
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

export default CanvasMap;