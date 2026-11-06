import { useState } from 'react';

export default function ProductDetailSection({ product, loading, quantity, setQuantity, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [cep, setCep] = useState('');
  const [cepModal, setCepModal] = useState({ show: false, inCoverage: false, city: '', uf: '', isError: false });

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔄</div>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Carregando produto...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🔍</div>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '8px' }}>
          Produto não encontrado
        </p>
      </div>
    );
  }

  const hasSizeVariations = ['Rações', 'Higiene', 'Petiscos'].includes(product.category);
  
  const productSizes = product.name.toLowerCase().startsWith('ração') 
    ? ['15kg', '20kg', '30kg']
    : [];

  const displayName = selectedSize ? `${product.name} ${selectedSize}` : product.name;

  const handleCepSearch = async () => {
    const cleanCep = cep.replace(/\D/g, '');

    if (!cleanCep || cleanCep.length < 8) {
      setCepModal({ show: true, inCoverage: false, city: 'CEP incompleto', isError: true });
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();

      if (data.erro || !data.localidade) {
        setCepModal({ show: true, inCoverage: false, city: 'CEP não encontrado', isError: true });
        return;
      }

      const inCoverage = data.localidade.toLowerCase() === 'são paulo' || data.localidade.toLowerCase() === 'sao paulo';
      setCepModal({
        show: true,
        inCoverage,
        city: data.localidade,
        uf: data.uf,
        isError: false
      });
    } catch (error) {
      setCepModal({ show: true, inCoverage: false, city: 'Erro ao consultar CEP', isError: true });
    }
  };

  const handleCepChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 8) value = value.slice(0, 8);
    
    if (value.length > 5) {
      value = `${value.slice(0, 5)}-${value.slice(5)}`;
    }
    
    setCep(value);
  };

  return (
    <section className="section-container" style={{ padding: '40px 24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.9rem',
          color: 'var(--text-muted)'
        }}>
          <a href="/" style={{ 
            color: 'var(--purple-accent)', 
            textDecoration: 'none', 
            fontWeight: '600',
          }}>
            Home
          </a>
          <span>›</span>
          <a href="/products" style={{ 
            color: 'var(--purple-accent)', 
            textDecoration: 'none', 
            fontWeight: '600',
          }}>
            Produtos
          </a>
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', 
        gap: '48px', 
        alignItems: 'start',
        backgroundColor: 'var(--white)',
        borderRadius: 'var(--radius)',
        padding: '40px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div className="product-image-section">
          <div style={{ 
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            backgroundColor: 'var(--purple-subtle)',
            height: '450px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid var(--purple-light)'
          }}>
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.name} 
                style={{ 
                  width: '90%', 
                  height: '90%', 
                  objectFit: 'contain',
                }} 
              />
            ) : (
              <div style={{ fontSize: '5rem' }}>📦</div>
            )}
            {product.badge && (
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                backgroundColor: 'var(--yellow-gema)',
                color: 'var(--purple-dark)',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: '800',
                textTransform: 'uppercase'
              }}>
                {product.badge}
              </div>
            )}
          </div>
          
          <div style={{ 
            padding: '20px',
            backgroundColor: 'var(--purple-subtle)',
            borderRadius: '12px',
            border: '1px solid var(--purple-light)',
            marginTop: '24px'
          }}>
            <h3 style={{ 
              fontSize: '0.9rem', 
              fontWeight: '700', 
              color: 'var(--purple-dark)', 
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Simular frete e prazo
            </h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="00000-000"
                value={cep}
                onChange={handleCepChange}
                maxLength={9}
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  border: '2px solid var(--purple-light)',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
              <button
                onClick={handleCepSearch}
                style={{
                  padding: '10px 20px',
                  backgroundColor: 'var(--purple-main)',
                  color: 'var(--white)',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: '600',
                  fontSize: '0.85rem',
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
                Consultar
              </button>
            </div>
          </div>
        </div>

        <div className="product-info-section">
          <div style={{ marginBottom: '8px' }}>
            <span style={{ 
              fontSize: '0.75rem', 
              color: 'var(--purple-accent)', 
              fontWeight: '700', 
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {product.category}
            </span>
          </div>

          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: '800', 
            color: 'var(--purple-dark)', 
            marginBottom: '12px',
            lineHeight: '1.1'
          }}>
            {displayName}
          </h1>

          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            marginBottom: '20px',
            color: '#F59E0B',
            fontSize: '1rem',
            fontWeight: '600'
          }}>
            <span>★ {product.rating}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '400' }}>
              Avaliação
            </span>
          </div>

          <div style={{ 
            marginBottom: '28px',
            paddingBottom: '24px',
            borderBottom: '2px solid var(--purple-light)'
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
              {product.oldPrice && (
                <span style={{ 
                  fontSize: '1.2rem', 
                  color: '#94A3B8', 
                  textDecoration: 'line-through',
                  fontWeight: '500'
                }}>
                  R$ {product.oldPrice}
                </span>
              )}
              <span style={{ 
                fontSize: '2.5rem', 
                fontWeight: '800', 
                color: 'var(--purple-dark)',
                lineHeight: '1'
              }}>
                R$ {product.price}
              </span>
            </div>
            {product.oldPrice && (
              <div style={{ marginTop: '8px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                à vista no PIX
              </div>
            )}
          </div>

          {hasSizeVariations && productSizes.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ 
                fontSize: '0.9rem', 
                fontWeight: '700', 
                color: 'var(--purple-dark)', 
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Escolha o tamanho
              </h3>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {productSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      padding: '8px 20px',
                      borderRadius: '6px',
                      border: '2px solid',
                      backgroundColor: selectedSize === size ? 'var(--purple-main)' : 'var(--white)',
                      color: selectedSize === size ? 'var(--white)' : 'var(--purple-dark)',
                      borderColor: selectedSize === size ? 'var(--purple-main)' : 'var(--purple-light)',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'var(--transition)',
                    }}
                    onMouseEnter={(e) => {
                      if (selectedSize !== size) {
                        e.currentTarget.style.borderColor = 'var(--purple-accent)';
                        e.currentTarget.style.backgroundColor = 'var(--purple-light)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedSize !== size) {
                        e.currentTarget.style.borderColor = 'var(--purple-light)';
                        e.currentTarget.style.backgroundColor = 'var(--white)';
                      }
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ 
              fontSize: '0.9rem', 
              fontWeight: '700', 
              color: 'var(--purple-dark)', 
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Quantidade
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '6px',
                  backgroundColor: 'var(--purple-light)',
                  color: 'var(--purple-main)',
                  border: '2px solid var(--purple-light)',
                  fontSize: '1.3rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'var(--transition)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--purple-main)';
                  e.currentTarget.style.color = 'var(--white)';
                  e.currentTarget.style.borderColor = 'var(--purple-main)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--purple-light)';
                  e.currentTarget.style.color = 'var(--purple-main)';
                  e.currentTarget.style.borderColor = 'var(--purple-light)';
                }}
              >
                -
              </button>
              <span style={{ 
                fontSize: '1.1rem', 
                fontWeight: '700', 
                color: 'var(--purple-dark)',
                minWidth: '50px',
                textAlign: 'center'
              }}>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '6px',
                  backgroundColor: 'var(--purple-light)',
                  color: 'var(--purple-main)',
                  border: '2px solid var(--purple-light)',
                  fontSize: '1.3rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'var(--transition)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--purple-main)';
                  e.currentTarget.style.color = 'var(--white)';
                  e.currentTarget.style.borderColor = 'var(--purple-main)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--purple-light)';
                  e.currentTarget.style.color = 'var(--purple-main)';
                  e.currentTarget.style.borderColor = 'var(--purple-light)';
                }}
              >
                +
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
            <button
              onClick={onAddToCart}
              style={{
                flex: 1,
                padding: '10px 16px',
                backgroundColor: 'var(--purple-main)',
                color: 'var(--white)',
                border: 'none',
                borderRadius: '6px',
                fontWeight: '600',
                fontSize: '0.85rem',
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
              Adicionar ao Carrinho
            </button>
            <button
              style={{
                flex: 1,
                padding: '10px 16px',
                backgroundColor: 'var(--white)',
                color: 'var(--purple-main)',
                border: '2px solid var(--purple-main)',
                borderRadius: '6px',
                fontWeight: '600',
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'var(--transition)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--purple-main)';
                e.currentTarget.style.color = 'var(--white)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--white)';
                e.currentTarget.style.color = 'var(--purple-main)';
              }}
            >
              Comprar
            </button>
          </div>
        </div>
      </div>

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
              onClick={() => setCepModal({ show: false, inCoverage: false, city: '', isError: false })}
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
    </section>
  );
}
