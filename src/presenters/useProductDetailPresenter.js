import { useState, useEffect, useCallback } from 'react';
import { fetchProduct, fetchCategories } from '../models/productModel.js';
import { useCart } from '../context/CartContext.jsx';

export default function useProductDetailPresenter(productId) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const { cartItems, addToCart, updateCartQuantity, cartCount, cartTotal } = useCart();

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [productData, categoriesData] = await Promise.all([
          fetchProduct(productId),
          fetchCategories(),
        ]);
        setProduct(productData);
        setCategories(categoriesData);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [productId]);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const handleAddToCart = useCallback(() => {
    if (product) {
      addToCart(product, quantity);
      openCart();
    }
  }, [product, quantity, addToCart, openCart]);

  return {
    product,
    loading,
    quantity,
    setQuantity,
    cartItems,
    cartCount,
    cartTotal,
    isCartOpen,
    openCart,
    closeCart,
    updateCartQuantity,
    handleAddToCart,
    categories,
  };
}
