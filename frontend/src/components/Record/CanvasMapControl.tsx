import "@/index.css";
import { css } from "@emotion/react";
import { useContext } from "react";
import { CanvasMapContext } from "@components/Record/CanvasMapWrap";
import { CustomMapContext } from "@/pages/Record/RecordEditPage";

interface CanvasMapControlProps {
  
}

const CanvasMapControl: React.FC<CanvasMapControlProps> = () => {
  const {
    // brushColor,
    setBrushColor, 
    brushSize, 
    setBrushSize,
    // customMap, 
    clear, 
    undo,
  } = useContext(CanvasMapContext);
  const {setEditMap} = useContext(CustomMapContext);

  const Color = ({color}:{color:string}) => {
    return (
      <div 
        css={[colors.color, {backgroundColor:color}]}
        onClick={()=>{setBrushColor(color)}}
      >
      </div>
    )
  }

  return (
    <div css={style.box}>
      <div css={colors.box}>
        <Color color="#f33c32" />
        <Color color="#ff9811" />
        <Color color="#ffd016" />
        <Color color="#46b358" />
        <Color color="white" />
        <Color color="#6572e9" />
        <Color color="#c956d6" />
        <Color color="#ff6488" />
        <Color color="#b28a62" />
        <Color color="black" />
      </div>
      <div css={control.box}>
        <div css={control.size}>
          <div>Brush Size</div>
          <input type="range" value={brushSize} onChange={(e)=>setBrushSize(Number(e.target.value))}/>
        </div>
        <div css={control.button}>
          <div onClick={clear}>모두 지우기</div>
          <div onClick={undo}>되돌리기</div>
          <div onClick={()=>{setEditMap(false)}}>저장</div>
        </div>
      </div>
    </div>
  )
}


/* CSS */
const style = {
  box: css({
    height: "100%",
    padding: "30px 0",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  })
}
const colors = {
  box: css({
    width: "60vw",
    height: "25vw",
    '@media(min-width: 430px)': {
      width: "258px",
      height: "107.5px",
    },
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    justifyItems: "center",
    alignItems: "center",
  }),
  color: css({
    width: "10vw",
    height: "10vw",
    borderRadius: "10vw",
    '@media(min-width: 430px)': {
      width: "43px",
      height: "43px",
      borderRadius: "43px",
    },
    cursor: "pointer",
  }),
}
const control = {
  box: css({
    display: "flex",
    flexDirection: "column",
    padding: "20px",
  }),
  size: css({
    display: "flex",
    flexDirection: "column",
  }),
  button: css({
    display: "flex",
    gap: "10px",
    padding: "10px",
    cursor: "pointer",
    "div": {
      border: "1px solid var(--gray-100)",
      borderRadius: "5px",
      padding: "10px",
    }
  })
}

export default CanvasMapControl;