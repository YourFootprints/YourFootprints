import { css } from "@emotion/react";

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
  select: string;
  handliClickSelect: (value: string) => void;
  // firstFn: () => void;
  // secondFn: () => void;
}

// select와 handliClickSelect은 해당 컴포넌트 외부에서 관리해주세요.
// const [select, setSelect] = useState(first);

// const handliClickSelect = (value: string) => {
//   setSelect(value);
// };
export default function UnderLineButton({
  first,
  second,
  select,
  handliClickSelect,
}: UnderLineButtonProps) {
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
