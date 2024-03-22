import DetailHeader from "@/components/@common/DetailHeader";
import dots from "@/assets/@common/DotsThreeVertical.svg"  // 더보기
import { css } from "@emotion/react";
import '@/index.css';

export default function TestDetailPage() {
  const pageSetting = css({
    height: "100%",
  })

  // 조건? 그레이 : 블랙;
  const text = (condition: boolean) => css({
    color: condition===true?"var(--gray-100)":"var(--black)}",
  })
  const color = text(true);

  const pathName = window.location.pathname.split('/')[2];
  switch(pathName) {
    case "text":
      return(
        <div css={pageSetting}>
          <DetailHeader title={"테스트 상세페이지"} content={<div css={color}>완료</div>} />
        </div>
      )
    case "image":
      return(
        <div css={pageSetting}>
          <DetailHeader title={"테스트 상세페이지"} content={<img src={dots}></img>} />
        </div>
      )
    default:
      return(
        <div css={pageSetting}>
          <DetailHeader title={"테스트 상세페이지"}/>
        </div>
      )
  }
}