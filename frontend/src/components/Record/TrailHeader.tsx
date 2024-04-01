import '@/index.css';
import { css } from "@emotion/react";
import PublicToggle from "@/components/Record/PublicToggle";
import { backgroundTheme } from '@/constants/ColorScheme';
import { RecordDetailType } from '@/store/Record/RecordDetail';

interface TrailHeaderProps {
  id?: string;
  record: RecordDetailType;
}

export const TrailHeader: React.FC<TrailHeaderProps> = ({id, record}) => {
  return(
    <div css={style.box}>
      <div css={style.left}>
        <div>{record.trailsName}</div>
        <span>{record.createdAt}</span>
      </div>
      {id && <PublicToggle id={id} isPublic={record.public} />}
    </div>
  )
}

const style = {
  box: css(
    {
      width: "100%",
      height: "70px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxSizing: "border-box",
      padding: "0 3.5%",
    },
    backgroundTheme.basic
  ),

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