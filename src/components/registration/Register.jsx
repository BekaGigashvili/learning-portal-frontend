import React, { useState } from 'react';
import './Register.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await axios.post('http://localhost:8080/registration/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setSuccess(res.data);
      setTimeout(() => {
        navigate('/login'); // Adjust path if your login route is different
      }, 3000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'მოხდა შეცდომა';
      setError(errorMsg);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>რეგისტრაცია</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="firstName" placeholder="სახელი" value={formData.firstName} onChange={handleChange} required />
          <input type="text" name="lastName" placeholder="გვარი" value={formData.lastName} onChange={handleChange} required />
          <input type="email" name="email" placeholder="მეილი" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="პაროლი" value={formData.password} onChange={handleChange} required />
          <button type="submit">დარეგისტრირდი</button>
          <div className='back-link'>
            <a href="/login">უკვე გაქვთ ანგარიში?</a>
          </div>
        </form>

        {error && <p style={{ color: 'crimson', textAlign: 'center' }}>მოხდა შეცდომა</p>}
        {success && <p style={{ color: 'green', textAlign: 'center' }}>შეამოწმეთ მეილი</p>}

      </div>
    </div>
  );
};

export default Register;
