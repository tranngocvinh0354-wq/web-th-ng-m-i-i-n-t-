import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { StepIndicator } from '../components/StepIndicator';
import { DeliveryForm } from '../components/DeliveryForm';
import { PaymentForm } from '../components/PaymentForm';
import { QRCodePayment } from '../components/QRCodePayment';
import { OrderSummary } from '../components/OrderSummary';
import './Checkout.css';

export const Checkout = () => {
  // 1️⃣ GỌI HOOKS TRƯỚC TIÊN
  const cartContext = useContext(CartContext);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullname: '',
    phone: '',
    address: '',
    paymentMethod: '',
  });

  useEffect(() => {
    if (authContext?.currentUser) {
      setFormData((prev) => ({
        ...prev,
        fullname: authContext.currentUser.name || '',
        phone: authContext.currentUser.phone || '',
      }));
    }
  }, [authContext?.currentUser]);

  // 2️⃣ GUARD CHECK (SAU HOOKS)
  if (!cartContext || !authContext) {
    return (
      <div className="checkout-container">
        <p style={{ textAlign: 'center', color: '#999', padding: '40px' }}>
          Có lỗi xảy ra. Vui lòng thử lại.
        </p>
      </div>
    );
  }

  const { cart, getCartTotal, createOrder } = cartContext;
  const { currentUser } = authContext;

  // Update form field
  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  // Step 1: Validate delivery info
  const handleDeliverySubmit = (e) => {
    e.preventDefault();

    if (!formData.fullname.trim()) {
      setError('Vui lòng nhập họ tên');
      return;
    }

    if (!formData.phone.trim()) {
      setError('Vui lòng nhập số điện thoại');
      return;
    }

    if (!formData.address.trim()) {
      setError('Vui lòng nhập địa chỉ');
      return;
    }

    setError('');
    setCurrentStep(2);
  };

  // Step 2: Validate payment method
  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    if (!formData.paymentMethod) {
      setError('Vui lòng chọn phương thức thanh toán');
      return;
    }

    setError('');

    // Nếu chọn ngân hàng → đi step 2.5 (QR Code)
    // Nếu chọn COD → đi step 3 (Order Summary)
    if (formData.paymentMethod === 'bank') {
      setCurrentStep(2.5);
    } else {
      setCurrentStep(3);
    }
  };

  // Step 2.5: QR Code Payment Confirmed
  const handleQRCodeConfirm = () => {
    setError('');
    setCurrentStep(3);
  };

  // Step 3: Submit order
  const handleSubmitOrder = async () => {
    if (!currentUser) {
      setError('Vui lòng đăng nhập trước khi mua hàng');
      return;
    }

    if (cart.length === 0) {
      setError('Giỏ hàng của bạn đang trống');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const orderData = {
        fullname: formData.fullname,
        phone: formData.phone,
        address: formData.address,
      };

      createOrder(orderData, formData.paymentMethod, currentUser.id);

      navigate('/account', {
        state: {
          message: 'Đặt hàng thành công! Kiểm tra lịch sử đơn hàng của bạn.',
        },
      });
    } catch (err) {
      setError(
        err.message || 'Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.'
      );
      setIsSubmitting(false);
    }
  };

  // Step indicators - hiển thị 4 bước nếu chọn bank, 3 bước nếu COD
  const steps = [
    { number: 1, label: 'Thông tin giao hàng' },
    { number: 2, label: 'Phương thức thanh toán' },
    ...(formData.paymentMethod === 'bank'
      ? [{ number: 2.5, label: 'Xác nhận QR' }]
      : []),
    { number: 3, label: 'Xác nhận đơn hàng' },
  ];

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">THANH TOÁN</h1>

      <StepIndicator steps={steps} currentStep={currentStep} />

      {error && <div className="error-message">{error}</div>}

      {/* Step 1: Delivery Info */}
      {currentStep === 1 && (
        <DeliveryForm
          formData={formData}
          onUpdate={updateFormData}
          onSubmit={handleDeliverySubmit}
        />
      )}

      {/* Step 2: Payment Method */}
      {currentStep === 2 && (
        <PaymentForm
          paymentMethod={formData.paymentMethod}
          onUpdate={(value) => updateFormData('paymentMethod', value)}
          onSubmit={handlePaymentSubmit}
          onBack={() => setCurrentStep(1)}
        />
      )}

      {/* Step 2.5: QR Code Payment (chỉ hiển thị nếu chọn bank) */}
      {currentStep === 2.5 && (
        <QRCodePayment
          total={getCartTotal()}
          onConfirm={handleQRCodeConfirm}
          onBack={() => setCurrentStep(2)}
        />
      )}

      {/* Step 3: Order Confirmation */}
      {currentStep === 3 && (
        <OrderConfirmation
          formData={formData}
          cart={cart}
          total={getCartTotal()}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmitOrder}
          onBack={() => {
            // Quay lại step 2 nếu chọn bank, hoặc step 2 nếu COD
            if (formData.paymentMethod === 'bank') {
              setCurrentStep(2.5);
            } else {
              setCurrentStep(2);
            }
          }}
        />
      )}
    </div>
  );
};

// ==================== ORDER CONFIRMATION COMPONENT ====================
const OrderConfirmation = ({
  formData,
  cart,
  total,
  isSubmitting,
  onSubmit,
  onBack,
}) => {
  return (
    <div className="checkout-form-wrapper">
      <OrderSummary
        items={cart}
        total={total}
        fullname={formData.fullname}
        phone={formData.phone}
        address={formData.address}
        paymentMethod={formData.paymentMethod}
      />

      <div className="checkout-actions">
        <button
          className="btn btn-outline"
          onClick={onBack}
          disabled={isSubmitting}
        >
          QUAY LẠI
        </button>
        <button
          className="btn btn-primary"
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'ĐANG XỬ LÝ...' : 'XÁC NHẬN ĐẶT HÀNG'}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
