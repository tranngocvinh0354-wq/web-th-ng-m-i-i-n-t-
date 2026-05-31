import React, { useState, useEffect, useCallback } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const BANK_INFO = {
  bankName: 'Vietcombank',
  accountNumber: '1234567890',
  accountHolder: 'CHANEL PERFUME',
  amount: 0,
};

export const QRCodePayment = ({ total, onConfirm, onBack }) => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [qrValue, setQrValue] = useState('');
  const [isExpired, setIsExpired] = useState(false);

  // Generate QR code data - wrapped in useCallback
  const generateQRCode = useCallback(() => {
    // QR value: formatted bank transfer info
    const qrData = `${BANK_INFO.bankName}|${BANK_INFO.accountNumber}|${BANK_INFO.accountHolder}|${total}`;
    setQrValue(qrData);
    setTimeLeft(60);
    setIsExpired(false);
  }, [total]);

  // Generate QR on mount
  useEffect(() => {
    generateQRCode();
  }, [generateQRCode]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const qrRef = React.useRef();

  const downloadQR = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (!canvas) return;

    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = 'qr-payment.png';
    link.click();
  };

  return (
    <div className="checkout-form-wrapper">
      <div className="qr-payment-container">
        <h2 className="qr-title">Chuyển khoản ngân hàng</h2>

        {/* QR Code Section */}
        <div className="qr-section">
          <div
            className={`qr-code-box ${isExpired ? 'expired' : ''}`}
            ref={qrRef}
          >
            {qrValue && (
              <QRCodeCanvas
                value={qrValue}
                size={250}
                level="H"
                includeMargin={true}
              />
            )}
          </div>

          {/* Countdown Timer */}
          <div className={`qr-timer ${isExpired ? 'expired' : ''}`}>
            <span className="timer-label">Hết hạn trong:</span>
            <span className="timer-value">{formatTime(timeLeft)}</span>
            {isExpired && <span className="expired-text">Mã QR đã hết hạn</span>}
          </div>

          {/* Refresh Button */}
          <button
            className="btn btn-secondary"
            onClick={generateQRCode}
            style={{ marginTop: '15px' }}
          >
            🔄 LÀM MỚI MÃ QR
          </button>

          {/* Download Button */}
          <button
            className="btn btn-secondary"
            onClick={downloadQR}
            style={{ marginTop: '10px' }}
          >
            💾 TẢI VỀ QR
          </button>
        </div>

        {/* Bank Info Section */}
        <div className="bank-info-section">
          <h3 className="bank-info-title">Thông tin chuyển khoản</h3>

          <div className="bank-info-item">
            <strong>Ngân hàng:</strong>
            <span>{BANK_INFO.bankName}</span>
          </div>

          <div className="bank-info-item">
            <strong>Số tài khoản:</strong>
            <span className="account-number">{BANK_INFO.accountNumber}</span>
          </div>

          <div className="bank-info-item">
            <strong>Chủ tài khoản:</strong>
            <span>{BANK_INFO.accountHolder}</span>
          </div>

          <div className="bank-info-item">
            <strong>Số tiền:</strong>
            <span className="amount">{total.toLocaleString('vi-VN')} đ</span>
          </div>

          <div className="bank-info-note">
            ⚠️ Vui lòng chuyển đủ số tiền đúng như trên. Sau khi chuyển khoản thành công, vui lòng ấn "TIẾP TỤC".
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="checkout-actions">
        <button className="btn btn-outline" onClick={onBack}>
          QUAY LẠI
        </button>
        <button className="btn btn-primary" onClick={onConfirm}>
          ĐÃ CHUYỂN KHOẢN - TIẾP TỤC
        </button>
      </div>
    </div>
  );
};