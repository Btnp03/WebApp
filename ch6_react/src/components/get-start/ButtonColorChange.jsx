import { useState } from 'react';

// การบ้าน A.1: เปลี่ยนสี Button และข้อความเมื่อกดปุ่ม
// อ้างอิงสไลด์หน้า 52 (useState Hook) และ 53 (toggle state ด้วย onClick)
function ButtonColorChange() {
  // สร้าง State สำหรับเก็บลำดับสีและข้อความ
  const buttonStates = [
    { text: 'สถานะ: สีฟ้า (คลิกเพื่อเปลี่ยน)', bg: '#0284c7', color: '#ffffff' },
    { text: 'สถานะ: สีเขียว (คลิกเพื่อเปลี่ยน)', bg: '#16a34a', color: '#ffffff' },
    { text: 'สถานะ: สีส้ม (คลิกเพื่อเปลี่ยน)', bg: '#ea580c', color: '#ffffff' },
    { text: 'สถานะ: สีม่วง (คลิกเพื่อเปลี่ยน)', bg: '#9333ea', color: '#ffffff' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // ฟังก์ชันสลับสีและข้อความเมื่อกดปุ่ม
  const handleClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % buttonStates.length);
  };

  const current = buttonStates[currentIndex];

  return (
    <div className="card-box">
      <h3>1. เปลี่ยนสี Button และข้อความเมื่อกดปุ่ม</h3>
      <p>คลิกที่ปุ่มด้านล่างเพื่อเปลี่ยนสีพื้นหลังและข้อความของปุ่มแบบวนรอบ:</p>
      <button
        type="button"
        onClick={handleClick}
        style={{
          backgroundColor: current.bg,
          color: current.color,
          padding: '12px 24px',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}
      >
        {current.text}
      </button>
      <div style={{ marginTop: '10px', fontSize: '14px', color: '#64748b' }}>
        สีปัจจุบัน: <span style={{ color: current.bg, fontWeight: 'bold' }}>{current.bg}</span> (ลำดับที่ {currentIndex + 1} จาก {buttonStates.length})
      </div>
    </div>
  );
}

export default ButtonColorChange;
