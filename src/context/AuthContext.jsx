import React, { createContext, useState, useEffect } from 'react';
import { mockUsers } from '../api/MockData';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('perfume_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      
      // KIỂM TRA THÔNG MINH: Xem user trong máy có còn tồn tại trong MockData hiện tại không?
      const isValidUser = mockUsers.find(u => u.email === parsedUser.email);
      
      if (isValidUser) {
        setCurrentUser(parsedUser); // Nếu đúng là Trần Văn A (hoặc user hợp lệ) thì cho qua
      } else {
        // Nếu là dữ liệu cũ (như Nguyễn Thị Thanh), tự động xóa sạch
        localStorage.removeItem('perfume_user');
        setCurrentUser(null);
      }
    }
  }, []);

  const login = (email, password) => {
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (user) {
      const userData = { id: user.id, email: user.email, name: user.name, phone: user.phone };
      setCurrentUser(userData);
      localStorage.setItem('perfume_user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, message: 'Sai email hoặc mật khẩu' };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('perfume_user');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};