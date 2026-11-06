import ProductCard from './ProductCard.jsx';
import ProductFilters from './ProductFilters.jsx';
import ProductPagination from './ProductPagination.jsx';
import { useState, useEffect } from 'react';

export default function ProductsPageSection({ products, loading, category, pagination, onPageChange, minPrice, maxPrice, sortBy, onMinPriceChange, onMaxPriceChange, onSortChange, categories, onCategoryChange, cep, setCep, onCepSearch }) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getTitle = () => {
    if (!category || category === 'Todos' || category === '') {
      return 'Todos os Produtos';
    }
    if (category === 'Ofertas') {
      return 'Ofertas Especiais';
    }
    return category;
  };

  const getSubtitle = () => {
    if (!category || category === 'Todos' || category === '') {
      return 'Explore nosso catálogo completo de produtos para seu pet.';
    }
    if (category === 'Ofertas') {
      return 'Aproveite as melhores ofertas selecionadas para você.';
    }
    return `Confira nossa seleção de ${category.toLowerCase()} para seu pet.`;
  };

  return (
    <>
      <div style={{ width: '100%', height: '366px', overflow: 'hidden', position: 'relative' }}>
        <img
          src="/ilustracao_pagina_produto.png"
          alt="Banner Produtos"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>

      <section className="section-container" id="produtos" style={{ backgroundColor: 'var(--bg-light)', padding: '0', minHeight: 'calc(100vh - 200px)' }}>
        <div style={{ padding: '40px 24px' }}>
          <div style={{ marginBottom: '24px' }}>
            <a href="/" style={{ 
              color: 'var(--purple-accent)', 
              textDecoration: 'none', 
              fontSize: '0.9rem',
              fontWeight: '600',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              ← Voltar para Home
            </a>
          </div>

          <div className="section-header" style={{ marginBottom: '40px' }}>
            <span className="section-badge">Catálogo</span>
            <h2 className="section-title" style={{ fontSize: '2.5rem', marginTop: '16px' }}>{getTitle()}</h2>
            <p className="section-subtitle" style={{ fontSize: '1.1rem', marginTop: '12px' }}>
              {getSubtitle()}
            </p>
          </div>

          <div className="products-layout">
            <aside className="filters-sidebar">
              <ProductFilters
              categories={categories}
              category={category}
              onCategoryChange={onCategoryChange}
              minPrice={minPrice}
              maxPrice={maxPrice}
              sortBy={sortBy}
              onMinPriceChange={onMinPriceChange}
              onMaxPriceChange={onMaxPriceChange}
              onSortChange={onSortChange}
              cep={cep}
              setCep={setCep}
              onCepSearch={onCepSearch}
            />
          </aside>

          <div>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '80px 20px', backgroundColor: 'var(--white)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔄</div>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Carregando produtos...</p>
              </div>
            ) : (
              <>
                <div className="product-grid" style={{ marginBottom: '32px' }}>
                  {products.map((product) => (
                    <ProductCard
                      key={product.id || product.name}
                      product={product}
                    />
                  ))}
                  {products.length === 0 && (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '80px 20px', backgroundColor: 'var(--white)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-sm)' }}>
                      <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🔍</div>
                      <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '8px' }}>
                        Nenhum produto encontrado para essa busca.
                      </p>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                        Tente mudar os filtros ou buscar por outro termo.
                      </p>
                    </div>
                  )}
                </div>

                {products.length > 0 && (
                  <>
                    <ProductPagination pagination={pagination} onPageChange={onPageChange} />
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: 'var(--purple-main)',
            color: 'var(--white)',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-lg)',
            transition: 'var(--transition)',
            zIndex: 100,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--purple-dark)';
            e.currentTarget.style.transform = 'translateY(-5px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--purple-main)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          ↑
        </button>
      )}
    </section>
    </>
  );
}
