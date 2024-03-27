import { css } from "@emotion/react";
import { backgroundTheme, svgTheme } from "@/constants/ColorScheme";
import { KebabContext } from "@/pages/Record/RecordTrailDetailPage";
import { useContext } from "react";
import Edit from "@/assets/Record/PencilSimpleLine.svg?react"
import Share from "@/assets/Record/ShareNetwork.svg?react"
import { useParams, useNavigate } from "react-router-dom";

interface MenuProps {
  icon: React.ReactNode;
  name: string;
  func: () => void;
}

export const Menu: React.FC<MenuProps> = ({icon, name, func}) => {
  const style = {
    box: css({
      flex: "1",
      display: "flex",
      cursor: "pointer",

      "*": {
        display: "flex",
        alignItems: "center",
      },
    }),

    icon: css(
      {
        flex: "1",
        justifyContent: "center",
      },
      svgTheme.stroke
    ), 
    name: css({
      flex: "2",
      justifyContent: "flex-end",
    })
  }

  return (
    <div css={style.box} onClick={func}>
      <div css={style.icon}>{icon}</div>
      <div css={style.name}>{name}</div>
    </div>
  )
}

export default function KebabMenu() {
  const navigate = useNavigate();
  const {id: recordId} = useParams();
  const {openKebabMenu, setOpenKebabMenu, setShowModal} = useContext(KebabContext);

  const style = {
    box: css({
      position: "sticky",
      width: "100%",
      height: "0",
      zIndex: "15",
      top: "60px",  // 헤더높이가 60px 고정값이라서
    }),

    menu: css(
      {
        width: "95px",
        height: "95px",
        zIndex: "25",
        borderRadius: "5px",
        position: "sticky",
        marginTop: "-12px",  // 헤더높이가 60px 고정값이라서
        marginRight: "6.5%",
        padding: "16px 18px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      },
      backgroundTheme.custom
    ),

    bg: css({
      width: "100%",
      height: "100vh",
      // background: "rgb(0, 0, 0, 0.2)",
      zIndex: "20",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "flex-start",
    })
  }
  
  return (
    <div css={style.box}>
      <div css={style.bg} onClick={(e)=>{
        if (e.currentTarget === e.target) {
          setOpenKebabMenu(!openKebabMenu)
        }}}>
        <div css={style.menu}>
          <Menu icon={<Edit/>} name={"수정"} func={()=>navigate(`/record/edit/${recordId}`)}/>
          <Menu icon={<Share/>} name={"공유"} func={()=>{setShowModal(true); setOpenKebabMenu(false)}}/>  {/* FIXME 공유 모달창 보여주기 */}
        </div>
      </div>
    </div>
  )
}