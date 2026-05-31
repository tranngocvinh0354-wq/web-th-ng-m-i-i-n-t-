import React, { useState } from 'react';
import './LoginForm.css';

const DEMO_CREDENTIALS = {
  email: 'tranvanA@123.com',
  password: 'password123',
};

export const LoginForm = ({ onSubmit, error: externalError, isLoading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const validateForm = () => {
    if (!email.trim()) {
      setValidationError('Vui lòng nhập email');
      return false;
    }
    if (!email.includes('@')) {
      setValidationError('Email không hợp lệ');
      return false;
    }
    if (!password.trim()) {
      setValidationError('Vui lòng nhập mật khẩu');
      return false;
    }
    setValidationError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSubmit(email, password);
  };

  const fillDemo = () => {
    setEmail(DEMO_CREDENTIALS.email);
    setPassword(DEMO_CREDENTIALS.password);
    setValidationError('');
  };

  const error = validationError || externalError;

  return (
    <div className="login-container">
      <h2 className="login-title">ĐĂNG NHẬP</h2>

      <form onSubmit={handleSubmit} className="login-form">
        {error && <div className="login-error">{error}</div>}

        <div className="form-group">
          <label htmlFor="email" className="form-label">EMAIL</label>
          <input
            id="email"
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setValidationError('');
            }}
            placeholder="tranvanA@123.com"
            required
            disabled={isLoading}
            aria-label="Email address"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">MẬT KHẨU</label>
          <input
            id="password"
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setValidationError('');
            }}
            placeholder="password123"
            required
            disabled={isLoading}
            aria-label="Password"
          />
        </div>

        <button
          className="login-submit-btn"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'ĐANG ĐĂNG NHẬP...' : 'ĐĂNG NHẬP'}
        </button>
      </form>

      <div className="demo-note">
        🔐 Demo: {DEMO_CREDENTIALS.email} / {DEMO_CREDENTIALS.password}
      </div>

      <div className="demo-button-container">
        <button onClick={fillDemo} className="fill-demo-btn">
          Điền Demo
        </button>
      </div>
    </div>
  );
};