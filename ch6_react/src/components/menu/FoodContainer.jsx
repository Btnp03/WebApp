// FoodContainer.jsx
// อ้างอิงสไลด์หน้า 61, 62, 67: FoodContainer เป็น Component หลัก
import { useState } from 'react';
import FoodList from './FoodList';
import FoodForm from './FoodForm';

// ข้อมูลเริ่มต้นตามสไลด์หน้า 61
const initialFood = [
  { name: 'cake', price: 35, isBestSeller: true },
  { name: 'bread', price: 25, isBestSeller: false },
  { name: 'milk', price: 15, isBestSeller: true },
  { name: 'donut', price: 45, isBestSeller: false },
  { name: 'cookie', price: 55, isBestSeller: true }
];

const FoodContainer = () => {
  // ข้อกำหนด B.1: เก็บข้อมูลอาหารใน useState
  const [food, setFood] = useState(initialFood);

  // ข้อกำหนด C.3 และ C.4: ใช้ localStorage บันทึกและอ่าน Mode ปัจจุบันกลับมาใช้เมื่อเปิดหน้าเว็บใหม่
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('foodAppMode');
    return savedMode ? savedMode : 'admin'; // ค่าเริ่มต้นเป็น 'admin' หรือตามที่บันทึกไว้
  });

  // ข้อกำหนด B.6: ลบรายการอาหารด้วย filter() ตามสไลด์หน้า 54 และ 62
  const deleteItem = (index) => {
    const result = food.filter((item, i) => i !== index);
    setFood(result);
  };

  // ข้อกำหนด B.5: เพิ่มรายการอาหารใหม่เข้า State ด้วย Spread Operator ตามสไลด์หน้า 58 และ 62
  const addItem = (item) => {
    const result = [...food, item];
    setFood(result);
  };

  // ข้อกำหนด C.5: วิธีสลับ Mode ที่เหมาะสม ไม่ต้องมี Login
  const toggleMode = (targetMode) => {
    setMode(targetMode);
    localStorage.setItem('foodAppMode', targetMode);
  };

  const isAdmin = mode === 'admin';

  return (
    <div className="food-container">
      <div className="food-header">
        <div className="header-title-group">
          <h3>🍽️ Our Menu</h3>
          <p className="subtitle">รายการเมนูอาหารและเครื่องดื่มประจำร้าน</p>
        </div>

        {/* แถบสลับ User / Admin Mode */}
        <div className="mode-switcher-container">
          <span className="mode-label">โหมดการใช้งาน:</span>
          <div className="mode-toggle-group">
            <button
              type="button"
              className={`mode-btn ${!isAdmin ? 'active-user' : ''}`}
              onClick={() => toggleMode('user')}
            >
              👤 User Mode
            </button>
            <button
              type="button"
              className={`mode-btn ${isAdmin ? 'active-admin' : ''}`}
              onClick={() => toggleMode('admin')}
            >
              🛠️ Admin Mode
            </button>
          </div>
          <span className={`mode-badge ${isAdmin ? 'badge-admin-mode' : 'badge-user-mode'}`}>
            กำลังใช้งาน: {isAdmin ? 'Admin (เพิ่ม/ลบได้)' : 'User (ดูอย่างเดียว)'}
          </span>
        </div>
      </div>

      {/* ข้อกำหนด C.2: Admin Mode แสดงฟอร์มเพิ่มข้อมูล, C.1: User Mode ซ่อนฟอร์ม */}
      {isAdmin && <FoodForm addItem={addItem} />}

      {/* ส่ง Props ข้อมูลอาหาร, ฟังก์ชัน deleteItem, และสถานะ isAdmin ไปยัง FoodList */}
      <FoodList food={food} deleteItem={deleteItem} isAdmin={isAdmin} />
    </div>
  );
};

export default FoodContainer;
