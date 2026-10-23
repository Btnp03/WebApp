// src/pages/HomePage.jsx
// อ้างอิงสไลด์หน้า 16
export default function HomePage() {
  return (
    <div className="home-page-box">
      <h1>Welcome Home</h1>
      <p>ยินดีต้อนรับสู่ระบบจัดการเมนูอาหาร (Full Stack Web Application)</p>
      <div style={{ marginTop: '20px', padding: '16px', background: '#f8fafc', borderRadius: '8px' }}>
        <p>คลิกที่ปุ่ม <strong>Menu</strong> ทางซ้ายเพื่อดูและจัดการรายการอาหาร</p>
      </div>
    </div>
  );
}
