// src/routes/AppRoutes.jsx
// อ้างอิงสไลด์หน้า 14 และ 21: การจัดการ Route และ Route 404
import { Routes, Route, Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import FoodContainer from '../pages/food/FoodContainer';

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<FoodContainer />} />
      </Route>

      {/* สไลด์หน้า 21: Route not found */}
      <Route
        path="*"
        element={
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <h1>404</h1>
            <p>ไม่พบหน้าที่คุณต้องการ</p>
            <Link to="/">กลับสู่หน้าหลัก</Link>
          </div>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
