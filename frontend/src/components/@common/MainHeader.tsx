import { css } from "@emotion/react";
import '@/index.css';

/*

// [REMOVE]
title에 (하단)탭 제목 작성해주세요
<MainHeader title={"테스트 페이지"} />

*/

interface MainHeaderProps {
  title: string;
}

const MainHeader: React.FC<MainHeaderProps> = ({ title }) => {
  const style = css({
    width: "100%",
    height: "60px",
    fontSize: "20px",  // 높이와 글자크기는 고정
    borderBottom: "1px solid var(--gray-100)",
    background: "white",
    lineHeight: "60px",
    top: "0",
    position: "sticky",
    zIndex: "10",
  })


  return (
    <div css={style}>{title}</div>
  )
}
export default MainHeader;