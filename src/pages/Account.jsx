import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Thêm dòng này
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { LoginForm } from '../components/LoginForm';
import { AccountInfo } from '../components/AccountInfo';

export const Account = () => {
  const { currentUser, login, logout } = useContext(AuthContext);
  const { orders } = useContext(CartContext);
  
  const navigate = useNavigate(); // Thêm dòng này
  const location = useLocation(); // Thêm dòng này

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
        // ĐĂNG NHẬP THÀNH CÔNG: Kiểm tra xem trước đó user đang ở đâu
        const origin = location.state?.from?.pathname || '/account';
        // Nếu họ bị đẩy từ trang khác tới (ví dụ /checkout), hãy trả họ về đó
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

  // ... (Phần code hiển thị LoginForm và AccountInfo giữ nguyên)
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