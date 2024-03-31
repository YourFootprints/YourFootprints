import { css } from "@emotion/react";

const headerCss = css({
  width: "100%",
  height: "10%",
  borderRadius: "20px 20px 0 0",
  backgroundColor: "white",
  fontSize: "1.25rem",
  fontFamily: '"bold"',
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderBottom: "1px solid var(--gray-100)",
});

interface props {
  title: string;
}
export default function BottomSheetHeader({ title }: props) {
  return <div css={headerCss}>{title}</div>;
}
