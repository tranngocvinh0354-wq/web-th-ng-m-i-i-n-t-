import { useMemo } from 'react';

export const useProductFilter = (products = [], activeFilter) => {
  return useMemo(() => {
    // Guard clause: Nếu không có mảng products thì trả về mảng rỗng
    if (!products || products.length === 0) return [];

    const categoryMap = {
      floral: ['HƯƠNG HOA', 'FLORAL'],
      woody: ['HƯƠNG GỖ', 'WOODY'],
      fresh: ['TƯƠI MÁT', 'FRESH', 'EAU DE TOILETTE'],
    };

    if (activeFilter === 'all') return products;

    const categories = categoryMap[activeFilter] || [];
    
    return products.filter((product) => {
      // Đảm bảo category tồn tại trước khi gọi toUpperCase()
      const productCategory = product?.category?.toUpperCase() || '';
      return categories.some((cat) => productCategory.includes(cat));
    });
  }, [products, activeFilter]);
};