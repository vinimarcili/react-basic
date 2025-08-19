import { useEffect, useState } from 'react';
import './Counter.css';

export default function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`Count updated: ${count}`);
  }, [count])

  return (
    <div className="counter-bg">
      <h1>Contador Simples</h1>
      <div className="counter-controls">
        <button className="counter-btn" onClick={() => setCount(count - 1)}>-</button>
        <span className="counter-value">{count}</span>
        <button className="counter-btn" onClick={() => setCount(count + 1)}>+</button>
      </div>
    </div>
  );
}
