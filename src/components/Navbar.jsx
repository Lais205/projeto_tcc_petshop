import React from 'react';
import { categories } from '../data/mockData';

export default function Navbar() {
  return (
    <header className="header">
      <div className="top-bar">
        ⚡ OFERTA DE INAUGURAÇÃO: <span>Ganhe 15% de desconto no 1º Banho & Tosa do seu Pet!</span>
      </div>
      
      <div className="nav-container">
        <div className="logo">
          <span className="logo-badge">🐾</span>
          <span>PetVita</span>
        </div>

        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Busque por rações, brinquedos, banho..." />
        </div>

        <div className="nav-actions">
          <button className="nav-btn">
            <span>👤</span> Entrar
          </button>
          <button className="nav-btn" style={{ position: 'relative' }}>
            <span>🛒</span> Carrinho
          </button>
          <button className="btn-primary">Agendar Serviço</button>
        </div>
      </div>

      <nav className="category-nav">
        <ul className="category-list">
          {categories.map((cat, idx) => (
            <li key={cat.id} className={`category-item ${idx === 0 ? 'active' : ''}`}>
              {cat.icon} {cat.name}
            </li>
          ))}
          <li className="category-item" style={{ color: '#E11D48', fontWeight: 800 }}>
            🔥 Ofertas
          </li>
        </ul>
      </nav>
    </header>
  );
}
