import CartDrawer from '../components/common/CartDrawer.jsx';
import SiteFooter from '../components/common/SiteFooter.jsx';
import SiteHeader from '../components/common/SiteHeader.jsx';
import ProductsPageSection from '../components/products/ProductsPageSection.jsx';
import useProductsPresenter from '../presenters/useProductsPresenter.js';

export default function ProductsView({ authenticated, user }) {
  const {
    search,
    setSearch,
    category,
    setCategory,
    isCartOpen,
    openCart,
    closeCart,
    visibleProducts,
    categories,
    loading,
    pagination,
    setPage,
    minPrice,
    maxPrice,
    sortBy,
    setMinPrice,
    setMaxPrice,
    setSortBy,
    cep,
    setCep,
    handleCepSearch,
    cepModal,
    closeCepModal,
  } = useProductsPresenter();

  return (
    <>
      <SiteHeader
        authenticated={authenticated}
        user={user}
        search={search}
        onSearchChange={setSearch}
        isCartOpen={isCartOpen}
        onCartOpen={openCart}
        category={category}
        onCategoryChange={setCategory}
        categories={categories}
        showAllProducts={true}
      />
      <main>
        <ProductsPageSection
          products={visibleProducts}
          loading={loading}
          category={category}
          pagination={pagination}
          onPageChange={setPage}
          minPrice={minPrice}
          maxPrice={maxPrice}
          sortBy={sortBy}
          onMinPriceChange={setMinPrice}
          onMaxPriceChange={setMaxPrice}
          onSortChange={setSortBy}
          categories={categories}
          onCategoryChange={setCategory}
          cep={cep}
          setCep={setCep}
          onCepSearch={handleCepSearch}
        />
      </main>
      <CartDrawer
        isOpen={isCartOpen}
        onClose={closeCart}
      />
      {cepModal.show && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: 'var(--white)',
            borderRadius: 'var(--radius)',
            padding: '32px',
            maxWidth: '400px',
            width: '90%',
            boxShadow: 'var(--shadow-lg)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px',
            }}>
              <span style={{ fontSize: '3rem' }}>
                {cepModal.isError ? '⚠️' : (cepModal.inCoverage ? '✅' : '❌')}
              </span>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--purple-dark)', margin: 0 }}>
                  {cepModal.isError ? 'Atenção' : (cepModal.inCoverage ? 'Área de Cobertura!' : 'Fora da Área de Cobertura')}
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
                  {cepModal.city} {cepModal.uf && !cepModal.isError ? `- ${cepModal.uf}` : ''}
                </p>
              </div>
            </div>
            <p style={{ fontSize: '1rem', color: 'var(--text-dark)', marginBottom: '24px', lineHeight: '1.5' }}>
              {cepModal.isError
                ? (cepModal.city === 'CEP incompleto'
                    ? 'Por favor, digite o CEP completo com 8 dígitos para verificar a cobertura de entrega.'
                    : (cepModal.city === 'CEP não encontrado'
                        ? 'Este CEP não foi encontrado. Verifique os números e tente novamente.'
                        : 'Ocorreu um erro ao consultar o CEP. Tente novamente mais tarde.'))
                : (cepModal.inCoverage
                    ? 'Ótimo! Entregamos na sua região. Você pode prosseguir com sua compra.'
                    : 'Infelizmente ainda não entregamos nesta região. Atualmente atendemos apenas São Paulo.')}
            </p>
            <button
              onClick={closeCepModal}
              style={{
                width: '100%',
                padding: '14px 24px',
                backgroundColor: 'var(--purple-main)',
                color: 'var(--white)',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'var(--transition)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--purple-dark)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--purple-main)';
              }}
            >
              Entendi
            </button>
          </div>
        </div>
      )}
      <SiteFooter />
    </>
  );
}
