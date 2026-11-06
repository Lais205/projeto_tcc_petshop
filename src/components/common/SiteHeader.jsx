import { useCart } from '../../context/CartContext.jsx';

export default function SiteHeader({
  authenticated,
  user,
  search,
  onSearchChange,
  isCartOpen,
  onCartOpen,
  category,
  onCategoryChange,
  categories,
  showAllProducts = false,
}) {
  const { cartCount: contextCartCount } = useCart();
  const displayCartCount = contextCartCount;
  return (
    <header className="header" id="inicio">
      <div className="top-bar">
        ⚡ OFERTA DE INAUGURAÇÃO:
        <span>Ganhe 15% de desconto no 1º Banho &amp; Tosa do seu Pet!</span>
      </div>
      <div className="nav-container">
        <a className="logo" href="/" aria-label="PetVita - início">
          <img src="/logo_petvita.png" alt="PetVita Logo" style={{ height: '50px', width: 'auto' }} />
        </a>
        <label className="search-bar">
          <span className="search-icon" aria-hidden="true">🔍</span>
          <input
            aria-label="Buscar produtos"
            type="search"
            placeholder="Busque por rações, brinquedos, banho..."
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </label>
        <div className="nav-actions">
          {!showAllProducts && (
            <a className="nav-btn" href="/products">Produtos</a>
          )}
          {authenticated ? (
            <>
              <a className="nav-btn" href="/dashboard">
                <span aria-hidden="true">👤</span>
                {user?.full_name?.split(/\s+/)[0] || 'Minha conta'}
              </a>
              <a className="nav-btn" href="/auth/logout">Sair</a>
            </>
          ) : (
            <a className="nav-btn" href="/auth/login">
              <span aria-hidden="true">👤</span> Entrar
            </a>
          )}
          <button
            className="nav-btn cart-button"
            type="button"
            aria-label={`Carrinho, ${displayCartCount} ${displayCartCount === 1 ? 'item' : 'itens'}`}
            aria-expanded={isCartOpen}
            aria-controls="cart-drawer"
            onClick={onCartOpen}
          >
            <span aria-hidden="true">🛒</span> Carrinho
            {displayCartCount > 0 && <span className="cart-count">{displayCartCount}</span>}
          </button>
        </div>
      </div>
      <nav className="category-nav" aria-label="Categorias de produtos">
        <ul className="category-list">
          {categories.map((name) => (
            <li key={name}>
              <button
                className={`category-item${category === name ? ' active' : ''}${name === 'Ofertas' ? ' offer-category' : ''}`}
                type="button"
                onClick={() => {
                  onCategoryChange(category === name ? '' : name);
                  document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
