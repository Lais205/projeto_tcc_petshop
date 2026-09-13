import React from "react";
import ImagePlaceholder from "./ImagePlaceholder";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-text">
          <h1 className="hero-title">
            Amor e cuidado para o seu <span>melhor amigo</span>.
          </h1>
          <p className="hero-desc">
            Melhores rações, acessórios e um atendimento veterinário
            e estético de excelência. Tudo em um só lugar.
          </p>
          <div className="hero-buttons">
            <button
              className="btn-primary"
              style={{ padding: "14px 28px", fontSize: "1.05rem" }}
            >
              Ver vitrine de produtos
            </button>
            <button
              className="btn-secondary"
              style={{ padding: "14px 28px", fontSize: "1.05rem" }}
            >
              Nossos serviços
            </button>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <ImagePlaceholder
            src="pet_shop_01.png"
            alt="Cachorro feliz"
            width="600px"
            height="400px"
            className="product-image"
            radius="20px"
          />
        </div>
      </div>
    </section>
  );
}
