import React from 'react';
import { products } from '../data/mockData';
import ImagePlaceholder from './ImagePlaceholder';

export default function ProductCatalog() {
  return (
    <section className="section-container" id="produtos">
      <div className="section-header">
        <h2 className="section-title">Produtos em Destaque</h2>
        <p className="section-subtitle">
          Confira nossa seleção exclusiva de artigos para alimentação, higiene e diversão.
        </p>
      </div>

      <div className="product-grid">
        {products.map((prod) => (
          <div key={prod.id} className="product-card">
            {prod.badge && <span className="product-badge">{prod.badge}</span>}
            
            <div className="product-image-container">
              <ImagePlaceholder 
                src={prod.img}
                alt={prod.name}
                height="100%" 
                label={`Foto ${prod.name}`} 
                dimensions={prod.imgDimensions}
              />
            </div>

            <span className="product-category">{prod.category}</span>
            <h3 className="product-title">{prod.name}</h3>
            
            <div className="product-rating">
              ⭐ {prod.rating}
            </div>

            <div className="product-price-container">
              <div>
                {prod.oldPrice && <div className="price-old">R$ {prod.oldPrice.toFixed(2)}</div>}
                <div className="price-current">R$ {prod.price.toFixed(2)}</div>
              </div>
              <button className="btn-icon" title="Adicionar aos favoritos">+</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
