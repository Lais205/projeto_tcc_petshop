import { useCart } from '../../context/CartContext.jsx';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  return (
    <article className="product-card">
      <a href={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'contents' }}>
        <div className="product-rating-badge">★ {product.rating}</div>
        <div className="product-image-container">
          {product.image ? (
            <img className="product-image" src={product.image} alt={product.name} />
          ) : (
            <div className="product-image-placeholder" />
          )}
        </div>
        <div className="product-card-content">
          <span className="product-category">{product.category}</span>
          <h3 className="product-title">{product.name}</h3>
          <div className="product-price-section">
            <div className="price-info">
              {product.oldPrice && <span className="price-old">R$ {product.oldPrice}</span>}
              <span className="price-current">R$ {product.price}</span>
            </div>
            {product.badge && <span className="discount-badge">{product.badge}</span>}
          </div>
          <div className="product-actions">
            <button
              className="btn-buy"
              type="button"
              aria-label={`Comprar ${product.name}`}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Comprar
            </button>
            <button
              className="btn-add-cart"
              type="button"
              aria-label={`Adicionar ${product.name} ao carrinho`}
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
            >
              Carrinho
            </button>
          </div>
        </div>
      </a>
    </article>
  );
}
