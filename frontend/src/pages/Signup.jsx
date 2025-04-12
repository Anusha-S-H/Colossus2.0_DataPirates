import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignup = async () => {
    const { name, email, password } = formData;
    if (!name || !email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/signup',
        JSON.stringify({ name, email, password }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      alert('Signup successful!');
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);
      console.error('Error details:', error.response?.data);
      alert(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.formBox}>
        <h2 style={styles.heading}>Sign Up</h2>
        <input
          name="name"
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
        />
        <button onClick={handleSignup} style={styles.button}>Sign Up</button>
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    background: 'linear-gradient(to right, #f6d365, #fda085)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formBox: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    width: '320px',
  },
  heading: {
    fontSize: '28px',
    color: '#303c6c',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  button: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#303c6c',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};

export default Signup;
