import { css, SerializedStyles } from "@emotion/react";
import StarIcon from "@mui/icons-material/Star";

const defaultWrapper = {
  width: "100%",
  height: "95px",
  backgroundColor: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
};

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

const StarCss = css({
  fill: "#eae33c",
  width: "20px",
  lineHeight: "20px",
});

const StarBoxCss = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "2px",
});

interface FootInfoProps {
  first: string;
  second: string;
  third: string;
  isStar: boolean;
  wrapperCss?: SerializedStyles;
}
export default function FootInfo({
  first,
  second,
  third,
  isStar,
  wrapperCss = css(defaultWrapper),
}: FootInfoProps) {
  return (
    <div css={wrapperCss}>
      <div css={ItemCss}>
        <p css={BigCss}>1:05:15</p>
        <p css={SmallCss}>{first}</p>
      </div>
      <div css={ItemCss}>
        <p css={BigCss}>4.2</p>
        <p css={SmallCss}>{second}</p>
      </div>
      <div css={ItemCss}>
        <p css={BigCss}>구봉동</p>
        <p css={SmallCss}>{third}</p>
      </div>
      {isStar && (
        <div css={ItemCss}>
          <p css={[BigCss, StarBoxCss]}>
            <StarIcon css={StarCss} />
            4.0
          </p>
          <p css={SmallCss}>별점</p>
        </div>
      )}
    </div>
  );
}
