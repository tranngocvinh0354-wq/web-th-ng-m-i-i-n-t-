// src/api/MockData.js

export const perfumeData = [
  // ================= NHÓM HƯƠNG HOA (FLORAL) =================
  {
    id: '1',
    name: 'N°5 EAU DE PARFUM',
    category: 'Hương Hoa - Floral',
    price: 4500000,
    image: '/assets/image/N5DEPARFUM.webp',
    description: 'Bản hòa ca rực rỡ của hương hoa nhài và hoa hồng May được nâng tầm bởi sức hút bí ẩn của andehit.',
  },

  
  // ================= NHÓM TƯƠI MÁT (FRESH) =================
  {
    id: '2',
    name: 'N°5 EAU DE TOILETTE',
    category: 'Eau De Toilette - Tươi Mát',
    price: 3800000,
    image: '/assets/image/N5DETOILETTE.webp',
    description: 'Phiên bản Eau de Toilette mang hương thơm của đóa hoa trừu tượng huyền thoại, thanh thoát và nhẹ nhàng.',
  },
  {
    id: '3',
    name: 'N°5 L\'EAU',
    category: 'Hương Tươi Mát - Fresh',
    price: 4000000,
    image: '/assets/image/N5LEAUU1.webp',
    description: 'Sự bùng nổ của cam chanh tràn đầy sức sống khéo léo dẫn lối vào trái tim của những cánh hoa.',
  },

];
// ================= DỮ LIỆU USER ẢO =================
export const mockUsers = [
  {
    id: 1,
    username: 'admin',
    password: 'password123',
    name: 'Ngọc Vinh',
    phone: '0901234567',
    isVIP: true,
    role: 'admin'
  },
  {
    id: 2,
    username: 'user',
    password: '123',
    name: 'Khách hàng',
    phone: '0987654321',
    isVIP: false,
    role: 'customer'
  }
];