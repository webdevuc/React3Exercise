import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [counter, setCounter] = useState(1);
  const incrementCounter = () => setCounter(counter + 1);
  let decrementCounter = () => setCounter(counter - 1);
  if (counter <= 0) {
    decrementCounter = () => setCounter(0);
  }

  return (
    <div className="main">
      <div>
        <label className="count">Clicks : {counter}</label>
      </div>
      <div className="main btnContainer">
        <button className="actButton" onClick={incrementCounter}>Increment</button>
        <button className="actButton" onClick={decrementCounter}>Decrement</button>
      </div>
    </div>
  )
}

export default App;