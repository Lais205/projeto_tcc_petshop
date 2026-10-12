export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-copy">
         
          <h1 className="hero-title">
            Amor e cuidado para o seu <span>melhor amigo.</span>
          </h1>
          <p className="hero-desc">
            Tudo o que seu pet precisa para viver feliz: muito carinho,
            serviços, produtos e cuidados de qualidade. 
          </p>
          <div className="hero-buttons">
            <a className="btn-primary" href="#produtos">Ver vitrine de produtos</a>
            <a className="btn-secondary" href="#servicos">Nossos serviços</a>
          </div>
        </div>
        <div className="hero-art">
          <img
            className="hero-image"
            src="/hheader.png"
            alt="Cachorros e gatinhos animados brincando juntos."
          />
        </div>
      </div>
    </section>
  );
}
