import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Thêm dòng này
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { LoginForm } from '../components/LoginForm';
import { AccountInfo } from '../components/AccountInfo';

export const Account = () => {
  const { currentUser, login, logout } = useContext(AuthContext);
  const { orders } = useContext(CartContext);
  
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (email, password) => {
    setIsLoading(true);
    setError('');

    try {
      const result = await login(email, password);
      if (!result.success) {
        setError(result.message);
      } else {
        const origin = location.state?.from?.pathname || '/account';
        if (origin !== '/account') {
          navigate(origin);
        }
      }
    } catch (err) {
      setError('Lỗi đăng nhập. Vui lòng thử lại.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <LoginForm
        onSubmit={handleLogin}
        error={error}
        isLoading={isLoading}
      />
    );
  }

  return (
    <AccountInfo
      user={currentUser}
      orders={orders}
      onLogout={logout}
    />
  );
};