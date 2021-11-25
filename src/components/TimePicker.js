import React from 'react'
const Pointer = ({ point, hour, setHour, d }) => {
  const isSelectedHour = (point.value % 12) === (hour % 12)
  const [isHover, setHover] = React.useState(false)
  return (
    <>
      <line x1={point.x} y1={point.y} x2={d} y2={d} strokeWidth="3" stroke={isHover || isSelectedHour ? "#fff" : "#bebebe"} />
      <circle
        onClick={() => setHour(point.value)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        cx={point.x}
        cy={point.y}
        r={isHover || isSelectedHour ? 15 : 10}
        fill={isHover || isSelectedHour ? "#fff" : "#f5f5f5"}
      />
      <text
        onClick={() => setHour(point.value)}
        onMouseEnter={() => setHover(true)}
        x={point.x}
        y={point.y}
        stroke={isHover || isSelectedHour ? "#000" : "#000"}>{point.value + 1}</text>
    </>
  )
}
const TimePicker = () => {
  const dt = new Date();
  const [hour, setHour] = React.useState(dt.getHours())
  const d = 200
  const hourPoints = [
    { value: 0, x: 275, y: 75 },
    { value: 1, x: 325, y: 125 },
    { value: 2, x: 350, y: d },
    { value: 3, x: 325, y: 275 },
    { value: 4, x: 275, y: 325 },
    { value: 5, x: d, y: 350 },
    { value: 6, x: 125, y: 325 },
    { value: 7, x: 75, y: 275 },
    { value: 8, x: 50, y: d },
    { value: 9, x: 75, y: 125 },
    { value: 10, x: 125, y: 75 },
    { value: 11, x: d, y: 50 }
  ]

  const hourPoints_ = [...Array(12).keys()].map(index => {
    return ({
      value: index,
      x: 275 + 150 * Math.sin(index * 30),
      y: 75 - 150 * Math.sin(index * 30),
    })
  })
  console.log(hourPoints_)
  const minutePoints = [...Array(48).keys()].map(index => {

  })
  return (
    <div>
      <p>Time Picker</p>
      <div>{`${hour + 1}:${0}`}</div>
      <svg
        height="400"
        width="400"
      >
        <circle cx={d} cy={d} r="180" stroke="#bebebe" strokeWidth="3" fill="#bebebe" />
        {
          hourPoints_.map(point => <Pointer
            key={point.value}
            point={point}
            hour={hour}
            setHour={setHour}
            d={d}
          />)
        }
      </svg>
      <svg
        height="400"
        width="400"
      >
        <circle cx={d} cy={d} r="180" stroke="#bebebe" strokeWidth="3" fill="#bebebe" />
        {
          hourPoints.map(point => <Pointer
            key={point.value}
            point={point}
            hour={hour}
            setHour={setHour}
            d={d}
          />)
        }
      </svg>
    </div>
  )

}

export default TimePicker