import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();

  if (!currentUser) {
    // Chưa đăng nhập -> Đẩy về trang Account và lưu lại link gốc
    return <Navigate to="/account" state={{ from: location }} replace />;
  }

  // Đã đăng nhập -> Cho phép đi tiếp vào Checkout
  return children;
};