import { css } from "@emotion/react";
import { useState } from "react";

const WrapperCss = css`
  width: 100%;
  height: 60px;
  font-size: 1.125rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const BoxCss = css`
  width: 50%;
  line-height: 60px;
  font-family: "bold";
  background-color: white;
  color: var(--gray-100);
`;

const SlectCss = css`
  border-bottom: 2px solid;
  color: var(--text);
  font-family: exBold;
`;

interface UnderLineButtonProps {
  first: string;
  second: string;
  // firstFn: () => void;
  // secondFn: () => void;
}
export default function UnderLineButton({
  first,
  second,
  // firstFn,
  // secondFn,
}: UnderLineButtonProps) {
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
