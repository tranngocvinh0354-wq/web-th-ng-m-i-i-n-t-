import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export const CartButton = () => {
  const context = useContext(CartContext);

  // Guard: nếu CartContext không tồn tại
  if (!context) {
    console.error('CartButton must be used inside CartContext provider');
    return null;
  }

  const { getCartCount, setIsCartOpen } = context;

  const handleOpenCart = () => {
    setIsCartOpen(true);
  };

  const cartCount = getCartCount();

  return (
    <button
      className="btn-cart"
      onClick={handleOpenCart}
      aria-label={`Mở giỏ hàng, ${cartCount} sản phẩm`}
      title={`Giỏ hàng (${cartCount} sản phẩm)`}
    >
      🛒
      {cartCount > 0 && (
        <span className="cart-badge" aria-hidden="true">
          {cartCount}
        </span>
      )}
    </button>
  );
};