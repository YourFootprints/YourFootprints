import { css } from "@emotion/react";
import StarIcon from "@mui/icons-material/Star";

const Wrapper = css`
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const ItemCss = css`
  width: 86px;
  height: 97px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BigCss = css`
  margin: 0;
  font-size: 20px;
  font-family: exBold;
  min-height: 30px;
  line-height: 30px;
`;
const SmallCss = css`
  margin: 0;
  font-size: 12px;
  color: var(--gray-200);
`;

const StarCss = css`
  fill: #eae33c;
  width: 20px;
  line-height: 20px;
`;

const StarBoxCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
`;
export default function FootInfo({ isStar }) {
  return (
    <div css={Wrapper}>
      <div css={ItemCss}>
        <p css={BigCss}>1:05:15</p>
        <p css={SmallCss}>시간</p>
      </div>
      <div css={ItemCss}>
        <p css={BigCss}>4.2</p>
        <p css={SmallCss}>거리(km)</p>
      </div>
      <div css={ItemCss}>
        <p css={BigCss}>구봉동</p>
        <p css={SmallCss}>서울시 개로구</p>
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
