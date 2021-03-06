import React from 'react'

const hexToRgb = hex => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
const componentToHex = c => {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

const rgbToHex = (r, g, b) => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

const rgbToRatio = ({ r, g, b }) => {
  if (r === 255 && b === 0) { //0 ~ 16.6
    return g / 255 * 16.6 + 0
  } else if (g === 255 && b === 0) { //16.6 ~ 33.2
    return r / 255 * 16.6 + 16.6
  } else if (g === 255 && r === 0) { //33.2 ~ 49.8
    return b / 255 * 16.6 + 33.2
  } else if (b === 255 && r === 0) { //49.8 ~ 66.4
    return g / 255 * 16.6 + 49.8
  } else if (b === 255 && g === 0) { //66.4 ~ 83
    return r / 255 * 16.6 + 66.4
  } else if (r === 255 && g === 0) { //83 ~ 100
    return g / 255 * 16.6 + 83
  }
  return 0
}
const ColorBoard = ({ setCoordinate, rgb, barRGB, onChange }) => {
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
  const selectColor = e => {
    var target = e.target || e.srcElement,
      rect = target.getBoundingClientRect(),
      newLeft = e.clientX - rect.left + pointerRadius,
      newTop = e.clientY - rect.top + pointerRadius;

    setCoordinate({ x: Math.floor(((newLeft - pointerRadius) / (boardWidth - pointerRadius * 2)) * 100), y: Math.floor((newTop - pointerRadius) / (boardWidth - pointerRadius * 2) * 100) })
    setPosition({ x: newLeft, y: newTop })
    onChange(rgbToHex(rgb.r, rgb.g, rgb.b))
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width={boardWidth}
      height={boardWidth}
      ref={boardRef}
    >
      <defs>
        <linearGradient id="lg1" x1="100%" x2="0%">
          <stop offset="0%" stopColor={`rgba(${barRGB.r}, ${barRGB.g}, ${barRGB.b}, 1)`} />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 1)" />
        </linearGradient>
        <linearGradient id="lg2" x1="100%" y1="100%" >
          <stop offset="0%" stopColor="rgba(0, 0, 0 , 1)" />
          <stop offset="100%" stopColor={`rgba(0, 0, 0, 0)`} />
        </linearGradient>
      </defs>
      <rect
        strokeWidth="3"
        stroke="black"
        width={boardWidth - pointerRadius * 2}
        height={boardWidth - pointerRadius * 2} x={pointerRadius} y={pointerRadius} fill="url(#lg1)"
      />
      <rect
        strokeWidth="3"
        stroke="black"
        onClick={selectColor}
        width={boardWidth - pointerRadius * 2}
        height={boardWidth - pointerRadius * 2} x={pointerRadius} y={pointerRadius} fill="url(#lg2)"
      />
      <circle
        strokeWidth="3"
        stroke="black"
        cx={position.x}
        cy={position.y}
        r={pointerRadius - 3} fill={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} onMouseDown={startDrag}
      />
    </svg >
  )
}
const ColorBar = ({ setBarRatio, barRGB, barRatio, rgb, onChange }) => {
  const barWidth = 300
  const pointerRadius = 10
  const boardRef = React.useRef()
  const [start, setStart] = React.useState(null)
  const [position, setPosition] = React.useState({
    x: 10 + 300 * barRatio / 100,
    y: 15
  })

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
  const selectColor = e => {
    var newLeft = e.clientX - pointerRadius * 3
    setBarRatio(Math.floor(((newLeft - pointerRadius) / (barWidth - pointerRadius * 2)) * 1000) / 10)
    setPosition({ x: newLeft, y: position.y })
    onChange(rgbToHex(rgb.r, rgb.g, rgb.b))
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width={barWidth}
      height={30}
      ref={boardRef}
    >
      <defs>
        <linearGradient id="lg3" x1="100%" x2="0%">
          <stop offset="0%" stopColor="rgb(255, 0, 0)" />
          <stop offset="16.6%" stopColor="rgb(255, 0, 255)" />
          <stop offset="33.2%" stopColor="rgb(0, 0, 255)" />
          <stop offset="49.8%" stopColor="rgb(0, 255, 255)" />
          <stop offset="66.4%" stopColor="rgb(0, 255, 0)" />
          <stop offset="83.0%" stopColor="rgb(255, 255, 0)" />
          <stop offset="100%" stopColor="rgb(255, 0, 0)" />
        </linearGradient>
      </defs>
      <rect
        width={barWidth - pointerRadius * 2}
        onClick={selectColor}
        height={30} x={pointerRadius} y="0" fill="url(#lg3)"
      />
      <circle
        strokeWidth="3"
        stroke="black"
        cx={position.x}
        cy={position.y}
        r={pointerRadius - 3}
        fill={`rgb(${barRGB.r}, ${barRGB.g}, ${barRGB.b})`}
        onMouseDown={startDrag}
      />
    </svg>
  )
}
const ColorPicker = ({ value, onChange }) => {
  const [coordinate, setCoordinate] = React.useState({
    x: 100,
    y: 0
  })
  const [barRatio, setBarRatio] = React.useState(rgbToRatio({
    r: hexToRgb(value).r,
    g: hexToRgb(value).g,
    b: hexToRgb(value).b
  }))
  const [barRGB, setBarRGB] = React.useState({
    r: hexToRgb(value).r,
    g: hexToRgb(value).g,
    b: hexToRgb(value).b
  })
  const [rgb, setRGB] = React.useState({
    r: hexToRgb(value).r,
    g: hexToRgb(value).g,
    b: hexToRgb(value).b
  })

  React.useEffect(() => {
    if (barRatio >= 0 && 16.6 > barRatio) {
      setBarRGB({
        r: 255,
        g: Math.floor(barRatio * 15.3),
        b: 0
      })
    } else if (barRatio >= 16.6 && 33.2 > barRatio) {
      let ratio = (barRatio - 16.6) / 16.6
      setBarRGB({
        r: Math.floor(255 * (1 - ratio)),
        g: 255,
        b: 0
      })
    } else if (barRatio >= 33.2 && 49.8 > barRatio) {
      let ratio = (barRatio - 33.2) / 16.6
      setBarRGB({
        r: 0,
        g: 255,
        b: Math.floor(255 * ratio)
      })
    } else if (barRatio >= 49.8 && 66.4 > barRatio) {
      let ratio = (barRatio - 49.8) / 16.6
      setBarRGB({
        r: 0,
        g: Math.floor(255 * (1 - ratio)),
        b: 255
      })
    } else if (barRatio >= 66.4 && 83 > barRatio) {
      let ratio = (barRatio - 66.4) / 16.6
      setBarRGB({
        r: Math.floor(255 * ratio),
        g: 0,
        b: 255
      })
    } else if (barRatio >= 83 && 100.1 > barRatio) {
      let ratio = (barRatio - 83) / 17
      setBarRGB({
        r: 255,
        g: 0,
        b: Math.floor(255 * (1 - ratio)),
      })
    }

  }, [barRatio])
  React.useEffect(() => {
    const xr = 255 - barRGB.r
    const xg = 255 - barRGB.g
    const xb = 255 - barRGB.b
    const yr = barRGB.r + Math.floor(xr * (100 - coordinate.x) / 100)
    const yg = barRGB.g + Math.floor(xg * (100 - coordinate.x) / 100)
    const yb = barRGB.b + Math.floor(xb * (100 - coordinate.x) / 100)
    setRGB({
      r: Math.floor(yr * (100 - coordinate.y) / 100),
      g: Math.floor(yg * (100 - coordinate.y) / 100),
      b: Math.floor(yb * (100 - coordinate.y) / 100),
    })
  }, [coordinate, barRGB])
  // React.useEffect(() => {
  //   onChange(rgbToHex(rgb.r, rgb.g, rgb.b))
  // }, [rgb])
  return (
    <div style={{ userSelect: 'none' }}>
      <input style={{ marginBottom: 16 }} type="text" value={rgbToHex(rgb.r, rgb.g, rgb.b)} readOnly />
      <div style={{ border: '1px solid', width: 300, padding: 16 }}>
        <ColorBoard setCoordinate={setCoordinate} rgb={rgb} barRGB={barRGB} onChange={onChange} />
        <ColorBar setBarRatio={setBarRatio} barRGB={barRGB} barRatio={barRatio} rgb={rgb} onChange={onChange} />
      </div>
    </div>
  )
}

export default ColorPicker