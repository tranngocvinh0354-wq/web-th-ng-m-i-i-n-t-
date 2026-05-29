import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import './Checkout.css';

export const Checkout = () => {
  const { cart, getCartTotal, createOrder } = useContext(CartContext);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [fullname, setFullname] = useState(currentUser ? currentUser.name : '');
  const [phone, setPhone] = useState(currentUser ? currentUser.phone : '');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleNextStep1 = (e) => {
    e.preventDefault();
    if (!fullname || !phone || !address) return alert('Vui lòng điền đầy đủ thông tin');
    setCurrentStep(2);
  };

  const handleNextStep2 = (e) => {
    e.preventDefault();
    if (!paymentMethod) return alert('Vui lòng chọn phương thức thanh toán');
    setCurrentStep(3);
  };

  const handleSubmitOrder = () => {
    if (!currentUser) {
      alert('Vui lòng đăng nhập trước khi mua hàng');
      return navigate('/account');
    }
    if (cart.length === 0) return alert('Giỏ hàng của bạn đang trống');

    createOrder({ fullname, phone, address }, paymentMethod, currentUser.id);
    alert('Đặt hàng thành công!');
    navigate('/account');
  };

  return (
    <div className="checkout-container" style={{ paddingTop: '18px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', fontFamily: 'serif', letterSpacing: '2px' }}>THANH TOÁN</h1>
      
      <div className="checkout-steps" style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '40px' }}>
        <div className={`step ${currentStep === 1 ? 'active' : currentStep > 1 ? 'completed' : ''}`}>
          <div className="step-number">1</div><div className="step-label">Thông tin giao hàng</div>
        </div>
        <div className={`step ${currentStep === 2 ? 'active' : currentStep > 2 ? 'completed' : ''}`}>
          <div className="step-number">2</div><div className="step-label">Phương thức thanh toán</div>
        </div>
        <div className={`step ${currentStep === 3 ? 'active' : ''}`}>
          <div className="step-number">3</div><div className="step-label">Xác nhận đơn hàng</div>
        </div>
      </div>

      {currentStep === 1 && (
        <form onSubmit={handleNextStep1} className="checkout-form" style={{ maxWidth: '450px', margin: '0 auto' }}>
          <div className="form-group">
            <label>HỌ TÊN</label>
            <input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} required />
          </div>
          <div className="form-group" style={{ marginTop: '15px' }}>
            <label>SỐ ĐIỆN THOẠI</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <div className="form-group" style={{ marginTop: '15px' }}>
            <label>ĐỊA CHỈ</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Số nhà, đường, quận..." required />
          </div>
          <button className="btn-primary w-100" type="submit" style={{ marginTop: '25px', padding: '14px' }}>TIẾP TỤC</button>
        </form>
      )}
      
      {currentStep === 2 && (
        <form onSubmit={handleNextStep2} className="checkout-form" style={{ maxWidth: '450px', margin: '0 auto' }}>
          <div className="form-group">
            <label>CHỌN PHƯƠNG THỨC THANH TOÁN</label>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required style={{ padding: '12px', width: '100%' }}>
              <option value="">-- Chọn --</option>
              <option value="cod">Thanh toán khi nhận hàng (COD)</option>
              <option value="bank">Chuyển khoản ngân hàng</option>
            </select>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '25px' }}>
            <button className="btn-outline" type="button" onClick={() => setCurrentStep(1)}>QUAY LẠI</button>
            <button className="btn-primary" type="submit">TIẾP TỤC</button>
          </div>
        </form>
      )}

      {currentStep === 3 && (
        <div className="checkout-form" style={{ maxWidth: '550px', margin: '0 auto' }}>
          <div className="order-summary" style={{ background: '#f9f9f9', padding: '25px', marginBottom: '25px' }}>
            <h3 style={{ fontFamily: 'serif', marginBottom: '15px' }}>TÓM TẮT ĐƠN HÀNG</h3>
            {cart.map((item) => (
              <div className="summary-item" key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px' }}>
                <span>{item.name} x{item.quantity}</span>
                <span>{(item.price * item.quantity).toLocaleString()}đ</span>
              </div>
            ))}
            <div className="summary-total" style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #ddd', paddingTop: '15px', fontWeight: 'bold', marginTop: '15px' }}>
              <span>Tổng cộng:</span><span>{getCartTotal().toLocaleString()}đ</span>
            </div>
            <div style={{ marginTop: '20px', fontSize: '13px', borderTop: '1px solid #eee', paddingTop: '10px' }}>
              <strong>Địa chỉ nhận hàng:</strong> {fullname} - {phone} ({address}) <br />
              <strong>Hình thức:</strong> {paymentMethod === 'cod' ? 'COD' : 'Chuyển khoản'}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button className="btn-outline" type="button" onClick={() => setCurrentStep(2)}>QUAY LẠI</button>
            <button className="btn-primary" type="button" onClick={handleSubmitOrder}>XÁC NHẬN ĐẶT HÀNG</button>
          </div>
        </div>
      )}
    </div>
  );
};