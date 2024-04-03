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
  backgroundColor: "var(--balck)",
  color: "var(--gray-100)",
  cursor: "pointer",
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
  handleClickSelect: (value: string) => void;
}

// select와 handleClickSelect은 해당 컴포넌트 외부에서 관리해주세요.
// const [select, setSelect] = useState(first);

// const handleClickSelect = (value: string) => {
//   setSelect(value);
// };
export default function UnderLineButton({
  first,
  second,
  select,
  handleClickSelect,
}: UnderLineButtonProps) {
  return (
    <div css={WrapperCss}>
      <div
        onClick={() => {
          // firstFn()
          handleClickSelect(first);
        }}
        css={[BoxCss, select === first && SlectCss]}
      >
        {first}
      </div>
      <div
        onClick={() => {
          // secondFn()
          handleClickSelect(second);
        }}
        css={[BoxCss, select === second && SlectCss]}
      >
        {second}
      </div>
    </div>
  );
}
