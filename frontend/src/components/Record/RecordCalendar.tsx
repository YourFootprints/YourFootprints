import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// import moment from 'moment';
import { css } from '@emotion/react';
import './RecordCalendar.css'
import dayjs from "dayjs";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

function RecordCalendar() {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div css={style.box}>
      <Calendar 
        css={calendar} 
        formatDay={(locale, date) => dayjs(date).format("D")}
        onChange={onChange} 
        // locale="en-US"
        value={value} 
      />
      {/* {moment(value).format("YYYY년 MM월 DD일")} */}
    </div>
  );
}

const style = {
  box: css({
    // width: "88%",
    margin: "4.6vw 6vw 6.5vw 6vw",
    cursor: "pointer",
    borderRadius: "10px",
    boxSizing: "border-box",
    '@media(min-width: 430px)': {
      margin: "20px 26px 28px 26px",
    }
  })
}

const calendar = css({
  width: "100%",
  // '.react-calendar': {
  //   border: 'none',
  // }
})

// const calendar = css`
//   width: 100%;

//   .react-calendar {
//     border: none;
//   }
// `

export default RecordCalendar;