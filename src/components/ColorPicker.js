import React from 'react'
const ColorBoard = ({ setCoordinate, rgb }) => {
  const boardRef = React.useRef()
  const [start, setStart] = React.useState(null)
  const [position, setPosition] = React.useState({
    x: 290,
    y: 10
  })
  const boardWidth = 300
  const pointerRadius = 10
  React.useEffect(() => {
    if (JSON.stringify(start) !== JSON.stringify({}) && start !== null) {
      boardRef.current.addEventListener('mousemove', drag)
      boardRef.current.addEventListener('mouseup', endDrag)
    }
  }, [start])
  const startDrag = e => {
    setStart({ left: e.clientX, top: e.clientY })
  }
  const endDrag = () => {
    setStart({})
    boardRef.current.removeEventListener('mousemove', drag)
    boardRef.current.removeEventListener('mouseup', endDrag)
  }
  const drag = e => {
    var newLeft = position.x + e.x - start.left
    var newTop = position.y + e.y - start.top
    if (newLeft <= pointerRadius) newLeft = pointerRadius
    if (newTop <= pointerRadius) newTop = pointerRadius
    if (newLeft >= boardWidth - pointerRadius) newLeft = boardWidth - pointerRadius
    if (newTop >= boardWidth - pointerRadius) newTop = boardWidth - pointerRadius
    setCoordinate({ x: Math.floor(((newLeft - pointerRadius) / (boardWidth - pointerRadius * 2)) * 100), y: Math.floor((newTop - pointerRadius) / (boardWidth - pointerRadius * 2) * 100) })
    setPosition({ x: newLeft, y: newTop })
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width={boardWidth}
      height={boardWidth}
      ref={boardRef}
    >
      <rect
        strokeWidth="3"
        stroke="black"
        width={boardWidth - pointerRadius * 2}
        height={boardWidth - pointerRadius * 2} x={pointerRadius} y={pointerRadius} fill={'#f5f5f5'}
      />
      <circle cx={position.x} cy={position.y} r={pointerRadius} fill={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} onMouseDown={startDrag} />
    </svg>
  )
}
const ColorBar = ({ setBarRatio, rgb }) => {
  const boardRef = React.useRef()
  const [start, setStart] = React.useState(null)
  const [position, setPosition] = React.useState({
    x: 10,
    y: 15
  })

  const barWidth = 300
  const pointerRadius = 10
  React.useEffect(() => {
    if (JSON.stringify(start) !== JSON.stringify({}) && start !== null) {
      boardRef.current.addEventListener('mousemove', drag)
      boardRef.current.addEventListener('mouseup', endDrag)
    }
  }, [start])
  const startDrag = e => {
    setStart({ left: e.clientX, top: e.clientY })
  }
  const endDrag = () => {
    setStart({})
    boardRef.current.removeEventListener('mousemove', drag)
    boardRef.current.removeEventListener('mouseup', endDrag)
  }
  const drag = e => {
    var newLeft = position.x + e.x - start.left
    if (newLeft <= pointerRadius) newLeft = pointerRadius
    if (newLeft >= barWidth - pointerRadius) newLeft = barWidth - pointerRadius
    setBarRatio(Math.floor(((newLeft - pointerRadius) / (barWidth - pointerRadius * 2)) * 1000) / 10)
    setPosition({ x: newLeft, y: position.y })
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width={barWidth}
      height={30}
      ref={boardRef}
    >
      <rect
        width={barWidth - pointerRadius * 2}
        height={30} x={pointerRadius} y="0" fill={'#f5f5f5'}
      />
      <circle cx={position.x} cy={position.y} r={pointerRadius} fill={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} onMouseDown={startDrag} />
    </svg>
  )
}
const ColorPicker = () => {
  const [coordinate, setCoordinate] = React.useState({
    x: 100,
    y: 100
  })
  const [barRatio, setBarRatio] = React.useState(0)
  const [rgb, setRGB] = React.useState({
    r: 0,
    g: 0,
    b: 0
  })
  React.useEffect(() => {
    if (barRatio >= 0 && 16.6 > barRatio) {
      setRGB({
        r: 255,
        g: Math.floor(barRatio * 15.3),
        b: 0
      })
    } else if (barRatio >= 16.6 && 33.2 > barRatio) {
      let ratio = (barRatio - 16.6) / 16.6
      setRGB({
        r: Math.floor(255 * (1 - ratio)),
        g: 255,
        b: 0
      })
    } else if (barRatio >= 33.2 && 49.8 > barRatio) {
      let ratio = (barRatio - 33.2) / 16.6
      setRGB({
        r: 0,
        g: 255,
        b: Math.floor(255 * ratio)
      })
    } else if (barRatio >= 49.8 && 66.4 > barRatio) {
      let ratio = (barRatio - 49.8) / 16.6
      setRGB({
        r: 0,
        g: Math.floor(255 * (1 - ratio)),
        b: 255
      })
    } else if (barRatio >= 66.4 && 83 > barRatio) {
      let ratio = (barRatio - 66.4) / 16.6
      setRGB({
        r: Math.floor(255 * ratio),
        g: 0,
        b: 255
      })
    } else if (barRatio >= 83 && 100.1 > barRatio) {
      let ratio = (barRatio - 83) / 17
      setRGB({
        r: 255,
        g: 0,
        b: Math.floor(255 * (1 - ratio)),
      })
    }

  }, [barRatio])
  React.useEffect(() => {
    console.log(coordinate)
  }, [coordinate])
  return (
    <div style={{ border: '1px solid', width: 400, height: 500 }}>
      <p>Color Picker</p>
      <p>{`r: ${rgb.r}, g: ${rgb.g}, b: ${rgb.b}`}</p>
      <p>{`x: ${coordinate.x}, y: ${coordinate.y}`}</p>
      <p>{`bar: ${barRatio}`}</p>
      <ColorBoard setCoordinate={setCoordinate} rgb={rgb} />
      <ColorBar setBarRatio={setBarRatio} rgb={rgb} />
    </div>
  )
}

export default ColorPicker