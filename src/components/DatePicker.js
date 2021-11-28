import React from "react";
const DateCell = props => {
  const { date, selected, setSelected, onChange } = props
  const [isHover, setHover] = React.useState(false)
  const isSelectedDate = selected.year === date.year && selected.month === date.month && selected.day === date.day
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => {
        setSelected({
          year: date.year,
          month: date.month,
          day: date.day,
        })
        onChange(new Date(date.year, date.month, date.day))
      }}
      style={{
        width: 50,
        height: 50,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isSelectedDate || isHover ? 'cyan' : '#ffffff',
      }}>
      {date.day}
    </div>
  );
}
const DateTimePicker = ({ value, onChange }) => {

  const dt = value || new Date()
  const [year, setYear] = React.useState(dt.getFullYear())
  const [month, setMonth] = React.useState(dt.getMonth())
  const [day, setDay] = React.useState(dt.getDate())
  const [selected, setSelected] = React.useState({
    year, month, day
  })
  const currMonthFirstDay = new Date(year, month, 1).getDay()
  const currMonthDays = new Date(year, (month + 1), 0).getDate()
  const lastMonthDays = new Date(year, month, 0).getDate()
  const weekday = ['Sun', 'Mon', 'Tue', 'Wen', 'Thr', 'Fri', 'Sat']

  const dates = [...Array(35).keys()].map(index => {
    if (index < currMonthFirstDay) {
      return {
        year,
        month: month === 0 ? 12 : month - 1,
        day: lastMonthDays - currMonthFirstDay + index + 1,
        date: `${year}/${month === 0 ? 12 : month}/${lastMonthDays - currMonthFirstDay + index + 1}`
      }
    } else if (index > (currMonthDays + currMonthFirstDay - 1)) {
      return {
        year,
        month: (month + 2) === 13 ? 1 : (month + 1),
        day: index - currMonthDays - currMonthFirstDay + 1,
        date: `${year}/${(month + 2) === 13 ? 1 : (month + 2)}/${index - currMonthDays - currMonthFirstDay + 1}`
      }
    } else {
      return {
        year,
        month: month,
        day: index - currMonthFirstDay + 1,
        date: `${year}/${(month + 1)}/${index - currMonthFirstDay + 1}`
      }
    }
  })
  return (
    <div>
      <p>Date Picker</p>
      <div style={{
        width: 400,
        height: 360,
        border: '1px solid',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: 10 }}>
          <div onClick={() => setMonth(month - 1)}>last</div>
          <div>{`${selected.year}/${selected.month % 12 + 1}/${selected.day}`}</div>
          <div onClick={() => setMonth(month + 1)}>next</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around', padding: 10 }}>
          {
            weekday.map(day => <div style={{ width: '14%', textAlign: 'center' }} key={day}>{day}</div>)
          }
        </div>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          flex: '1 1 auto', justifyContent: 'space-around',
          padding: 10
        }}>
          {
            dates.map(date => <DateCell
              key={date.date}
              date={date}
              selected={selected}
              setSelected={setSelected}
              onChange={onChange}
            />)
          }
        </div>
      </div>
    </div>
  );
};

export default DateTimePicker;
