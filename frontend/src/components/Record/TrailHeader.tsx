import '@/index.css';
import { css } from "@emotion/react";

interface TrailHeaderProps {
  title: string;
  date: string;
  isPublic: boolean;
}

export const TrailHeader: React.FC<TrailHeaderProps> = ({title, date, isPublic}) => {
  const style = {
    box: css({
      width: "100%",
      height: "70px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxSizing: "border-box",
      padding: "0 3.5%",
    }),
  
    left: css({
      maxWidth: "80%",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textAlign: "left",
  
      // 산책로 이름
      "div" : {
        fontSize: "4vw",
        overflow: "hidden",
        textOverflow: "ellipsis",
        '@media(min-width: 430px)': {
          fontSize: "18px",
        },
      },
      
      // 날짜
      "span" : {
        color: "var(--gray-200)",
        fontSize: "2.8vw",
        '@media(min-width: 430px)': {
          fontSize: "12px",
        },
      },
    }),

    toggle: css({
      minWidth: "17.5%",
    })
  }

  return(
    <div css={style.box}>
      <div css={style.left}>
        <div>{title}</div>
        <span>{date}</span>
      </div>
      <div css={style.toggle}>{isPublic?"공개":"비공개"}</div>
    </div>
  )
}