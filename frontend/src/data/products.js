const baseFragrances = [
  { name: 'Imperial Gold', tagline: 'Warm • Rich • Royal', top: 'Bergamot, Citrus, Saffron', heart: 'Rose, Jasmine, Sandalwood', base: 'Amber, Vanilla, White Musk', category: 'Eau de Parfum', gender: 'Unisex', price: 1499, imageFile: 'imperialgold.png' },
  { name: 'Crimson Rouge', tagline: 'Sweet • Luxurious • Long Lasting', top: 'Saffron, Orange', heart: 'Jasmine, Amberwood', base: 'Ambergris, Cedarwood, Musk', category: 'Eau de Parfum', gender: 'Women', price: 1299, imageFile: 'creamsonrough.png' },
  { name: 'Velvet Lavender', tagline: 'Fresh • Calming • Elegant', top: 'Lavender, Bergamot', heart: 'Violet, White Flowers', base: 'Vanilla, White Musk', category: 'Eau de Parfum', gender: 'Women', price: 1199, imageFile: 'velvetlavender.png' },
  { name: 'Royal Oudh', tagline: 'Deep • Woody • Oriental', top: 'Cardamom, Rose', heart: 'Oud, Patchouli', base: 'Amber, Musk', category: 'Eau de Parfum', gender: 'Men', price: 1599, imageFile: 'royaloudh.png' },
  { name: 'Royal Sultan', tagline: 'Spicy • Royal • Rich', top: 'Pepper, Cardamom', heart: 'Rose, Cedar', base: 'Oud, Amber, Musk', category: 'Eau de Parfum', gender: 'Men', price: 1499, imageFile: 'royalsultan.png' },
  { name: 'White Velvet', tagline: 'Soft • Clean • Powdery', top: 'White Flowers, Aldehydes', heart: 'Jasmine, Iris', base: 'Vanilla, White Musk', category: 'Eau de Parfum', gender: 'Women', price: 1299, imageFile: 'whitevelvet.png' },
  { name: 'Sanaya', tagline: 'Floral • Feminine • Romantic', top: 'Peach, Rose', heart: 'Jasmine, Lily', base: 'Vanilla, Musk', category: 'Eau de Parfum', gender: 'Women', price: 1199, imageFile: 'sanaya.png' },
  { name: 'Majestic Musk', tagline: 'Clean • Musky • Sophisticated', top: 'Citrus', heart: 'White Flowers', base: 'White Musk, Sandalwood', category: 'Eau de Parfum', gender: 'Unisex', price: 1399, imageFile: 'majesticmusk.png' },
  { name: 'Emerald Breeze', tagline: 'Fresh • Green • Natural', top: 'Green Apple, Lemon', heart: 'Green Leaves, Lavender', base: 'Cedarwood, Musk', category: 'Eau de Parfum', gender: 'Unisex', price: 1199, imageFile: 'mysticgreen.png' },
  { name: 'Aqua Frost', tagline: 'Aquatic • Cool • Refreshing', top: 'Bergamot, Marine', heart: 'Lavender, Jasmine', base: 'Amber, White Musk', category: 'Eau de Parfum', gender: 'Men', price: 1299, imageFile: 'aquafrost.png' },
  { name: 'Blue Horizon', tagline: 'Oceanic • Fresh • Masculine', top: 'Marine, Grapefruit', heart: 'Geranium, Lavender', base: 'Cedarwood, Amber', category: 'Eau de Parfum', gender: 'Men', price: 1399, imageFile: 'bluehorizone.png' },
  { name: 'Midnight Oudh', tagline: 'Dark • Smoky • Powerful', top: 'Saffron, Spice', heart: 'Oud, Rose', base: 'Leather, Amber, Musk', category: 'Eau de Parfum', gender: 'Men', price: 1599, imageFile: 'midnightoudh.png' },
  { name: 'Silk Bloom', tagline: 'Floral • Soft • Elegant', top: 'Pear, Bergamot', heart: 'Jasmine, Rose', base: 'White Musk, Vanilla', category: 'Eau de Parfum', gender: 'Women', price: 1299, imageFile: 'silkbloom.png' }
];

export function generateProducts() {
  return baseFragrances.map((fragrance, index) => {
    const slug = fragrance.name.toLowerCase().replace(/\s+/g, '-');
    const isNewArrival = index % 4 === 0;
    
    // Setup categories based on gender and new arrival status
    const categories = ['shop-all', fragrance.gender.toLowerCase()];
    if (isNewArrival) categories.push('new-arrivals');

    return {
      id: index + 1,
      title: fragrance.name,
      slug: slug,
      price: fragrance.price,
      originalPrice: fragrance.price + 500,
      discount: 'SAVE ₹500',
      rating: (4.5 + Math.random() * 0.5).toFixed(1),
      reviews: Math.floor(Math.random() * 500) + 50,
      badge: isNewArrival ? 'NEW IN' : (index % 3 === 0 ? 'BESTSELLER' : null),
      tags: [`For ${fragrance.gender}`, fragrance.category],
      image: `/images/${fragrance.imageFile}`,
      categories: categories,
      
      // Full Details for Product Page
      tagline: fragrance.tagline,
      fullNotes: {
        top: fragrance.top,
        heart: fragrance.heart,
        base: fragrance.base
      },
      bottleCategory: fragrance.category
    };
  });
}

export const allProducts = generateProducts();

// Helper to fetch by category
export const getProductsByCategory = (categoryId) => {
  return allProducts.filter(p => {
    if (categoryId === 'men' || categoryId === 'women') {
      return p.categories.includes(categoryId) || p.categories.includes('unisex');
    }
    return p.categories.includes(categoryId);
  });
};

// Helper to fetch single product
export const getProductBySlug = (slug) => {
  return allProducts.find(p => p.slug === slug);
};
