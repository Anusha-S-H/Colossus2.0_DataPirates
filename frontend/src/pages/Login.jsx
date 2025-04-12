import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        { email, password }, // ✅ Send as plain object
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      alert('Login successful!');

      // Optional: route based on user role
      const userRole = response.data?.user?.role;

      if (userRole === 'Citizen') {
        navigate('/citizen-dashboard');
      } else if (userRole === 'Govt') {
        navigate('/govt-dashboard');
      } else if (userRole === 'NGO') {
        navigate('/ngo-dashboard');
      } else {
        navigate('/dashboard');
      }

    } catch (error) {
      console.error('Login error:', error);
      console.error('Error details:', error.response?.data);
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.formBox}>
        <h2 style={styles.heading}>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleLogin} style={styles.button}>Login</button>
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    background: 'linear-gradient(to right, #a8edea, #fed6e3)',
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

export default Login;
