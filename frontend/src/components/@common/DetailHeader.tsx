import { useNavigate } from "react-router-dom";
import '@/index.css';
import { css } from "@emotion/react";
import { svgTheme, backgroundTheme } from "@/constants/ColorScheme";
import Back from "@/assets/@common/ArrowLeft.svg?react"  // 뒤로가기
/*

// [REMOVE]
- [필수] title에 (상세 페이지)제목 작성해주세요
- [선택] content에 헤더 오른쪽에 들어갈 html 태그 작성해주세요 (없는 경우만 작성 X)

<DetailHeader title={"테스트 상세페이지"} content={<div>"완료"</div>} />
<DetailHeader title={"테스트 상세페이지"} content={<img src={}></img>} />
<DetailHeader title={"테스트 상세페이지"} />

*/

interface DetailHeaderProps {
  title: string;
  content?: React.ReactNode;
}

const DetailHeader: React.FC<DetailHeaderProps> = ({ title, content }) => {
  const navigate = useNavigate();

  const box = css(
    {
      width: "100%",
      height: "60px",
      fontSize: "20px",  // 높이와 글자크기는 고정
      borderBottom: "1px solid var(--gray-100)",
      top: "0",
      position: "sticky",
      zIndex: "10",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      textAlign: "center",
      lineHeight: "60px",
      boxSizing: "border-box",
      padding: "0 3.5%",
    },
    backgroundTheme.basic
  )

  const item = {
    left: css({
      flex:"1",
      display:"flex",
      cursor: "pointer",
    }),
    center: css({
      flex:"3",
    }),
    right: css({
      flex:"1",
      display:"flex",
      justifyContent: "flex-end",
      fontSize: "16px",
    }),
  }

  return (
    <div css={box}>
      <div css={item.left}><Back css={svgTheme.stroke} onClick={()=>{navigate(-1)}}/></div>
      <div css={item.center}><span>{title}</span></div>
      <div css={item.right}>{content}</div>
    </div>
  )
}
export default DetailHeader;