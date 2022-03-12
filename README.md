# react-mjho-picker

### Installation
Run the following command to install this package.

```bash
npm install react-mjho-picker
```

### Configuration
The most basic use of the Pickers can be described with:
```
import React, { useState } from "react";
import { DatePicker, TimePicker, ColorPicker } from "react-mjho-picker";

const Example = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [color, setColor] = useState('#ff0000');
  return (
    <DatePicker value={date} onChange={date => setDate(date)} />
    <TimePicker value={time} onChange={time => setTime(time)} />
    <ColorPicker value={coloe} onChange={color => setColor(color)} />
  );
};
```


### Demo

See more package information. [link](https://www.npmjs.com/package/react-mjho-picker)

Online Demo is [here](https://mujungho.github.io/react-pickers/)!

