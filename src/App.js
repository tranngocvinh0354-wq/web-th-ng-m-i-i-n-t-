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
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>
            <CartDrawer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;