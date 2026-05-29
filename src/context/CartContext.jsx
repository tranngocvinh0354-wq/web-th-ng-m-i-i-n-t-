import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('perfume_cart');
    const savedOrders = localStorage.getItem('perfume_orders');
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  useEffect(() => {
    localStorage.setItem('perfume_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id, amount) => {
    setCart(prevCart =>
      prevCart.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + amount;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean)
    );
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const getCartCount = () => cart.reduce((sum, item) => sum + item.quantity, 0);
  const getCartTotal = () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const createOrder = (shippingData, paymentMethod, userId) => {
    const newOrder = {
      id: Date.now(),
      userId: userId,
      date: new Date().toISOString(),
      items: [...cart],
      total: getCartTotal(),
      shipping: shippingData,
      payment: paymentMethod,
      status: 'Đã đặt hàng'
    };

    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem('perfume_orders', JSON.stringify(updatedOrders));
    setCart([]);
    return newOrder;
  };

  return (
    <CartContext.Provider value={{
      cart, isCartOpen, setIsCartOpen, addToCart, 
      updateQuantity, removeFromCart, getCartCount, 
      getCartTotal, createOrder, orders
    }}>
      {children}
    </CartContext.Provider>
  );
};