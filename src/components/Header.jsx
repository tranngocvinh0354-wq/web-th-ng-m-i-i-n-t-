import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { CartButton } from './CartButton';
import './Header.css';

export const Header = () => {
  const cartContext = useContext(CartContext);
  const location = useLocation();

  if (!cartContext) {
    console.error('Header must be inside CartContext provider');
    return null;
  }

  const isAccountPage = location.pathname === '/account';

  const navLink = isAccountPage ? '/' : '/account';
  const navText = isAccountPage ? '🏠 TRANG CHỦ' : '👤 TÀI KHOẢN';
  const navTitle = isAccountPage ? 'Về trang chủ' : 'Đến trang tài khoản';

  return (
    <header className="header-container">
      <div className="header-left">
        <Link 
          to={navLink} 
          className="btn-account" 
          title={navTitle}
        >
          {navText}
        </Link>
      </div>

      <div className="header-center">
        <h1 className="chanel-title">
          <Link to="/" title="Về trang chủ">
            CHANEL
          </Link>
        </h1>
        <p className="chanel-subtitle">Nghệ thuật của sự quyến rũ</p>
      </div>

      <div className="header-right">
        <CartButton />
      </div>
    </header>
  );
};

export default React.memo(Header);