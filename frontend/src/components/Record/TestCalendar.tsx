import { css } from '@emotion/react';
import './RecordCalendar.css'
import dayjs from 'dayjs';
import Calendar from 'react-calendar';
import { useContext } from 'react';
import { CalendarContext } from '@/pages/Record/RecordCalendarPage';

const TestCalendar = () => {
  const {
    // clickDate, 
    setClickDate, 
    trailDate, 
    // viewYear, 
    setViewYear, 
    // viewMonth, 
    setViewMonth,
  } = useContext(CalendarContext);
  // console.log(dayjs(clickDate).format('YYYY-MM-DD') == '2024-03-03')  // FIXME

  const changeViewDate = ({activeStartDate}:{activeStartDate: Date|null}) => {
    activeStartDate && setViewYear(activeStartDate?.getFullYear());
    activeStartDate && setViewMonth(activeStartDate?.getMonth()+1);
  }

  return (
    <div css={style}>
      <Calendar
        formatDay={(_locale, date) => dayjs(date).format('D')}
        formatYear={(_locale, date) => dayjs(date).format('YYYY')}
        formatMonthYear={(_locale, date) => dayjs(date).format('YYYY. MM')}
        calendarType="gregory"        // 일월화수목금토 순서
        showNeighboringMonth={false}  // 이전달 월말, 다음달 월초 날짜 보여주기 x
        next2Label={null}             // 연도 (앞으로) 이동 x
        prev2Label={null}             // 연도 (뒤로  ) 이동 x
        onClickDay={(value) => {setClickDate(value)}}
        locale="en-US"
        minDetail="month"
        maxDetail="month"
        onActiveStartDateChange={changeViewDate}
        // onActiveStartDateChange={(e)=>{e.activeStartDate}}

        tileContent={({ date }) => {
          // FIXME const vs let
          // eslint-disable-next-line prefer-const
          let html: JSX.Element[] = [];
          if (trailDate.find(x => x === dayjs(date).format('YYYY-MM-DD'))) {
            html.push(<div key={dayjs(date).format('YYYY-MM-DD')} className='react-calendar__tile--hasActive' />);
          }
          return html;
        }}
      />
    </div>
  );
};

const style = css`
width: 100%;
min-height: 105vw;
display: flex;
justify-content: center;
position: relative;
@media(min-width: 430px) {
  min-height: 451.5px;
};
`

export default TestCalendar;
