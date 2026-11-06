import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    try {
      const response = await fetch('/api/cart');
      if (response.ok) {
        const data = await response.json();
        setCartItems(data.items);
        setCartCount(data.count);
        setCartTotal(data.total);
      }
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
    }
  }, []);

  const addToCart = useCallback(async (product, qty = 1) => {
    setLoading(true);
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: product.id, quantity: qty }),
      });
      if (response.ok) {
        await fetchCart();
      }
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
    } finally {
      setLoading(false);
    }
  }, [fetchCart]);

  const updateCartQuantity = useCallback(async (itemId, quantity) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity }),
      });
      if (response.ok) {
        await fetchCart();
      }
    } catch (error) {
      console.error('Erro ao atualizar carrinho:', error);
    } finally {
      setLoading(false);
    }
  }, [fetchCart]);

  const removeFromCart = useCallback(async (itemId) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        await fetchCart();
      }
    } catch (error) {
      console.error('Erro ao remover do carrinho:', error);
    } finally {
      setLoading(false);
    }
  }, [fetchCart]);

  const clearCart = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/cart', {
        method: 'DELETE',
      });
      if (response.ok) {
        await fetchCart();
      }
    } catch (error) {
      console.error('Erro ao limpar carrinho:', error);
    } finally {
      setLoading(false);
    }
  }, [fetchCart]);

  const formatCurrency = useCallback((value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartTotal: formatCurrency(cartTotal),
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
