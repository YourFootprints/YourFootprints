import { css } from "@emotion/react";
import { SelectedRecord } from "@/components/Record/SelectedRecord";
// import RecordCalendar from "@/components/Record/RecordCalendar"
import TestCalendar from "@/components/Record/TestCalendar";
import { createContext, useState } from 'react'

interface CalendarContextType {
  clickDate: Date|null;
  setClickDate: React.Dispatch<React.SetStateAction<Date|null>>;
  trailDate: string[];
  viewYear: number;
  setViewYear: React.Dispatch<React.SetStateAction<number>>;
  viewMonth: number;
  setViewMonth: React.Dispatch<React.SetStateAction<number>>;
}

export const CalendarContext = createContext<CalendarContextType>({
  clickDate: null,
  setClickDate: () => {},
  trailDate: [],
  viewYear: new Date().getFullYear(), 
  setViewYear: () => {},
  viewMonth: new Date().getMonth(), 
  setViewMonth: () => {},
});

export default function RecordCalendarPage() {
  const [clickDate, setClickDate] = useState<Date|null>(null);
  const [viewYear, setViewYear] = useState<number>(new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState<number>(new Date().getMonth());

  // const [clickDate, setClickDate] = useState<Date>(new Date());
  // FIXME 클릭된 요일, 날짜 변수 따로 선언하는 것이 좋을까? API 연결할때 수정
  const strDay = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const trailDate = ['2024-03-03', '2024-03-13'];  // 산책한 날짜

  return (
    <CalendarContext.Provider value={{clickDate, setClickDate, trailDate, viewYear, setViewYear, viewMonth, setViewMonth}}>
      <TestCalendar />
      {/* <RecordCalendar /> */}

      {clickDate &&
        // 날짜 클릭시
        <div css={style.selected}>
          {/* [API] */}
          <SelectedRecord recordId={1} day={strDay[clickDate.getDay()]} date={clickDate.getDate()} name={"산책 기록 이름1"} runtime={"1:05:12"} distance={4.5} />
          <SelectedRecord recordId={2} day={strDay[clickDate.getDay()]} date={clickDate.getDate()} name={"산책 기록 이름2"} runtime={"33:20"} distance={2.1} />
          {/* FIXME : or 산책 기록이 없습니다. */}
        </div>
      }
      {/* <div>{`현재화면: ${viewYear}년 ${viewMonth}월`}</div> */}
    </CalendarContext.Provider>
  )
}

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


// [API] viewYear, viewMonth

// const records = {
//   "data": {
// 		  "trailsRecords" : [
// 				  {
// 				  "trailsId" : 1,
// 				  "day" : 12,
// 				  "trailsName" : "산책 기록 이름",
// 				  "runtime" : "1:05:12",
// 				  "distance" : 4.5
// 				  },
// 				 .
// 		  ],
//       }
//   "msg": "캘린더 기록 조회 성공"
// }

// records.data.trailsRecords.find(record => record.day === {clickDate.getDate()})