// frontend/src/pages/Login.jsx
// อ้างอิงสไลด์หน้า 31 และ 35
import { useState } from 'react';
import Axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [inputs, setInputs] = useState({
    userName: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  }

  // ฟังก์ชัน handleSubmit ตามสไลด์หน้า 31 และ 35
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await Axios.post('http://localhost:5000/authen/login', inputs);

      if (response.status === 200) {
        alert(response.data.message);
        // บันทึก Token ลง localStorage ตามสไลด์หน้า 35
        localStorage.setItem('token', response.data.token);
        navigate('/');
      }
    } catch (err) {
      if (err.response && (err.response.status === 404 || err.response.status === 401)) {
        alert(err.response.data.message);
      } else {
        alert(err.response?.data?.message || 'Login failed');
      }
    } finally {
      setLoading(false);
      setInputs({ userName: '', password: '' });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login Page</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-item">
            <label>Username</label>
            <input
              type="text"
              name="userName"
              value={inputs.userName}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="form-item">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <div className="auth-footer">
            Don't have an account? <Link to="/register">Register Here</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
