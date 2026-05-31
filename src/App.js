import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import { Header } from './components/Header';
import { CartDrawer } from './components/CartDrawer';
import { Home } from './pages/Home';
import { Account } from './pages/Account';
import { Checkout } from './pages/Checkout';
import { ProductDetail } from './pages/ProductDetail';
import { ProtectedRoute } from './components/ProtectedRoute'; // Đã import màng lọc bảo vệ

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="bg-white" style={{ minHeight: '100vh' }}>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/account" element={<Account />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              
              {/* Trang Checkout đã được bọc lại để bảo mật */}
              <Route 
                path="/checkout" 
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                } 
              />
            </Routes>
            <CartDrawer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;