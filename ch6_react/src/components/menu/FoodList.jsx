// FoodList.jsx
// อ้างอิงสไลด์หน้า 63: FoodList รับข้อมูลอาหารผ่าน Props และใช้ map() ในการ render รายการ FoodItem
import FoodItem from './FoodItem';

const FoodList = ({ food, deleteItem, isAdmin }) => {
  if (!food || food.length === 0) {
    return (
      <div className="empty-list-message">
        <p>ยังไม่มีรายการอาหารในระบบ</p>
      </div>
    );
  }

  return (
    <div className="food-list-wrapper">
      <ul className="food-list">
        {food.map((item, index) => (
          <FoodItem
            key={index}
            item={item}
            index={index}
            deleteItem={deleteItem}
            isAdmin={isAdmin}
          />
        ))}
      </ul>
    </div>
  );
};

export default FoodList;
