import Dots from "@/assets/@common/DotsThreeVertical.svg?react"
import { svgTheme } from "@/constants/ColorScheme"

export const KebabMenu: React.FC = () => {
  return (
    <Dots 
      css={svgTheme.fill}
      onClick={()=>{
        // 수정, 공유
      }}
    />
  )
}