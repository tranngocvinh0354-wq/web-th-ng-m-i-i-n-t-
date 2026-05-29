import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './CartDrawer.css';

export const CartDrawer = () => {
  const { isCartOpen, setIsCartOpen, cart, updateQuantity, removeFromCart, getCartTotal } = useContext(CartContext);
  const navigate = useNavigate();

  const handleGoToCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <>
      <div id="cart-drawer" className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Giỏ hàng của bạn</h2>
          <button id="close-cart" onClick={() => setIsCartOpen(false)}>✕</button>
        </div>

        <div id="cart-items-list" className="cart-items">
          {cart.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '40px' }}>Giỏ hàng trống</p>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img className="cart-item-img" src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <h4 style={{ fontSize: '14px', margin: '0 0 5px 0' }}>{item.name}</h4>
                  <p className="cart-item-price" style={{ margin: '0 0 10px 0' }}>{item.price.toLocaleString()}đ</p>
                  <div className="cart-item-quantity">
                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                    <button onClick={() => removeFromCart(item.id)} style={{ border: 'none', background: 'none', marginLeft: '10px' }}>🗑</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="cart-total">
            <span>Tổng cộng:</span>
            <span>{getCartTotal().toLocaleString()}đ</span>
          </div>
          <button className="checkout-btn" onClick={handleGoToCheckout}>
            THANH TOÁN
          </button>
        </div>
      </div>

      <div className={`overlay ${isCartOpen ? 'active' : ''}`} onClick={() => setIsCartOpen(false)}></div>
    </>
  );
};