import React from 'react'
const Pointer = ({ point, value, setValue, d, isHour }) => {
  const isSelected = point.value === value
  const [isHover, setHover] = React.useState(false)
  return (
    <>
      <circle
        onClick={() => setValue(isHour ? point.value : point.value * 5)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        cx={point.x}
        cy={point.y}
        r={20}
        fill={isHover || isSelected ? "#fff" : "#f5f5f5"}
      />
      <text
        onClick={() => setValue(isHour ? point.value : point.value * 5)}
        onMouseEnter={() => setHover(true)}
        x={
          isHour ?
            point.value > 9
              ? point.x - 9
              : point.x - 5
            :
            point.value > 1
              ? point.x - 9
              : point.x - 5
        }
        y={point.y + 5}
        stroke={"#000"}>
        {
          isHour
            ? point.value === 0 ? 12 : point.value
            : point.value * 5
        }
      </text>
    </>
  )
}
const TimePicker = () => {
  const dt = new Date();
  const [hour, setHour] = React.useState(dt.getHours() % 12)
  const [minute, setMinute] = React.useState(dt.getMinutes())
  const [isPickHour, setPickHour] = React.useState(true)
  const [isAM, setAM] = React.useState(dt.getHours() < 12)
  const d = 200
  const points = [...Array(12).keys()].map(index => {
    var hudu = (2 * Math.PI / 360) * 30 * index;
    var x = 200 + Math.sin(hudu) * 150;
    var y = 200 - Math.cos(hudu) * 150;
    var hx = 200 + Math.sin(hudu) * 100;
    var hy = 200 - Math.cos(hudu) * 100;
    var mx = 200 + Math.sin(hudu) * 120;
    var my = 200 - Math.cos(hudu) * 120;
    return ({
      value: index,
      x,
      y,
      hx,
      hy,
      mx,
      my
    })
  })
  return (
    <div style={{ width: 540 }}>
      <p>Time Picker</p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>{`${isAM ? 'AM' : 'PM'} ${hour}:${minute}`}</div>
        <div onClick={() => setPickHour(!isPickHour)}>{isPickHour ? 'To Pick Minute' : 'To Pick Hour'}</div>
      </div>
      <svg
        height="400"
        width="400"
      >
        <circle cx={d} cy={d} r="180" stroke="#bebebe" strokeWidth="3" fill="#bebebe" />
        {
          points.map(point => <Pointer
            key={point.value}
            point={point}
            value={isPickHour ? hour % 12 : Math.floor(minute / 5)}
            setValue={isPickHour ? setHour : setMinute}
            d={d}
            isHour={isPickHour}
          />)
        }
        <line x1={points[hour % 12].hx} y1={points[hour % 12].hy} x2={d} y2={d} strokeWidth="3" stroke={isPickHour ? "orange" : "#f5f5f5"} />
        <line x1={points[Math.floor(minute / 5)].mx} y1={points[Math.floor(minute / 5)].my} x2={d} y2={d} strokeWidth="3" stroke={isPickHour ? "#f5f5f5" : "orange"} />
        <circle cx={d} cy={d} r="10" fill="#f5f5f5" />

      </svg>
    </div>
  )

}

export default TimePicker