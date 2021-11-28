import DatePicker from './components/DatePicker';
import TimePicker from './components/TimePicker';
import ColorPicker from './components/ColorPicker';

function App() {
  return (
    <div>
      My Pickers:
      <DatePicker value={new Date()} onChange={date => console.log(date)}/>
      <TimePicker value={new Date()} onChange={time => console.log(time)}/>
      <ColorPicker value={'#ff0000'} onChange={color => console.log(color)}/>
    </div>
  );
}

export default App;
