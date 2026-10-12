export const products = [
  {
    name: 'Ração Premium Cães Adultos 15kg',
    category: 'Rações',
    rating: '4.8',
    price: '151,92',
    oldPrice: '189,90',
    badge: '-20%',
    image: '/produto_01.png',
    keywords: 'cães cachorro',
  },
  {
    name: 'Osso Fêmur Suíno para Cães',
    category: 'Petiscos',
    rating: '4.9',
    price: '13,99',
    badge: 'Novo',
    image: '/produto_02.png',
    keywords: 'cães cachorro',
  },
  {
    name: 'Brinquedo Bola Maluca Spinball',
    category: 'Brinquedos',
    rating: '4.5',
    price: '62,90',
    image: '/produto_03.png',
    keywords: 'cães cachorro',
  },
  {
    name: 'Shampoo Antipulgas para Cães 200ml',
    category: 'Higiene',
    rating: '4.7',
    price: '42,00',
    oldPrice: '59,90',
    badge: '-15%',
    image: '/produto_04.png',
    keywords: 'cães gatos',
  },
  {
    name: 'Coleira para Cães Honey Zee',
    category: 'Cães',
    rating: '4.8',
    price: '79,00',
    image: '/produto_05.png',
    keywords: 'cachorro passeio',
  },
  {
    name: 'Arranhador Nau Três Andares',
    category: 'Gatos',
    rating: '4.7',
    price: '1.046,90',
    image: '/produto_06.png',
    keywords: 'felinos arranhar',
  },
  {
    name: 'Ração Úmida Whiskas Sachê Gatos Adultos Carne, Frango e Salmão',
    category: 'Rações',
    rating: '4.9',
    price: '20,93',
    image: '/produto_07.png',
    keywords: 'gatos felinos alimentação',
  },
  {
    name: 'Petisco Bifinho Frango 65g',
    category: 'Petiscos',
    rating: '4.8',
    price: '5,70',
    image: '/produto_08.png',
    keywords: 'cães cachorro recompensa',
  },
  {
    name: 'Mordedor de Corda para Cães',
    category: 'Brinquedos',
    rating: '4.6',
    price: '26,90',
    image: '/produto_09.png',
    keywords: 'cães cachorro diversão',
  },
  {
    name: 'Areia para Gatos Carecat Perfumada 4 kg',
    category: 'Higiene',
    rating: '4.7',
    price: '17,01',
    image: '/produto_10.png',
    keywords: 'gatos felinos limpeza',
  },
  {
    name: 'Combo Antipulgas Cães Fiprolex 11 a 20kg Único',
    category: 'Higiene',
    rating: '4.9',
    price: '67,90',
    oldPrice: '97,50',
    badge: 'Oferta',
    image: '/produto_11.png',
    keywords: 'cães gatos proteção',
  },
  {
    name: 'Ração GoldenCães Adultos Raças Pequenas Frango e Abóbora 3kg',
    category: 'Rações',
    rating: '4.8',
    price: '65,99',
    image: '/produto_12.png',
    keywords: 'cães cachorro alimentação',
  },
];

export const categories = [
  'Cães',
  'Gatos',
  'Rações',
  'Petiscos',
  'Brinquedos',
  'Higiene',
  'Ofertas',
];

export const services = [
  ['✂️', 'Banho & Tosa', 'Serviço profissional para deixar seu pet sempre bonito e saudável.'],
  ['🏥', 'Veterinário', 'Atendimento veterinário completo com profissionais especializados.'],
  ['🏨', 'Hotelzinho', 'Hospedagem segura e confortável quando você precisa viajar.'],
];

export function filterProducts(items, search, category) {
  const query = search.trim().toLocaleLowerCase('pt-BR');

  return items.filter((product) => {
    const searchableText = `${product.name} ${product.category} ${product.keywords}`
      .toLocaleLowerCase('pt-BR');
    const matchesSearch = !query || searchableText.includes(query);
    const matchesCategory = !category
      || category === 'Todos'
      || (category === 'Ofertas' && Boolean(product.badge))
      || product.category === category
      || product.keywords.includes(category.toLocaleLowerCase('pt-BR'));

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
