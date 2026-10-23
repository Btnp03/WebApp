// FoodItem.jsx
// อ้างอิงสไลด์หน้า 64: FoodItem แสดงข้อมูลอาหารแต่ละรายการ และปุ่ม Del
// สไลด์หน้า 67: User/Admin Mode (ซ่อน/แสดงปุ่มลบ)
const FoodItem = ({ item, index, deleteItem, isAdmin }) => {
  return (
    <li className={`food-item ${item.isBestSeller ? 'bestseller-item' : ''}`}>
      <div className="food-info">
        <span className="food-name">{item.name}</span>
        <span className="food-price">{item.price} บาท</span>
        {item.isBestSeller ? (
          <span className="badge badge-bestseller">⭐ Best Seller</span>
        ) : (
          <span className="badge badge-normal">Normal</span>
        )}
      </div>

      {/* ใน Admin Mode จะแสดงปุ่มลบ ส่วน User Mode จะซ่อนปุ่มนี้ตามโจทย์ C.1 และ C.2 */}
      {isAdmin && (
        <button
          type="button"
          className="btn-del"
          onClick={() => deleteItem(index)}
          title="ลบเมนูนี้"
        >
          Del
        </button>
      )}
    </li>
  );
};

export default FoodItem;
