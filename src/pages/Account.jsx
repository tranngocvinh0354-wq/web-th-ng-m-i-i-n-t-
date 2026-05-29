import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { LoginForm } from '../components/LoginForm';
import { AccountInfo } from '../components/AccountInfo';

export const Account = () => {
  const { currentUser, login, logout } = useContext(AuthContext);
  const { orders } = useContext(CartContext);

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (email, password) => {
    setIsLoading(true);
    setError('');

    try {
      const result = await login(email, password);
      if (!result.success) {
        setError(result.message);
      }
      // Nếu login thành công, AuthContext sẽ update currentUser
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