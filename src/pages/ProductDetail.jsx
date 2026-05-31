import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { perfumeData } from '../api/MockData';
import './ProductDetail.css';

export const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  
  const product = perfumeData.find((p) => String(p.id) === id);

  if (!product) {
    return (
      <div style={{ paddingTop: '200px', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h2 style={{ fontFamily: 'serif', letterSpacing: '1px' }}>Không tìm thấy sản phẩm</h2>
        <Link to="/" className="btn-outline" style={{ marginTop: '20px', display: 'inline-block' }}>
          Quay lại trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '200px', marginBottom: '80px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '50px' }}>
        
        <div style={{ flex: '1 1 450px', background: '#f4f5f6', padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img 
            src={product.image} 
            alt={product.name} 
            style={{ maxWidth: '100%', maxHeight: '50vh', objectFit: 'contain' }} 
          />
        </div>

        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column' }}>
          <span className="category-tag" style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '2px', color: '#666' }}>
            {product.category}
          </span>
          
          <h1 className="product-name" style={{ fontSize: '30px', fontFamily: 'serif', margin: '15px 0', borderBottom: '2px solid #000', paddingBottom: '15px', textTransform: 'uppercase', letterSpacing: '2px' }}>
            {product.name}
          </h1>
          
          <p className="product-price" style={{ fontSize: '20px', fontWeight: '600', margin: '15px 0', color: '#111' }}>

            {product.price?.toLocaleString() || '0'} VNĐ
          </p>
          
          <p style={{ fontSize: '14px', lineHeight: '1.8', color: '#555', marginBottom: '40px' }}>
            {product.description}
          </p>

          <div className="scent-experience" style={{ marginBottom: '40px' }}>
            <div className="note-box" style={{ borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
              <span className="note-label" style={{ fontSize: '11px', fontWeight: 'bold', color: '#666', letterSpacing: '1px' }}>HƯƠNG ĐẦU</span>

              <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#333', lineHeight: '1.5' }}>
                {product.notes?.top || 'Đang cập nhật...'}
              </p>
            </div>
            
            <div className="note-box" style={{ borderBottom: '1px solid #eee', padding: '15px 0' }}>
              <span className="note-label" style={{ fontSize: '11px', fontWeight: 'bold', color: '#666', letterSpacing: '1px' }}>HƯƠNG GIỮA</span>

              <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#333', lineHeight: '1.5' }}>
                {product.notes?.middle || 'Đang cập nhật...'}
              </p>
            </div>
            
            <div className="note-box" style={{ borderBottom: '1px solid #eee', padding: '15px 0' }}>
              <span className="note-label" style={{ fontSize: '11px', fontWeight: 'bold', color: '#666', letterSpacing: '1px' }}>HƯƠNG CUỐI</span>

              <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#333', lineHeight: '1.5' }}>
                {product.notes?.base || 'Đang cập nhật...'}
              </p>
            </div>
          </div>


          <button 
            className="btn-primary" 
            onClick={() => addToCart(product)}
            style={{ width: '100%', padding: '16px', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}
          >
            THÊM VÀO TÚI MUA HÀNG
          </button>
        </div>

      </div>
    </div>
  );
};