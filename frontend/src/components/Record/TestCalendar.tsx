import { css } from '@emotion/react';
import './RecordCalendar.css'
import dayjs from 'dayjs';
import Calendar from 'react-calendar';
import { useContext } from 'react';
import { CalendarContext } from '@/pages/Record/RecordCalendarPage';

const TestCalendar = () => {
  const {clickDate, setClickDate} = useContext(CalendarContext);
  console.log(clickDate)

  // [API]
  const trailDate = ['2024-03-03', '2024-03-13'];  // 산책한 날짜

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

  return (
    <div css={style}>
      <Calendar
        // formatDay={(locale, date) => dayjs(date).format('D')}
        // formatYear={(locale, date) => dayjs(date).format('YYYY')}
        // formatMonthYear={(locale, date) => dayjs(date).format('YYYY. MM')}
        calendarType="gregory"  // 일월화수목금토 순서
        showNeighboringMonth={false}  // 이전달 월말, 다음달 월초 날짜 보여주기 x
        next2Label={null}  // 연도 (앞으로) 이동 x
        prev2Label={null}  // 연도 (뒤로  ) 이동 x
        onClickDay={(value) => {setClickDate(value)}}
        locale="en-US"
        minDetail="year"

        tileContent={({ date }) => {
          // FIXME const vs let
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

export default TestCalendar;
