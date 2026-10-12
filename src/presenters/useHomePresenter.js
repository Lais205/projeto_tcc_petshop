import { useCallback, useMemo, useState } from 'react';
import {
  categories,
  filterProducts,
  getCartCount,
  getCartTotal,
  formatCurrency,
  products,
  services,
} from '../models/productModel.js';

export default function useHomePresenter() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const visibleProducts = useMemo(
    () => filterProducts(products, search, category),
    [search, category],
  );

  function addToCart(product) {
    setCartItems((items) => {
      const existingItem = items.find((item) => item.product.name === product.name);
      if (existingItem) {
        return items.map((item) => (
          item.product.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
      }

      return [...items, { product, quantity: 1 }];
    });
  }

  function updateCartQuantity(productName, change) {
    setCartItems((items) => items
      .map((item) => (
        item.product.name === productName
          ? { ...item, quantity: item.quantity + change }
          : item
      ))
      .filter((item) => item.quantity > 0));
  }

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  return {
    search,
    setSearch,
    category,
    setCategory,
    cartItems,
    cartCount: getCartCount(cartItems),
    cartTotal: formatCurrency(getCartTotal(cartItems)),
    isCartOpen,
    openCart,
    closeCart,
    addToCart,
    updateCartQuantity,
    visibleProducts,
    categories,
    services,
  };
}
