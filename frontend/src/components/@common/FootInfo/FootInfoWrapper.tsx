import { css, SerializedStyles } from "@emotion/react"

const defaultWrapper = {
  width: "100%",
  height: "95px",
  backgroundColor: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
};
interface props {
  children : any,
  wrapperCss?: SerializedStyles;
}
export default function FootInfoWrapper ({children, wrapperCss = css(defaultWrapper)}:props) {
  return (
    <div css={wrapperCss}>
      {children}
    </div>
  )
}