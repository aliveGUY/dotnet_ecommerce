import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './state/slices/counter';

function App() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <header className="App-header">
        <p>Count: {count}</p>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
      </header>
    </div>
  );
}

export default App;
