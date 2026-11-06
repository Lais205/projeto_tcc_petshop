import ProductCard from '../products/ProductCard.jsx';

export default function ProductsSection({ products, loading, showViewAllButton = true }) {
  return (
    <section className="section-container" id="produtos">
      <div className="section-header">
        <h2 className="section-title">Produtos em Destaque</h2>
        <p className="section-subtitle">
          Confira nossa seleção exclusiva de artigos para alimentação, higiene e diversão.
        </p>
      </div>
      {loading ? (
        <p className="empty-products">Carregando produtos...</p>
      ) : (
        <>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id || product.name}
                product={product}
              />
            ))}
            {products.length === 0 && (
              <p className="empty-products">Nenhum produto encontrado para essa busca.</p>
            )}
          </div>
          {showViewAllButton && products.length > 0 && (
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <a href="/products" className="btn-secondary" style={{ display: 'inline-block', textDecoration: 'none' }}>
                Ver Todos os Produtos
              </a>
            </div>
          )}
        </>
      )}
    </section>
  );
}
