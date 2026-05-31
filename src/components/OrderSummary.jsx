import React from 'react';

const getPaymentMethodLabel = (method) => {
  const methods = {
    cod: 'Thanh toán khi nhận hàng (COD)',
    bank: 'Chuyển khoản ngân hàng',
  };
  return methods[method] || method;
};

export const OrderSummary = ({
  items,
  total,
  fullname,
  phone,
  address,
  paymentMethod,
}) => {
  return (
    <div className="checkout-form-wrapper">
      <div className="order-summary">
        <h2 className="order-summary-title">TÓM TẮT ĐƠN HÀNG</h2>

        {/* Items */}
        <div className="order-items">
          {items.map((item) => (
            <div key={item.id} className="order-item">
              <div className="order-item-info">
                <span className="order-item-name">{item.name}</span>
                <span className="order-item-quantity">x{item.quantity}</span>
              </div>
              <span className="order-item-price">
                {(item.price * item.quantity).toLocaleString('vi-VN')} đ
              </span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="order-total">
          <span>Tổng cộng:</span>
          <span className="total-amount">{total.toLocaleString('vi-VN')} đ</span>
        </div>

        {/* Delivery Info */}
        <div className="order-delivery-info">
          <h3 className="delivery-info-title">Thông tin giao hàng</h3>
          <div className="delivery-info-item">
            <strong>Tên:</strong>
            <span>{fullname}</span>
          </div>
          <div className="delivery-info-item">
            <strong>Số điện thoại:</strong>
            <span>{phone}</span>
          </div>
          <div className="delivery-info-item">
            <strong>Địa chỉ:</strong>
            <span>{address}</span>
          </div>

          <h3 className="delivery-info-title">Phương thức thanh toán</h3>
          <div className="delivery-info-item">
            <strong>Hình thức:</strong>
            <span>{getPaymentMethodLabel(paymentMethod)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
