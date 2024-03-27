import Dots from "@/assets/@common/DotsThreeVertical.svg?react";
import { svgTheme } from "@/constants/ColorScheme";
import { css } from "@emotion/react";
import { KebabContext } from "@/pages/Record/RecordTrailDetailPage";
import { useContext } from "react";

const KebabIcon: React.FC = () => {
  const {openKebabMenu, setOpenKebabMenu} = useContext(KebabContext);

  const style = css({
    cursor: "pointer",
  })

  return (
    <Dots 
      css={[svgTheme.fill, style]}
      onClick={()=>{
        setOpenKebabMenu(!openKebabMenu);
      }}
    />
  )
}

export default KebabIcon;