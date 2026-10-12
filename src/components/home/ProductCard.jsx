export default function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card">
      {product.badge && <span className="product-badge">{product.badge}</span>}
      <div className="product-image-container">
        {product.image && (
          <img className="product-image" src={product.image} alt={product.name} />
        )}
      </div>
      <span className="product-category">{product.category}</span>
      <h3 className="product-title">{product.name}</h3>
      <div className="product-rating" aria-label={`Avaliação ${product.rating} de 5`}>
        ⭐ {product.rating}
      </div>
      <div className="product-price-container">
        <div>
          {product.oldPrice && <div className="price-old">R$ {product.oldPrice}</div>}
          <div className="price-current">R$ {product.price}</div>
        </div>
        <button
          className="btn-icon"
          type="button"
          title="Adicionar ao carrinho"
          aria-label={`Adicionar ${product.name} ao carrinho`}
          onClick={() => onAddToCart(product)}
        >
          +
        </button>
      </div>
    </article>
  );
}
