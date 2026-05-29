import React from 'react';
import './AccountInfo.css';

export const AccountInfo = ({ user, orders, onLogout }) => {
  const userOrders = orders.filter((o) => o.userId === user.id);

  return (
    <div className="account-container">
      <div className="account-header">
        <div className="account-avatar">👤</div>
        <div className="account-user-info">
          <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
          <button
            onClick={onLogout}
            className="btn-outline"
            aria-label="Logout"
          >
            ĐĂNG XUẤT
          </button>
        </div>
      </div>

      <h3 className="account-section-title">📋 LỊCH SỬ ĐƠN HÀNG</h3>

      {userOrders.length === 0 ? (
        <p className="empty-message">Bạn chưa có đơn hàng nào.</p>
      ) : (
        <div className="orders-list">
          {userOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

const OrderCard = ({ order }) => {
  return (
    <div className="order-card">
      <div className="order-header">
        <span className="order-id">#{order.id}</span>
        <span className="order-date">
          {new Date(order.date).toLocaleDateString('vi-VN')}
        </span>
        <span className="order-status">{order.status}</span>
      </div>

      <div className="order-items">
        {order.items.map((item, idx) => (
          <div key={idx} className="order-item">
            {item.name} x{item.quantity}
          </div>
        ))}
      </div>

      <div className="order-total">
        Tổng: {order.total.toLocaleString()}đ
      </div>
    </div>
  );
};