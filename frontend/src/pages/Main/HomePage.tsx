import { css } from "@emotion/react";

const style = css`
  color: hotpink;
`;
export default function HomePage() {
  return (
    <>
      <div css={style}>메인페이지에요</div>
      <div>메인을 고치면 pwa에는 반영이될까?</div>
      <div>메인페이지에요</div>
      <div>메인페이지에요</div>
    </>
  );
}
