import React from 'react';

const PAYMENT_OPTIONS = [
  {
    value: 'cod',
    label: 'Thanh toán khi nhận hàng (COD)',
    description: 'Thanh toán bằng tiền mặt khi nhận hàng',
  },
  {
    value: 'bank',
    label: 'Chuyển khoản ngân hàng',
    description: 'Chuyển tiền vào tài khoản ngân hàng của cửa hàng',
  },
];

export const PaymentForm = ({
  paymentMethod,
  onUpdate,
  onSubmit,
  onBack,
}) => {
  return (
    <form onSubmit={onSubmit} className="checkout-form-wrapper">
      <div className="checkout-form">
        <label className="form-label">PHƯƠNG THỨC THANH TOÁN</label>

        <div className="payment-options">
          {PAYMENT_OPTIONS.map((option) => (
            <label key={option.value} className="payment-option">
              <input
                type="radio"
                name="paymentMethod"
                value={option.value}
                checked={paymentMethod === option.value}
                onChange={(e) => onUpdate(e.target.value)}
                aria-label={option.label}
              />
              <div className="payment-option-content">
                <span className="payment-option-label">{option.label}</span>
                <span className="payment-option-description">
                  {option.description}
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="checkout-actions">
        <button
          className="btn btn-outline"
          type="button"
          onClick={onBack}
        >
          QUAY LẠI
        </button>
        <button className="btn btn-primary" type="submit">
          TIẾP TỤC
        </button>
      </div>
    </form>
  );
};
