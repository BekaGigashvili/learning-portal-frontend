import React, { useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:8080/auth/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const token = res.data.token;
      localStorage.setItem('token', token);
      navigate('/profile');

    } catch (err) {
        const errorMsg = err.response?.data?.message || 'მოხდა შეცდომა';
        setError(errorMsg);
        console.log('error');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>ავტორიზაცია</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="მეილი" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="პაროლი" value={formData.password} onChange={handleChange} required />
          <button type="submit">ავტორიზაცია</button>
          <div className='back-link'>
            <a href="/register">არ გაქვთ ანგარიში?</a>
          </div>
        </form>

        {error && <p style={{ color: 'crimson', textAlign: 'center' }}>{error}</p>}

      </div>
    </div>
  );
};

export default Register;
