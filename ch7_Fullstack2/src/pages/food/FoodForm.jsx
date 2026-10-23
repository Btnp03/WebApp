// src/pages/food/FoodForm.jsx
// อ้างอิงสไลด์หน้า 9-11 และภาพโจทย์หน้า 23
import { useState } from 'react';

const FoodForm = ({ addMenu, typeList }) => {
  const [inputs, setInputs] = useState({
    name: '',
    price: '',
    isBestSeller: 'true',
    typeId: ''
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputs.name.trim() || inputs.price === '') {
      alert('กรุณากรอกชื่อและราคาอาหาร');
      return;
    }

    // หากยังไม่ได้เลือก typeId ให้ใช้ค่าแรกจาก typeList
    const selectedTypeId = inputs.typeId || (typeList && typeList.length > 0 ? typeList[0].typeId : 1);

    await addMenu({
      name: inputs.name.trim(),
      price: Number(inputs.price),
      isBestSeller: inputs.isBestSeller === 'true',
      typeId: Number(selectedTypeId)
    });

    // Reset inputs
    setInputs({
      name: '',
      price: '',
      isBestSeller: 'true',
      typeId: typeList && typeList.length > 0 ? typeList[0].typeId : ''
    });
  };

  return (
    <div className="new-food-section">
      <h3 className="new-food-title">New Food</h3>
      <form onSubmit={handleSubmit} className="new-food-form">
        <div className="form-group">
          <label>name :</label>
          <input
            type="text"
            name="name"
            value={inputs.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>price :</label>
          <input
            type="number"
            name="price"
            value={inputs.price}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <label>Best Seller :</label>
          <select
            name="isBestSeller"
            value={inputs.isBestSeller}
            onChange={handleChange}
          >
            <option value="true">BestSeller</option>
            <option value="false">Normal</option>
          </select>
        </div>

        {/* กรณีมีประเภทอาหารให้เลือก */}
        {typeList && typeList.length > 0 && (
          <div className="form-group">
            <label>Type :</label>
            <select
              name="typeId"
              value={inputs.typeId || typeList[0]?.typeId}
              onChange={handleChange}
            >
              {typeList.map((t) => (
                <option key={t.typeId} value={t.typeId}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="form-action">
          <button type="submit" className="btn-add-menu">
            Add menu
          </button>
        </div>
      </form>
    </div>
  );
};

export default FoodForm;
