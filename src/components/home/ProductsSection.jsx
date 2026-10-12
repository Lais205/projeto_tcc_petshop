import ProductCard from './ProductCard.jsx';

export default function ProductsSection({ products, onAddToCart }) {
  return (
    <section className="section-container" id="produtos">
      <div className="section-header">
        <h2 className="section-title">Produtos em Destaque</h2>
        <p className="section-subtitle">
          Confira nossa seleção exclusiva de artigos para alimentação, higiene e diversão.
        </p>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.name}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
        {products.length === 0 && (
          <p className="empty-products">Nenhum produto encontrado para essa busca.</p>
        )}
      </div>
    </section>
  );
}
