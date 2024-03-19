import { css } from "@emotion/react";

const style = css`
  color: hotpink;
`;
export default function HomePage() {
  return (
    <>
      <div css={style}>메인페이지에요</div>
      <div>메인페이지에요</div>
      <div>메인페이지에요</div>
      <div>메인페이지에요</div>
    </>
  );
}
