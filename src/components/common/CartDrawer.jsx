import { useEffect } from 'react';
import { useCart } from '../../context/CartContext.jsx';

export default function CartDrawer({
  isOpen,
  onClose,
}) {
  const { cartItems, cartCount, cartTotal, updateCartQuantity, removeFromCart, clearCart, loading } = useCart();
  useEffect(() => {
    if (!isOpen) return undefined;

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose();
    }

    document.body.classList.add('cart-open');
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.classList.remove('cart-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`cart-backdrop${isOpen ? ' is-visible' : ''}`}
      aria-hidden={!isOpen}
      inert={!isOpen}
      onClick={onClose}
    >
      <aside
        id="cart-drawer"
        className={`cart-drawer${isOpen ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Carrinho de compras"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="cart-drawer-header">
          <div>
            <h2>Seu carrinho</h2>
            <p>{cartCount} {cartCount === 1 ? 'item' : 'itens'}</p>
          </div>
          <button
            className="cart-close"
            type="button"
            aria-label="Fechar carrinho"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        {cartItems.length ? (
          <>
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li className="cart-item" key={item.id}>
                  <img src={item.image} alt="" />
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p>R$ {item.price}</p>
                    <div className="cart-quantity" aria-label={`Quantidade de ${item.name}`}>
                      <button
                        type="button"
                        aria-label={`Remover uma unidade de ${item.name}`}
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        disabled={loading}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        aria-label={`Adicionar uma unidade de ${item.name}`}
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        disabled={loading}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="btn-secondary"
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      disabled={loading}
                      style={{ marginTop: '8px' }}
                    >
                      Remover
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart-drawer-footer">
              <p><span>Subtotal</span><strong>{cartTotal}</strong></p>
              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <button className="btn-secondary" type="button" onClick={clearCart}
                  disabled={loading}
                  style={{ flex: 1 }}
                >
                  Limpar Carrinho
                </button>
                <button className="btn-primary" type="button" onClick={onClose} style={{ flex: 1 }}>
                  Continuar comprando
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="cart-empty">
            <span aria-hidden="true">🛒</span>
            <p>Seu carrinho está vazio.</p>
            <button className="btn-secondary" type="button" onClick={onClose}>
              Ver produtos
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
