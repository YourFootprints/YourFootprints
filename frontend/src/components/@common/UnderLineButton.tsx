import { css } from "@emotion/react";
import { useState } from "react";

const WrapperCss = css({
  width: "100%",
  height: "60px",
  fontSize: "1.125rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const BoxCss = css({
  width: "50%",
  lineHeight: "60px",
  fontFamily: '"bold"',
  backgroundColor: "white",
  color: "var(--gray-100)",
});

const SlectCss = css({
  borderBottom: "2px solid",
  color: "var(--text)",
  fontFamily: "exBold",
});

interface UnderLineButtonProps {
  first: string;
  second: string;
  // firstFn: () => void;
  // secondFn: () => void;
}
export default function UnderLineButton({
  first,
  second,
}: // firstFn,
// secondFn,
UnderLineButtonProps) {
  const [select, setSelect] = useState(first);

  const handliClickSelect = (value: string) => {
    setSelect(value);
  };
  return (
    <div css={WrapperCss}>
      <div
        onClick={() => {
          // firstFn()
          handliClickSelect(first);
        }}
        css={[BoxCss, select === first && SlectCss]}
      >
        {first}
      </div>
      <div
        onClick={() => {
          // secondFn()
          handliClickSelect(second);
        }}
        css={[BoxCss, select === second && SlectCss]}
      >
        {second}
      </div>
    </div>
  );
}
