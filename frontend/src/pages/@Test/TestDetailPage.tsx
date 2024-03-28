import DetailHeader from "@/components/@common/DetailHeader";
import Dots from "@/assets/@common/DotsThreeVertical.svg?react"  // 더보기
import { svgTheme } from "@/constants/ColorScheme";
import { css } from "@emotion/react";
import '@/index.css';

export default function TestDetailPage() {
  const pageSetting = css({
    height: "100%",
  })

  // 조건? 그레이 : 블랙;
  const text = (condition: boolean) => css({
    '@media(prefers-color-scheme: light)': {
      color: condition===true?"var(--gray-100)":"var(--black)}",
    },
    '@media(prefers-color-scheme: dark)': {
      color: condition===true?"var(--gray-100)":"var(--white)}",
    },
  })
  const color = text(true);

  const pathName = window.location.pathname.split('/')[2];
  switch(pathName) {
    case "text":
      return(
        <div css={pageSetting}>
          <DetailHeader title={"테스트 상세페이지"} backURL={""} content={<div css={color}>완료</div>} />
        </div>
      )
    case "image":
      return(
        <div css={pageSetting}>
          <DetailHeader title={"테스트 상세페이지"} backURL={""} content={<Dots css={svgTheme.fill}/>} />
        </div>
      )
    default:
      return(
        <div css={pageSetting}>
          <DetailHeader title={"테스트 상세페이지"} backURL={""} />
        </div>
      )
  }
}