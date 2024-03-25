import { css } from "@emotion/react";
import { SelectedRecord } from "@/components/Record/SelectedRecord";
// import RecordCalendar from "@/components/Record/RecordCalendar"
import TestCalendar from "@/components/Record/TestCalendar";
import { createContext, useState } from 'react'

// type CalendarContextType = {
//   clickDate: Date
//   setClickDate: React.Dispatch<React.SetStateAction<Date>>
// }

// const CalendarContext: CalendarContextType = {
//   clickDate: new Date(),
//   setClickDate: () => {}
// }

// export const CalendarProviderContext = createContext<CalendarContextType>(CalendarContext);

interface CalendarContextType {
  clickDate: Date;
  setClickDate: React.Dispatch<React.SetStateAction<Date>>;
}

export const CalendarContext = createContext<CalendarContextType>({
  clickDate: new Date(),
  setClickDate: () => {}
});

export default function RecordCalendarPage() {
  const [clickDate, setClickDate] = useState<Date>(new Date());
  // FIXME 클릭된 요일, 날짜 변수 따로 선언하는 것이 좋을까? API 연결할때 수정
  const strDay = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

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
    <CalendarContext.Provider value={{clickDate, setClickDate}}>
      <TestCalendar />
      {/* <RecordCalendar /> */}
      <div css={style.selected}>
        {/* [API] */}
        <SelectedRecord recordId={1} day={strDay[clickDate.getDay()]} date={clickDate.getDate()} name={"산책 기록 이름1"} runtime={"1:05:12"} distance={4.5} />
        <SelectedRecord recordId={2} day={strDay[clickDate.getDay()]} date={clickDate.getDate()} name={"산책 기록 이름2"} runtime={"33:20"} distance={2.1} />
        {/* FIXME : or 산책 기록이 없습니다. */}
      </div>
    </CalendarContext.Provider>
  )
}