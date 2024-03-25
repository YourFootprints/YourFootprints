import '@/index.css';
import { css } from "@emotion/react";
import { backgroundTheme } from "@/constants/ColorScheme";
import Detail from "@/assets/@common/CaretRight.svg?react";
import { useNavigate } from 'react-router-dom';

interface SelectedRecordProps {
  recordId: number;
  day: string;
  date: number;
  name: string;
  distance: number;
  runtime: string;
}

export const SelectedRecord: React.FC<SelectedRecordProps> = ({recordId, day, date, name, distance, runtime}) => {
  const navigate = useNavigate();

  const style = {
    // 전체 박스
    box: css(
      {
        width: "88%",
        height: "18.6vw",
        margin: "0 6vw",
        position: "relative",
        cursor: "pointer",
        background: "var(--gray-50)",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        boxSizing: "border-box",
        gap: "6vw",
        padding: "0 5.8vw",
        '@media(min-width: 430px)': {
          padding: "0 25px",
          gap: "26px",
          height: "80px",
          margin: "0 26px",
        }
      },
      backgroundTheme.custom,
    ),

    // 수직선
    bar: css({
      height: "7vw",
      border: "1px solid var(--black)",
      '@media(min-width: 430px)': {
        height: "30px",
      },
      '@media (prefers-color-scheme: dark)': {
        border: "1px solid var(--white)",
      }
    }),

    // 더보기 버튼 ( > )
    detail: css({
      paddingLeft: "auto",
    })
  }

  const dateCss = {
    box: css({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minWidth: "8%",
    }),

    day: css({
      fontSize: "2.8vw",
      '@media(min-width: 430px)': {
        fontSize: "12px",
      }
    }),

    date: css({
      fontSize: "5.6vw",
      '@media(min-width: 430px)': {
        fontSize: "24px",
      }
    }),
  }
  
  const record = {
    box: css({
      // background: "green",

      whiteSpace: "nowrap",
      overflow: "hidden",

      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "0.7vw",
      '@media(min-width: 430px)': {
        gap: "3px",
      }
    }),

    name: css({
      maxWidth: "100%",
      
      overflow: "hidden",
      textOverflow: "ellipsis",

      fontSize: "3.7vw",
      fontFamily: "bold",
      '@media(min-width: 430px)': {
        fontSize: "16px",
      }
    }),

    info: css({
      display: "flex",
      fontSize: "3.2vw",
      gap: "1.2vw",
      '@media(min-width: 430px)': {
        fontSize: "14px",
        gap: "5px",
      },

      "*" : {
        color: "var(--gray-200)",
      },
    }),
  }

  return (
    <div css={style.box} onClick={()=>{navigate(`/record/${recordId}`)}}>
      <div css={dateCss.box}>
        <div css={dateCss.day}>{day}</div>
        <div css={dateCss.date}>{date}</div>
      </div>
      <div css={style.bar}></div>
      <div css={record.box}>
        <div css={record.name}>{name}</div>
        <div css={record.info}>
          <div>{runtime}</div>
          <div>·</div>
          <div>{distance} km</div>
        </div>
      </div>
      <Detail css={style.detail} />
    </div>
  )
}