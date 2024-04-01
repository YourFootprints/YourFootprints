import "@/index.css";
import { css } from "@emotion/react";
import { backgroundTheme } from "@/constants/ColorScheme";
import { useContext } from "react";
import { KebabContext } from "@/store/Record/Kebab";
import testImg from "@/assets/image/testmap.png";

export default function ShareModal() {
  const {showModal, setShowModal} = useContext(KebabContext);

  const style = {
    container: css({
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }),
    bg: css({
      position: "fixed",
      overflow: "hidden",
      background: "rgb(0, 0, 0, 0.2)",
      width: "100vw",
      height: "100vh",
      top: "0",
      zIndex: "15",
      "@media(min-width: 430px)": {
        width: "430px",
      }
    }),
    box: css(
      {
        position: "fixed",
        width: "90vw",
        height: "60vh",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        boxShadow: "0px 0px 4px 0px rgb(136, 136, 136, 0.8)",
        borderRadius: "10px",
        padding: "5vw",
        boxSizing: "border-box",
        zIndex: "25",
        // display: "flex",
        // flexDirection: "column",
        "@media(min-width: 430px)": {
          width: "386px",
          padding: "21.5px",
        },

        "img": {
          width: "60vw",
          height: "40vh",
          borderRadius: "5px",
          objectFit: "cover",
          "@media(min-width: 430px)": {
            width: "257px",
          },
        }
      }, 
      backgroundTheme.custom,
    ),
  }

  return (
    <div css={style.container}>
      <div css={style.bg} onClick={(e)=>{
        if (e.currentTarget === e.target) {
          setShowModal(!showModal)
        }}}>
        <div css={style.box}>
          <div>공유하기 (임시화면)</div>
          <hr/>
          <img src={testImg} />
          <hr/>
          <button>카카오 로고</button>
          <button onClick={(e)=>{e.preventDefault; setShowModal(false)}}>닫기</button>
        </div>
      </div>
    </div>
  )
}