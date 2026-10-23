import { useState } from 'react';

// การบ้าน A.2: แสดงข้อความและสีตามค่าที่กำหนด โดยใช้ onChange
// อ้างอิงสไลด์หน้า 50 (Data binding), 52 (input onChange สี) และ 57 (handleChange รับ e.target.value)
function ColorChangeInput() {
  const [text, setText] = useState('ยินดีต้อนรับสู่ React!');
  const [color, setColor] = useState('#2563eb');

  return (
    <div className="card-box">
      <h3>2. แสดงข้อความและสีตามค่าที่กำหนด (onChange)</h3>
      <div className="form-group-row">
        <label>
          กรอกข้อความ:
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="พิมพ์ข้อความที่ต้องการ..."
            className="input-text"
          />
        </label>
        <label>
          เลือกสีข้อความ:
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="input-color"
          />
        </label>
      </div>

      <div className="preview-box">
        <span className="preview-label">ผลลัพธ์แสดงผลแบบเรียลไทม์:</span>
        <h2 style={{ color: color, margin: '8px 0', wordBreak: 'break-word' }}>
          {text || '(กรุณากรอกข้อความ)'}
        </h2>
        <p style={{ color: '#64748b', fontSize: '13px' }}>
          รหัสสีปัจจุบัน: <code>{color}</code>
        </p>
      </div>
    </div>
  );
}

export default ColorChangeInput;
