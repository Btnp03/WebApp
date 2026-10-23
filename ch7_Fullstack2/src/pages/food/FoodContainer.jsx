// src/pages/food/FoodContainer.jsx
// อ้างอิงสไลด์หน้า 5, 6, 7, 18, 19, 20 และ 23
import { useState, useEffect } from 'react';
import { menuApi } from '../../services/menuApi';
import { typeApi } from '../../services/typeApi';
import FoodList from './FoodList';
import FoodForm from './FoodForm';

function FoodContainer() {
  const [menuList, setMenuList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [loading, setLoading] = useState(true);

  // ฟังก์ชันดึงข้อมูลเมนูทั้งหมดจาก Backend (สไลด์หน้า 6, 19)
  const fetchMenus = async () => {
    try {
      const data = await menuApi.getAll();
      setMenuList(data);
    } catch (error) {
      console.error('Failed to fetch menus:', error);
    }
  };

  // ฟังก์ชันดึงข้อมูลประเภทอาหารจาก Backend (สไลด์หน้า 6, 19)
  const fetchTypes = async () => {
    try {
      const data = await typeApi.getAll();
      setTypeList(data);
    } catch (error) {
      console.error('Failed to fetch types:', error);
    }
  };

  // ดึงข้อมูลเมื่อโหลด Component ครั้งแรก (สไลด์หน้า 6)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchMenus();
      await fetchTypes();
      setLoading(false);
    };
    fetchData();
  }, []);

  // ฟังก์ชันลบเมนู เชื่อมต่อกับ Backend DELETE (สไลด์หน้า 7, 20)
  const deleteMenu = async (id) => {
    try {
      await menuApi.delete(id);
      setMenuList((prevList) => prevList.filter((item) => item.menuId !== id));
    } catch (error) {
      console.error('Failed to delete menu:', error);
      alert('ไม่สามารถลบเมนูได้: ' + (error.response?.data?.error || error.message));
    }
  };

  // ฟังก์ชันเพิ่มเมนู เชื่อมต่อกับ Backend POST (สไลด์หน้า 7, 20)
  const addMenu = async (newFood) => {
    try {
      await menuApi.create(newFood);
      await fetchMenus(); // โหลดรายการเมนูใหม่หลังเพิ่มสำเร็จ
    } catch (error) {
      console.error('Failed to add menu:', error);
      alert('ไม่สามารถเพิ่มเมนูได้: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="food-container-card">
      <h2 className="our-menu-title">Our Menu</h2>
      {loading ? (
        <p className="loading-text">กำลังโหลดข้อมูลเมนู...</p>
      ) : (
        <>
          <FoodList menuList={menuList} deleteMenu={deleteMenu} />
          <FoodForm addMenu={addMenu} typeList={typeList} />
        </>
      )}
    </div>
  );
}

export default FoodContainer;
