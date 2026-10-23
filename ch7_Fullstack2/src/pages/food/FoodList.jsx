// src/pages/food/FoodList.jsx
// อ้างอิงสไลด์หน้า 8 และภาพโจทย์หน้า 23
const FoodList = ({ menuList, deleteMenu }) => {
  return (
    <div className="food-list-container">
      <ul className="food-list">
        {menuList && menuList.map((item) => (
          <li key={item.menuId} className="food-list-item">
            <span className="food-text">
              {item.name} - {item.price} baht
            </span>
            {item.isBestSeller && (
              <span className="bestseller-icon" title="Best Seller">
                🎖️
              </span>
            )}
            <button
              type="button"
              className="btn-del"
              onClick={() => deleteMenu(item.menuId)}
            >
              Del
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodList;
