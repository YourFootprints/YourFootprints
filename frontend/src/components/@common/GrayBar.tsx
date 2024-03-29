import "@/index.css";
import { css } from "@emotion/react";
import { backgroundTheme } from "@/constants/ColorScheme";

export default function GrayBar() {
  const style = css(
    {
      width: "100%",
      height: "2.3vw",
      marginBottom: "5.8vw",
      '@media(min-width: 430px)': {
        height: "10px",
        marginBottom: "25px",
      },
    },
    backgroundTheme.custom,
  )

  return (
    <div css={style} />
  )
}