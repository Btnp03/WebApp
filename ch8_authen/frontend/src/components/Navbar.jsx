// frontend/src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/" className="brand-logo">
          🍔 Restaurant Menu & Auth
        </Link>
      </div>

      <div className="nav-status">
        {user ? (
          <span className={`role-badge badge-${user.role.toLowerCase()}`}>
            ● {user.role === 'ADMIN' ? 'Admin Mode' : 'User Mode'}: <strong>{user.userName}</strong>
          </span>
        ) : (
          <span className="role-badge badge-guest">
            ● Guest Mode (ยังไม่ได้เข้าสู่ระบบ)
          </span>
        )}
      </div>

      <div className="nav-actions">
        {user ? (
          <button type="button" onClick={onLogout} className="btn-logout">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="btn-nav">
              Login
            </Link>
            <Link to="/register" className="btn-nav btn-primary">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
