import React from 'react';

export const DeliveryForm = ({ formData, onUpdate, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="checkout-form-wrapper">
      <div className="checkout-form">
        <div className="form-group">
          <label htmlFor="fullname" className="form-label">
            HỌ TÊN
          </label>
          <input
            id="fullname"
            type="text"
            className="form-input"
            value={formData.fullname}
            onChange={(e) => onUpdate('fullname', e.target.value)}
            placeholder="Nhập họ tên đầy đủ"
            required
            aria-label="Họ tên"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            SỐ ĐIỆN THOẠI
          </label>
          <input
            id="phone"
            type="tel"
            className="form-input"
            value={formData.phone}
            onChange={(e) => onUpdate('phone', e.target.value)}
            placeholder="Nhập số điện thoại"
            required
            aria-label="Số điện thoại"
          />
        </div>

        <div className="form-group">
          <label htmlFor="address" className="form-label">
            ĐỊA CHỈ
          </label>
          <input
            id="address"
            type="text"
            className="form-input"
            value={formData.address}
            onChange={(e) => onUpdate('address', e.target.value)}
            placeholder="Số nhà, đường, quận, thành phố..."
            required
            aria-label="Địa chỉ giao hàng"
          />
        </div>
      </div>

      <button className="btn btn-primary" type="submit">
        TIẾP TỤC
      </button>
    </form>
  );
};
