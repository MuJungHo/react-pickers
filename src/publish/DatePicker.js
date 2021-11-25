import React from "react";

const DateCell = props => {
  const {
    date,
    selected,
    setSelected
  } = props;
  const isSelectedDate = selected.year === date.year && selected.month === date.month && selected.day === date.day;
  return /*#__PURE__*/React.createElement("div", {
    onClick: () => setSelected({
      year: date.year,
      month: date.month,
      day: date.day
    }),
    style: {
      width: '14%',
      backgroundColor: isSelectedDate ? '#bebebe' : '#ffffff'
    }
  }, date.day);
};

const DateTimePicker = () => {
  const dt = new Date();
  const [year, setYear] = React.useState(dt.getFullYear());
  const [month, setMonth] = React.useState(dt.getMonth());
  const [day, setDay] = React.useState(dt.getDate());
  const [selected, setSelected] = React.useState({
    year,
    month,
    day
  });
  const currMonthFirstDay = new Date(year, month, 1).getDay();
  const currMonthDays = new Date(year, month + 1, 0).getDate();
  const lastMonthDays = new Date(year, month, 0).getDate();
  const weekday = ['Sun', 'Mon', 'Tue', 'Wen', 'Thr', 'Fri', 'Sat'];
  const dates = [...Array(35).keys()].map(index => {
    if (index < currMonthFirstDay) {
      return {
        year,
        month: month === 0 ? 12 : month - 1,
        day: lastMonthDays - currMonthFirstDay + index + 1,
        date: `${year}/${month === 0 ? 12 : month}/${lastMonthDays - currMonthFirstDay + index + 1}`
      };
    } else if (index > currMonthDays + currMonthFirstDay - 1) {
      return {
        year,
        month: month + 2 === 13 ? 1 : month + 1,
        day: index - currMonthDays - currMonthFirstDay + 1,
        date: `${year}/${month + 2 === 13 ? 1 : month + 2}/${index - currMonthDays - currMonthFirstDay + 1}`
      };
    } else {
      return {
        year,
        month: month,
        day: index - currMonthFirstDay + 1,
        date: `${year}/${month + 1}/${index - currMonthFirstDay + 1}`
      };
    }
  });
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, "Date Picker"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 540,
      height: 360,
      border: '1px solid',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => setMonth(month - 1)
  }, "last"), /*#__PURE__*/React.createElement("div", null, `${selected.year}/${selected.month % 12 + 1}/${selected.day}`), /*#__PURE__*/React.createElement("div", {
    onClick: () => setMonth(month + 1)
  }, "next")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-around',
      padding: 10
    }
  }, weekday.map(day => /*#__PURE__*/React.createElement("div", {
    style: {
      width: '14%'
    },
    key: day
  }, day))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      flex: '1 1 auto',
      justifyContent: 'space-around',
      padding: 10
    }
  }, dates.map(date => /*#__PURE__*/React.createElement(DateCell, {
    key: date.date,
    date: date,
    selected: selected,
    setSelected: setSelected
  })))));
};

export default DateTimePicker;