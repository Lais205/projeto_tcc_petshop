export const categories = [
  { id: 1, name: 'Cães', icon: '🐶' },
  { id: 2, name: 'Gatos', icon: '🐱' },
  { id: 3, name: 'Rações', icon: '🍖' },
  { id: 4, name: 'Petiscos', icon: '🦴' },
  { id: 5, name: 'Farmácia', icon: '💊' },
  { id: 6, name: 'Higiene', icon: '🧼' },
  { id: 7, name: 'Brinquedos', icon: '🎾' },
];

export const products = [
  {
    id: 1,
    name: 'Ração Golden Special para Cães Adultos Frango e Carne 15 kg',
    category: 'Alimentação',
    price: 159.90,
    oldPrice: 219.90,
    badge: '15% OFF',
    rating: '5.0 (128)',
    img: 'racao_01.png',
    imgDimensions: '300x300 px (Pacote de Ração)'
  },
  {
    id: 2,
    name: 'Ração Golden Special Gatos Adultos Frango e Carne 10,1 kg',
    category: 'Alimentação',
    price: 138.90,
    oldPrice: 179.00,
    badge: 'Mais Vendido',
    rating: '4.9 (94)',
    img: 'racao_02.png',
    imgDimensions: '300x300 px (Pacote Ração Gato)'
  },
  {
    id: 3,
    name: 'Arranhador Torre Tripla Fábrica Pet Preto Único',
    category: 'Acessórios',
    price: 229.90,
    oldPrice: null,
    badge: 'Lançamento',
    rating: '4.8 (45)',
    img: 'racao_03.png',
    imgDimensions: '300x300 px (Arranhador)'
  },
  {
    id: 4,
    name: 'Toca Cama para Gatos Flicks Rosa M',
    category: 'Conforto',
    price: 289.00,
    oldPrice: 499.90,
    badge: 'Destaque',
    rating: '5.0 (210)',
    img: 'racao_04.png',
    imgDimensions: '300x300 px (Cama Pet)'
  },
];

export const services = [
  {
    id: 1,
    title: 'Banho & Tosa VIP',
    desc: 'Atendimento carinhoso com produtos hipoalergênicos e ambiente climatizado.',
    icon: '🛁'
  },
  {
    id: 2,
    title: 'Consulta Veterinária',
    desc: 'Especialistas prontos para cuidar da saúde do seu pet com toda dedicação.',
    icon: '🩺'
  },
  {
    id: 3,
    title: 'Hotel & Creche Pet',
    desc: 'Espaço amplo, seguro e divertido para o seu melhor amigo brincar o dia todo.',
    icon: '🏡'
  },
  {
    id: 4,
    title: 'Adestramento Positivo',
    desc: 'Técnicas modernas e respeitosas para melhorar a convivência e o comportamento.',
    icon: '🎓'
  }
];
