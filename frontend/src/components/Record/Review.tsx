import { css } from "@emotion/react"

interface ReviewProps {
  title: string;
  content: React.ReactNode;
}

export const Review: React.FC<ReviewProps> = ({title, content}) => {
  const style = {
    box: css({
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "2.2vw",
      '@media(min-width: 430px)': {
        gap: "10px",
      },
    }),
    
    title: css({
      fontSize: "4.2vw",
      '@media(min-width: 430px)': {
        fontSize: "18px",
      },
    }),
    
  }

  return (
    <div css={style.box}>
      <div css={style.title}>{title}</div>
      {content}
    </div>
  )
}
