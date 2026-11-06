export async function fetchProducts({ featured = false, category = null, search = null, minPrice = null, maxPrice = null, sortBy = 'name', page = 1, perPage = 12 } = {}) {
  const params = new URLSearchParams();
  if (featured) params.append('featured', 'true');
  if (category) params.append('category', category);
  if (search) params.append('search', search);
  if (minPrice !== null) params.append('min_price', minPrice);
  if (maxPrice !== null) params.append('max_price', maxPrice);
  params.append('sort_by', sortBy);
  params.append('page', page);
  params.append('per_page', perPage);

  const response = await fetch(`/api/products?${params.toString()}`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return await response.json();
}

export async function fetchCategories() {
  const response = await fetch('/api/categories');
  if (!response.ok) throw new Error('Failed to fetch categories');
  const categories = await response.json();
  return ['Todos', ...categories, 'Ofertas'];
}

export async function fetchProduct(productId) {
  try {
    const response = await fetch(`/api/products/${productId}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return await response.json();
  } catch (error) {
    return null;
  }
}

export function filterProducts(items, search, category) {
  const query = search.trim().toLocaleLowerCase('pt-BR');

  return items.filter((product) => {
    const searchableText = `${product.name} ${product.category} ${product.keywords || ''}`
      .toLocaleLowerCase('pt-BR');
    const matchesSearch = !query || searchableText.includes(query);
    const matchesCategory = !category
      || category === 'Todos'
      || (category === 'Ofertas' && Boolean(product.badge))
      || product.category === category
      || (product.keywords && product.keywords.includes(category.toLocaleLowerCase('pt-BR')));

    return matchesSearch && matchesCategory;
  });
}

export function getCartCount(items) {
  return items.reduce((count, item) => count + item.quantity, 0);
}

export function getCartTotal(items) {
  const totalInCents = items.reduce((total, item) => {
    const priceInCents = Number(item.product.price.replace(/\./g, '').replace(',', ''));
    return total + priceInCents * item.quantity;
  }, 0);

  return totalInCents / 100;
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export const services = [
  ['✂️', 'Banho & Tosa', 'Serviço profissional para deixar seu pet sempre bonito e saudável.'],
  ['🏥', 'Veterinário', 'Atendimento veterinário completo com profissionais especializados.'],
  ['🏨', 'Hotelzinho', 'Hospedagem segura e confortável quando você precisa viajar.'],
];
