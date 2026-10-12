import { useEffect } from 'react';

export default function CartDrawer({
  isOpen,
  items,
  itemCount,
  total,
  onClose,
  onChangeQuantity,
}) {
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
            <p>{itemCount} {itemCount === 1 ? 'item' : 'itens'}</p>
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
        {items.length ? (
          <>
            <ul className="cart-items">
              {items.map(({ product, quantity }) => (
                <li className="cart-item" key={product.name}>
                  <img src={product.image} alt="" />
                  <div className="cart-item-info">
                    <h3>{product.name}</h3>
                    <p>R$ {product.price}</p>
                    <div className="cart-quantity" aria-label={`Quantidade de ${product.name}`}>
                      <button
                        type="button"
                        aria-label={`Remover uma unidade de ${product.name}`}
                        onClick={() => onChangeQuantity(product.name, -1)}
                      >
                        −
                      </button>
                      <span>{quantity}</span>
                      <button
                        type="button"
                        aria-label={`Adicionar uma unidade de ${product.name}`}
                        onClick={() => onChangeQuantity(product.name, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart-drawer-footer">
              <p><span>Subtotal</span><strong>{total}</strong></p>
              <button className="btn-primary" type="button" onClick={onClose}>
                Continuar comprando
              </button>
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
