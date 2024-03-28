import { css } from "@emotion/react";

const ItemCss = css({
  width: "86px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const BigCss = css({
  margin: "0",
  fontSize: "20px",
  fontFamily: "exBold",
  minHeight: "30px",
  lineHeight: "30px",
});

const SmallCss = css({
  margin: "0",
  fontSize: "12px",
  color: "var(--gray-200)",
});

interface props {
  title: string;
  value: string;
}
export default function FootInfoItem({ title, value }: props) {
  return (
    <div css={ItemCss}>
      <p css={BigCss}>{value}</p>
      <p css={SmallCss}>{title}</p>
    </div>
  );
}
