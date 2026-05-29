import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { CartButton } from './CartButton';
import './Header.css';

export const Header = () => {
  const cartContext = useContext(CartContext);
  const location = useLocation(); // ← Lấy pathname hiện tại

  if (!cartContext) {
    console.error('Header must be inside CartContext provider');
    return null;
  }

  // Kiểm tra xem có đang ở trang Account không
  const isAccountPage = location.pathname === '/account';

  // Nếu đang ở Account → hiển thị nút Trang Chủ
  // Nếu không ở Account → hiển thị nút Tài Khoản
  const navLink = isAccountPage ? '/' : '/account';
  const navText = isAccountPage ? '🏠 TRANG CHỦ' : '👤 TÀI KHOẢN';
  const navTitle = isAccountPage ? 'Về trang chủ' : 'Đến trang tài khoản';

  return (
    <header className="header-container">
      {/* Nút bên trái - Thay đổi theo trang */}
      <div className="header-left">
        <Link 
          to={navLink} 
          className="btn-account" 
          title={navTitle}
        >
          {navText}
        </Link>
      </div>

      {/* Logo chính giữa màn hình */}
      <div className="header-center">
        <h1 className="chanel-title">
          <Link to="/" title="Về trang chủ">
            CHANEL
          </Link>
        </h1>
        <p className="chanel-subtitle">Nghệ thuật của sự quyến rũ</p>
      </div>

      {/* Nút bên phải - Giỏ hàng */}
      <div className="header-right">
        <CartButton />
      </div>
    </header>
  );
};

export default React.memo(Header);