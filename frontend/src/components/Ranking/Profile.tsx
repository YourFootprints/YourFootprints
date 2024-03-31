import { css } from "@emotion/react";

interface ProfileProps {
  size: string;     // width, height
  mxSize: string;   // 430px 일때, width, height
  img: string;      // img 주소
  bg: string;       // 배경 색 -> "rgba(146, 146, 146, 0.4)" 
  shadow: string;   // 배경 그림자 -> "0px 0px 4px 0px rgba(0, 0, 0, 0.2)"
}

const Profile: React.FC<ProfileProps> = ({size, mxSize, img, bg, shadow}) => {
  const style = {
    border: css({
      width: size,
      height: size,
      background: bg,
      boxShadow: shadow,
      borderRadius: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",

      '@media(min-width: 430px)': {
        width: mxSize, 
        height: mxSize,
      }
    }),
    img: css({
      width: "90%",
      height: "90%",
      backgroundImage: img,
      borderRadius: "100%",
      objectFit: "cover",
    })
  }
  return (
    <div css={style.border}>
      <img css={style.img} src={img} />
    </div>
  )
}

export default Profile;