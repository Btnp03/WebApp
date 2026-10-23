// FoodForm.jsx
// อ้างอิงสไลด์หน้า 65 และ 66: FoodForm จัดการ Controlled Input และส่งข้อมูลกลับไปยัง Parent ผ่าน addItem
import { useState } from 'react';

const FoodForm = ({ addItem }) => {
  // State เก็บค่าจาก Input ทั้งหมดตามสไลด์หน้า 65
  const [inputs, setInputs] = useState({
    name: '',
    price: '',
    isBestSeller: 'true',
  });

  // ฟังก์ชัน handleChange ตามสไลด์หน้า 65
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  }

  // ฟังก์ชัน handleSubmit ตามสไลด์หน้า 65
  function handleSubmit(e) {
    e.preventDefault();

    if (!inputs.name.trim() || inputs.price === '') {
      return;
    }

    // แปลงข้อมูลเป็นรูปแบบ Object อาหาร
    const newFood = {
      name: inputs.name.trim(),
      price: Number(inputs.price),
      isBestSeller: inputs.isBestSeller === 'true',
    };

    // ส่งข้อมูลไปยัง Component แม่ (FoodContainer)
    addItem(newFood);

    // ข้อกำหนดที่ 9: หลังเพิ่มข้อมูล ให้ล้างค่า Form กลับเป็นค่าเริ่มต้น
    setInputs({
      name: '',
      price: '',
      isBestSeller: 'true',
    });
  }

  return (
    <form className="food-form" onSubmit={handleSubmit}>
      <h4 className="food-form-title">➕ เพิ่มเมนูใหม่ (Admin Only)</h4>
      <div className="form-fields">
        <div className="form-field">
          <label htmlFor="food-name">ชื่ออาหาร:</label>
          <input
            id="food-name"
            type="text"
            name="name"
            placeholder="เช่น Pancake, Orange Juice"
            value={inputs.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="food-price">ราคา (บาท):</label>
          <input
            id="food-price"
            type="number"
            name="price"
            placeholder="เช่น 30"
            value={inputs.price}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="food-status">สถานะสินค้า:</label>
          <select
            id="food-status"
            name="isBestSeller"
            value={inputs.isBestSeller}
            onChange={handleChange}
          >
            <option value="true">BestSeller</option>
            <option value="false">Normal</option>
          </select>
        </div>

        <div className="form-field form-field-button">
          <label>&nbsp;</label>
          <button type="submit" className="btn-add">
            Add menu
          </button>
        </div>
      </div>
    </form>
  );
};

export default FoodForm;
