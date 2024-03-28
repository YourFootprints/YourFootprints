import { css } from "@emotion/react";
import StarIcon from "@mui/icons-material/Star";

interface TrailInfoProps {
  name: string;
  value: string|number;
  isStar?: boolean;
}

const TrailInfo: React.FC<TrailInfoProps> = ({name, value, isStar}) => {
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

  if (isStar) {
    return (
      <div css={ItemCss}>
        <p css={[BigCss, StarBoxCss]}>
          <StarIcon css={StarCss} />
          {value}
        </p>
        <p css={SmallCss}>{name}</p>
      </div>
    )
  } else {
    return (
      <div css={ItemCss}>
        <p css={BigCss}>{value}</p>
        <p css={SmallCss}>{name}</p>
      </div>
    )
  }
}

export default TrailInfo;