import React from 'react';
import { services } from '../data/mockData';

export default function Services() {
  return (
    <section className="services-section" id="servicos">
      <div className="section-container">
        <div className="section-header">
          <span className="section-badge">Cuidados Especiais</span>
          <h2 className="section-title">Serviços para o bem-estar do seu Pet</h2>
          <p className="section-subtitle">
            Profissionais qualificados para entregar o melhor tratamento para o seu filho de quatro patas.
          </p>
        </div>

        <div className="services-grid">
          {services.map((srv) => (
            <div key={srv.id} className="service-card">
              <div className="service-icon">{srv.icon}</div>
              <h3 className="service-title">{srv.title}</h3>
              <p className="service-desc">{srv.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
