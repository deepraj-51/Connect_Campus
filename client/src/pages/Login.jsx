import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';


function Login() {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);

      // ✅ Save token in localStorage
      localStorage.setItem("campusconnect-token", res.data.token);
      localStorage.setItem("campusconnect-user", JSON.stringify(res.data.user));
      alert("Login successful ✅");

      // Reset form
      setFormData({ email: '', password: '' });
      navigate("/feed");
    } catch (err) {
      alert("Login failed ❌");
      console.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
