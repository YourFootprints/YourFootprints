import { css } from "@emotion/react";
import { SelectedRecord } from "@/components/Record/SelectedRecord";

export default function RecordCalendarPage() {
  const style = {
    selected: css({
      display: "flex",
      flexDirection: "column",
      gap: "3.5vw",
      '@media(min-width: 430px)': {
        gap: "15px",
      }
    })
  }
  
  return (
    <div>
      <div css={style.selected}>
        <SelectedRecord recordId={1} day={"TUE"} date={12} name={"산책 기록 이름1"} runtime={"1:05:12"} distance={4.5} />
        <SelectedRecord recordId={2} day={"TUE"} date={12} name={"산책 기록 이름2"} runtime={"33:20"} distance={2.1} />
      </div>
    </div>
  )
}