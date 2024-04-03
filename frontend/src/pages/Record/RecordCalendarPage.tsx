import { css } from "@emotion/react";
import { SelectedRecord } from "@/components/Record/SelectedRecord";
import RecordCalendar from "@/components/Record/RecordCalendar"
import { createContext, useEffect, useState } from 'react'
import { getRecordDate } from "@/services/Record";
import { RecordDateType } from "@/store/Record/RecordDate";

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
  viewMonth: new Date().getMonth()+1, 
  setViewMonth: () => {},
});

export default function RecordCalendarPage() {
  const [clickDate, setClickDate] = useState<Date|null>(null);
  const [viewYear, setViewYear] = useState<number>(new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState<number>(new Date().getMonth()+1);

  const strDay = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  
  const [trailDate, setTrailDate] = useState<string[]>([]);  // 산책한 날짜
  const [recordDate, setRecordDate] = useState<RecordDateType[]>([]);
  
  async function fetchRecordDate() {
    try {
      const recordDateData = await getRecordDate(viewYear, viewMonth);
      setRecordDate(recordDateData);
      setTrailDate(recordDateData.map((trail: { day: number; }) => `${viewYear}-${viewMonth}-${trail.day}`));
      console.log(recordDateData);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchRecordDate();
    setClickDate(null);
  }, [viewMonth])

  return (
    <CalendarContext.Provider value={{clickDate, setClickDate, trailDate, viewYear, setViewYear, viewMonth, setViewMonth}}>
      <RecordCalendar />

      {clickDate &&
        // 날짜 클릭시
        <div css={style.selected}>
          {recordDate
            .filter(record => record.day === clickDate.getDate())
            .length > 0 ? 
            (
              recordDate
              .filter(record => record.day === clickDate.getDate())
              .map(record => 
                <SelectedRecord 
                  recordId={record.trailsId} 
                  day={strDay[clickDate.getDay()]} 
                  date={clickDate.getDate()} 
                  name={record.trailsName} 
                  runtime={record.runtime} 
                  distance={record.distance} 
                />
              )
            )
            :
            <div css={style.noRecord}>산책 기록이 없습니다</div>
          }
        </div>
      }
    </CalendarContext.Provider>
  )
}

const style = {
  selected: css({
    display: "flex",
    flexDirection: "column",
    marginBottom: "1rem",
    gap: "3.5vw",
    '@media(min-width: 430px)': {
      gap: "15px",
    }
  }),
  noRecord: css({
    marginTop: "2.4vw",
    color: "var(--gray-200)",
    fontSize: "3.2vw",
    '@media(min-width: 430px)': {
      marginTop: "10px",
      fontSize: "14px",
    }
  })
}