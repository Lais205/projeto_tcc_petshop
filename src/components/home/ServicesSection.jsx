export default function ServicesSection({ services }) {
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
          {services.map(([icon, title, description]) => (
            <article className="service-card" key={title}>
              <div className="service-icon" aria-hidden="true">{icon}</div>
              <h3 className="service-title">{title}</h3>
              <p className="service-desc">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
