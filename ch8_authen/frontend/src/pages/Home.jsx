// frontend/src/pages/Home.jsx
// อ้างอิงสไลด์หน้า 38 (Auth check), 39 (Real-time polling), 40 (Logout) และ 54-55 (Todo Guest/User/Admin Mode)
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Home() {
  const [user, setUser] = useState(null); // null = Guest, object = Logged in
  const [products, setProducts] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State สำหรับ Admin เพิ่มสินค้า
  const [newProduct, setNewProduct] = useState({
    productName: '',
    price: '',
    isBestSeller: false
  });

  // State สำหรับเก็บคะแนน Rating ชั่วคราวของแต่ละสินค้า
  const [selectedRatings, setSelectedRatings] = useState({});

  const navigate = useNavigate();

  // 1. ตรวจสอบสถานะการ Login จาก Token (สไลด์หน้า 38)
  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const response = await Axios.get('http://localhost:5000/authen/home', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200 && response.data.user?.length > 0) {
        setUser(response.data.user[0]);
      } else {
        localStorage.removeItem('token');
        setUser(null);
      }
    } catch (err) {
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  // 2. ดึงข้อมูลสินค้า (Products/Menu)
  const fetchProducts = async () => {
    try {
      const response = await Axios.get('http://localhost:5000/products');
      setProducts(response.data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  // 3. ดึงรายชื่อผู้ใช้ทั้งหมด (สำหรับ Admin)
  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await Axios.get('http://localhost:5000/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsersList(response.data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  // 4. Real-time data updates ด้วย Polling (สไลด์หน้า 39)
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await checkAuth();
      await fetchProducts();
      setLoading(false);
    };
    init();

    // Polling ทุก 5 วินาที ตามสไลด์หน้า 39
    const intervalId = setInterval(() => {
      fetchProducts();
    }, 5000);

    // Cleanup interval เมื่อ unmount (สไลด์หน้า 39)
    return () => clearInterval(intervalId);
  }, []);

  // เมื่อ role เป็น ADMIN ให้ดึงรายชื่อ users
  useEffect(() => {
    if (user?.role === 'ADMIN') {
      fetchUsers();
    }
  }, [user]);

  // 5. Logout (สไลด์หน้า 40)
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setUsersList([]);
    alert('Logged out successfully');
  };

  // 6. User ส่ง Rating (Todo 2.3)
  const handleRatingSubmit = async (productId) => {
    const starRating = selectedRatings[productId] || 5;
    const token = localStorage.getItem('token');

    if (!token) {
      alert('กรุณาเข้าสู่ระบบก่อนให้คะแนน');
      navigate('/login');
      return;
    }

    try {
      const response = await Axios.post(
        'http://localhost:5000/ratings',
        { productId, starRating: Number(starRating) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data.message);
      await fetchProducts(); // รีเฟรชคะแนนเฉลี่ย
    } catch (err) {
      alert(err.response?.data?.message || 'Error submitting rating');
    }
  };

  // 7. Admin เพิ่มสินค้า (Todo 2.4)
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await Axios.post(
        'http://localhost:5000/products',
        newProduct,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data.message);
      setNewProduct({ productName: '', price: '', isBestSeller: false });
      await fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || 'Error adding product');
    }
  };

  // 8. Admin เปลี่ยน Role ของ User (Todo 2.4)
  const handleChangeRole = async (targetUserId, newRole) => {
    const token = localStorage.getItem('token');
    try {
      const response = await Axios.patch(
        `http://localhost:5000/users/${targetUserId}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data.message);
      await fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Error changing role');
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar user={user} onLogout={handleLogout} />

      <main className="main-content">
        {/* Banner แสดงสถานะปัจจุบัน */}
        <section className="status-banner">
          {user ? (
            <div>
              <h2>ยินดีต้อนรับคุณ {user.userName} 👋</h2>
              <p>
                คุณกำลังใช้งานในฐานะ: <strong className={`tag-${user.role.toLowerCase()}`}>{user.role}</strong>
                {user.role === 'ADMIN' ? ' (มีสิทธิ์เพิ่มสินค้าและจัดการผู้ใช้)' : ' (สามารถรีวิวและให้คะแนนสินค้าได้)'}
              </p>
            </div>
          ) : (
            <div>
              <h2>ยินดีต้อนรับสู่ร้านค้า (Guest Mode) 🌐</h2>
              <p>คุณสามารถชมรายการสินค้าแบบ Real-time ได้ หากต้องการให้คะแนนรีวิว กรุณาเข้าสู่ระบบ</p>
            </div>
          )}
        </section>

        {/* ส่วนที่ 1: เมนูสินค้า (Real-time update) */}
        <section className="card-section">
          <div className="section-title-row">
            <h3>🍽️ รายการเมนูสินค้า (Menu Items)</h3>
            <span className="live-indicator">● อัปเดตข้อมูล Real-time อัตโนมัติทุก 5 วิ</span>
          </div>

          {loading ? (
            <p>กำลังโหลดรายการสินค้า...</p>
          ) : products.length === 0 ? (
            <p>ยังไม่มีสินค้าในระบบ</p>
          ) : (
            <div className="product-grid">
              {products.map((item) => (
                <div key={item.productId} className={`product-card ${item.isBestSeller ? 'bestseller' : ''}`}>
                  <div className="product-header">
                    <h4>{item.productName}</h4>
                    {item.isBestSeller && <span className="badge-star">⭐ Best Seller</span>}
                  </div>
                  <p className="product-price">{item.price} บาท</p>
                  
                  <div className="product-rating-info">
                    <span>คะแนนเฉลี่ย: <strong>{item.avgRating > 0 ? `${item.avgRating} / 5` : 'ยังไม่มีรีวิว'}</strong></span>
                    <span className="review-count">({item.totalReviews} รีวิว)</span>
                  </div>

                  {/* ฟังก์ชัน Rating สำหรับ User เท่านั้น */}
                  {user ? (
                    <div className="rating-action-box">
                      <label>ให้คะแนน:</label>
                      <select
                        value={selectedRatings[item.productId] || '5'}
                        onChange={(e) =>
                          setSelectedRatings({
                            ...selectedRatings,
                            [item.productId]: e.target.value
                          })
                        }
                      >
                        <option value="5">⭐⭐⭐⭐⭐ (5 ดาว)</option>
                        <option value="4">⭐⭐⭐⭐ (4 ดาว)</option>
                        <option value="3">⭐⭐⭐ (3 ดาว)</option>
                        <option value="2">⭐⭐ (2 ดาว)</option>
                        <option value="1">⭐ (1 ดาว)</option>
                      </select>
                      <button
                        type="button"
                        className="btn-rate"
                        onClick={() => handleRatingSubmit(item.productId)}
                      >
                        ส่งคะแนน
                      </button>
                    </div>
                  ) : (
                    <div className="guest-rating-hint">
                      <small>💡 เข้าสู่ระบบเพื่อร่วมให้คะแนนเมนูนี้</small>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ส่วนที่ 2: Admin Only - เพิ่มสินค้าใหม่ (Todo 2.4) */}
        {user?.role === 'ADMIN' && (
          <section className="card-section admin-section">
            <h3>🛠️ ส่วนของ Admin: เพิ่มสินค้าใหม่ (Add Product)</h3>
            <form onSubmit={handleAddProduct} className="admin-form">
              <div className="admin-form-group">
                <label>ชื่อสินค้า:</label>
                <input
                  type="text"
                  placeholder="เช่น Brownie, Green Tea"
                  value={newProduct.productName}
                  onChange={(e) => setNewProduct({ ...newProduct, productName: e.target.value })}
                  required
                />
              </div>
              <div className="admin-form-group">
                <label>ราคา (บาท):</label>
                <input
                  type="number"
                  placeholder="เช่น 45"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  min="1"
                  required
                />
              </div>
              <div className="admin-form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={newProduct.isBestSeller}
                    onChange={(e) => setNewProduct({ ...newProduct, isBestSeller: e.target.checked })}
                  />
                  สินค้าขายดี (Best Seller)
                </label>
              </div>
              <button type="submit" className="btn-admin-add">
                ➕ เพิ่มสินค้าลงฐานข้อมูล
              </button>
            </form>
          </section>
        )}

        {/* ส่วนที่ 3: Admin Only - จัดการและเปลี่ยน Role ผู้ใช้ (Todo 2.4) */}
        {user?.role === 'ADMIN' && (
          <section className="card-section admin-section">
            <h3>👥 ส่วนของ Admin: จัดการสิทธิ์ผู้ใช้ (Change User Role)</h3>
            <div className="table-responsive">
              <table className="user-table">
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Current Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {usersList.map((u) => (
                    <tr key={u.userId}>
                      <td>{u.userId}</td>
                      <td><strong>{u.userName}</strong></td>
                      <td>{u.email}</td>
                      <td>
                        <span className={`tag-${u.role.toLowerCase()}`}>{u.role}</span>
                      </td>
                      <td>
                        {u.role === 'USER' ? (
                          <button
                            type="button"
                            className="btn-role btn-promote"
                            onClick={() => handleChangeRole(u.userId, 'ADMIN')}
                          >
                            ตั้งเป็น Admin
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="btn-role btn-demote"
                            onClick={() => handleChangeRole(u.userId, 'USER')}
                            disabled={u.userId === user.userId}
                            title={u.userId === user.userId ? 'ไม่สามารถลดสิทธิ์ตัวเองได้' : ''}
                          >
                            ลดเป็น User
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default Home;
