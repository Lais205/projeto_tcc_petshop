import SiteFooter from '../components/common/SiteFooter.jsx';

const shortcuts = [
  ['📦', 'Meus Pedidos', 'Acompanhe seus pedidos recentes'],
  ['❤️', 'Favoritos', 'Produtos que você curtiu'],
  ['👤', 'Meus Dados', 'Atualize suas informações'],
  ['🏠', 'Endereços', 'Gerencie seus endereços'],
];

export default function DashboardView({ user }) {
  const categories = ['Todos', 'Cães', 'Gatos', 'Rações', 'Petiscos', 'Acessórios', 'Brinquedos'];

  return (
    <>
      <header className="header">
        <div className="nav-container">
          <a className="logo" href="/">
            <span className="logo-badge">🐾</span><span>PetVita</span>
          </a>
          <div className="nav-actions">
            <a className="nav-btn" href="/dashboard">
              👤 {user?.full_name?.split(/\s+/)[0]}
            </a>
            <a className="nav-btn" href="/auth/logout">Sair</a>
          </div>
        </div>
        <nav className="category-nav" aria-label="Categorias de produtos">
          <ul className="category-list">
            {categories.map((category) => (
              <li key={category}>
                <a href="/#produtos" className="category-item">{category}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className="section-container">
        <div className="section-header">
          <span className="section-badge">Bem-vindo</span>
          <h1 className="section-title">Olá, {user?.full_name}!</h1>
          <p className="section-subtitle">Gerencie sua conta e aproveite nossas ofertas</p>
        </div>
        <div className="dashboard-grid">
          {shortcuts.map(([icon, title, description]) => (
            <article className="category-card dashboard-card" key={title}>
              <div className="dashboard-icon" aria-hidden="true">{icon}</div>
              <h2>{title}</h2>
              <p>{description}</p>
            </article>
          ))}
        </div>
        <div className="dashboard-home-link">
          <a href="/" className="btn-secondary">Voltar para Home</a>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
