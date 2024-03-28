import { css } from "@emotion/react"

export default function GrayBar() {
  const style = css({
    width: "100%",
    height: "2.3vw",
    marginBottom: "5.8vw",
    background: "var(--gray-50)",
    '@media(min-width: 430px)': {
      height: "10px",
      marginBottom: "25px",
    },
  })

  return (
    <div css={style} />
  )
}