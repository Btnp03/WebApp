// src/layouts/MainLayout.jsx
// อ้างอิงสไลด์หน้า 15 และภาพโจทย์หน้า 23 (มีปุ่ม Home และ Menu อยู่ด้านซ้าย)
import { Outlet, Link, useLocation } from 'react-router-dom';

function MainLayout() {
  const location = useLocation();

  return (
    <div className="main-layout-container">
      {/* Sidebar Navigation ทางซ้ายตามภาพโจทย์หน้า 23 */}
      <nav className="sidebar-nav">
        <Link
          to="/"
          className={`nav-btn ${location.pathname === '/' ? 'active' : ''}`}
        >
          Home
        </Link>
        <Link
          to="/menu"
          className={`nav-btn ${location.pathname === '/menu' ? 'active' : ''}`}
        >
          Menu
        </Link>
      </nav>

      {/* Main Content Area ทางขวา */}
      <main className="content-area">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
