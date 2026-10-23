// frontend/src/pages/Register.jsx
// อ้างอิงสไลด์หน้า 28 และ 29
import { useState } from 'react';
import Axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [inputs, setInputs] = useState({
    userName: '',
    email: '',
    password: '',
    cpassword: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  }

  // ฟังก์ชัน handleSubmit ตามสไลด์หน้า 29
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputs.password !== inputs.cpassword) {
      alert('Password mismatch');
      return;
    }

    setLoading(true);
    try {
      const response = await Axios.post('http://localhost:5000/authen/register', {
        userName: inputs.userName,
        email: inputs.email,
        password: inputs.password
      });

      if (response.status === 201) {
        alert(response.data.message);
        navigate('/login');
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        alert(err.response.data.message);
      } else {
        alert(err.response?.data?.message || 'Registration failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register Page</h2>
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
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              placeholder="Enter your email"
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
              placeholder="Enter password"
              required
            />
          </div>

          <div className="form-item">
            <label>Confirm Password</label>
            <input
              type="password"
              name="cpassword"
              value={inputs.cpassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Register'}
          </button>

          <div className="auth-footer">
            Have an Account? <Link to="/login">Login Here</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
