import { useState } from 'react';

// การบ้าน A.3: แสดงตัวเลขเพิ่มขึ้นและลดลงตามการกดปุ่ม
// อ้างอิงสไลด์หน้า 40 (onClick event), 51 (useState hook), 52 (update state)
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  const decrement = () => {
    setCount((prev) => prev - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="card-box">
      <h3>3. แสดงตัวเลขเพิ่มขึ้นและลดลงตามการกดปุ่ม (Counter)</h3>
      <div className="counter-display">
        <span className="counter-number" style={{ color: count > 0 ? '#16a34a' : count < 0 ? '#dc2626' : '#1e293b' }}>
          {count}
        </span>
      </div>

      <div className="counter-buttons">
        <button type="button" onClick={decrement} className="btn btn-danger">
          - ลด (Decrement)
        </button>
        <button type="button" onClick={reset} className="btn btn-secondary">
          รีเซ็ต (Reset)
        </button>
        <button type="button" onClick={increment} className="btn btn-success">
          + เพิ่ม (Increment)
        </button>
      </div>
    </div>
  );
}

export default Counter;
