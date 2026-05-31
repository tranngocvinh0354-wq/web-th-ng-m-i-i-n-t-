import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { perfumeData } from '../api/MockData';
import { FilterBar } from '../components/FilterBar';
import { PromoSection } from '../components/PromoSection';
import { useProductFilter } from '../hooks/useProductFilter';
import './Home.css';

const PROMO_DATA = [
  {
    id: 'no5-edt',
    subtitle: 'PHIÊN BẢN MỚI',
    title: 'N°5 EAU DE TOILETTE',
    description: 'Một tuyên ngôn mùi hương chân thực và khác biệt. Phiên bản Eau de Toilette mang hương thơm của đóa hoa trừu tượng huyền thoại, điểm xuyết nốt hương gỗ ấm áp, xuất hiện trong diện mạo mới lấy cảm hứng từ thiết kế chai tinh giản năm 1924.',
    image: '/assets/image/N5DETOILETTE.webp',
    productLink: '/product/2',
  },
  {
    id: 'no5-edp',
    subtitle: 'BIỂU TƯỢNG TỐI THƯỢNG',
    title: 'N°5 EAU DE PARFUM',
    description: 'Bản hòa ca rực rỡ của hương hoa nhài và hoa hồng May được nâng tầm bởi sức hút bí ẩn của andehit. Tất cả hòa quyện tạo nên một đóa hoa trừu tượng vượt thời gian, nồng nàn và quyến rũ.',
    image: '/assets/image/N5DEPARFUM.webp',
    productLink: '/product/1',
    reverse: true,
  },
  {
    id: 'no5-leau',
    subtitle: 'TINH THẦN HIỆN ĐẠI',
    title: 'N°5 L\'EAU',
    description: 'Lời ngợi ca sự thuần khiết và tinh thần tự do. Sự bùng nổ của cam chanh tràn đầy sức sống khéo léo dẫn lối vào trái tim của những cánh hoa, khởi đầu ngày mới với cảm giác thanh thoát như sương mai.',
    image: '/assets/image/N5LEAUU1.webp',
    productLink: '/product/3',
  },
];

export const Home = () => {
  const cartContext = useContext(CartContext);
  const [activeFilter, setActiveFilter] = useState('all');

  
  const { addToCart } = cartContext;
  
  // Dùng hook filter
  const filteredProducts = useProductFilter(perfumeData, activeFilter);
  
  // Guard context
  if (!cartContext) {
    console.error('Home must be inside CartContext provider');
    return null;
  }
  return (
    <div style={{ paddingTop: '140px' }}>
      {/* ================= FILTER BAR ================= */}
      <div className="container mb-5">
        <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      </div>

      {/* ================= PRODUCT GRID ================= */}
      <div className="container mb-5">
        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => addToCart(product)}
              />
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center', color: '#999', padding: '40px' }}>
            Không có sản phẩm nào phù hợp
          </p>
        )}
      </div>

      {/* ================= PROMO SECTIONS ================= */}
      <div className="promo-sections">
        {PROMO_DATA.map((promo) => (
          <PromoSection
            key={promo.id}
            subtitle={promo.subtitle}
            title={promo.title}
            description={promo.description}
            image={promo.image}
            productLink={promo.productLink}
            reverse={promo.reverse}
          />
        ))}
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="home-footer">
        <p className="home-footer-text">
          &copy; {new Date().getFullYear()} CHANEL STYLE 
        </p>
      </footer>
    </div>
  );
};

// Product Card Component
const ProductCard = ({ product, onAddToCart }) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      onAddToCart(product);
      // Optional: show toast notification
      setTimeout(() => setIsAdding(false), 300);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setIsAdding(false);
    }
  };

  return (
    <div className="product-card">
      <a href={`/product/${product.id}`} className="product-img-wrapper">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
        />
      </a>

      <div className="product-info">
        <p className="category-tag">{product.category}</p>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">
          {product.price.toLocaleString('vi-VN')} VNĐ
        </p>

        <button
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          disabled={isAdding}
          aria-label={`Thêm ${product.name} vào giỏ hàng`}
        >
          {isAdding ? 'ĐANG THÊM...' : 'THÊM VÀO GIỎ'}
        </button>
      </div>
    </div>
  );
};

export default Home;