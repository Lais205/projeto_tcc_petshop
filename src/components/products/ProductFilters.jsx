export default function ProductFilters({ categories, category, onCategoryChange, minPrice, maxPrice, sortBy, onMinPriceChange, onMaxPriceChange, onSortChange, cep, setCep, onCepSearch }) {
  const formatCep = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 5) {
      return numbers;
    }
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
  };

  const handleCepChange = (e) => {
    const formatted = formatCep(e.target.value);
    setCep(formatted);
  };

  const handleSearch = () => {
    onCepSearch(cep);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--white)', padding: '0', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
      <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--purple-dark)', margin: 0 }}>Filtros</h3>
      </div>

      <div style={{ padding: '24px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--purple-dark)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '4px', height: '20px', backgroundColor: 'var(--yellow-gema)', borderRadius: '2px' }}></span>
            Categorias
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {categories.map((cat) => (
              <label
                key={cat}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  transition: 'var(--transition)',
                  backgroundColor: category === cat ? 'var(--purple-light)' : 'transparent',
                  border: category === cat ? '2px solid var(--purple-main)' : '2px solid transparent',
                }}
                onMouseEnter={(e) => {
                  if (category !== cat) {
                    e.currentTarget.style.backgroundColor = 'var(--purple-subtle)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (category !== cat) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={category === cat}
                  onChange={() => onCategoryChange(category === cat ? '' : cat)}
                  style={{
                    width: '20px',
                    height: '20px',
                    accentColor: 'var(--purple-main)',
                    cursor: 'pointer',
                  }}
                />
                <span style={{ color: 'var(--text-dark)', fontWeight: '600', fontSize: '0.95rem' }}>
                  {cat}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--purple-dark)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '4px', height: '20px', backgroundColor: 'var(--yellow-gema)', borderRadius: '2px' }}></span>
            Faixa de Preço
          </h4>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => onMinPriceChange(e.target.value)}
                placeholder="Mín"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid var(--purple-light)',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  transition: 'var(--transition)',
                  backgroundColor: 'var(--white)',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--purple-accent)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--purple-light)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            <span style={{ color: 'var(--text-muted)', fontWeight: '600', fontSize: '1.1rem' }}>-</span>
            <div style={{ flex: 1 }}>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => onMaxPriceChange(e.target.value)}
                placeholder="Máx"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid var(--purple-light)',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  transition: 'var(--transition)',
                  backgroundColor: 'var(--white)',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--purple-accent)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--purple-light)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--purple-dark)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '4px', height: '20px', backgroundColor: 'var(--yellow-gema)', borderRadius: '2px' }}></span>
            Consultar CEP
          </h4>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              value={cep}
              onChange={handleCepChange}
              onKeyPress={handleKeyPress}
              placeholder="00000-000"
              maxLength={9}
              style={{
                flex: 1,
                padding: '12px 16px',
                border: '2px solid var(--purple-light)',
                borderRadius: '8px',
                fontSize: '0.95rem',
                transition: 'var(--transition)',
                backgroundColor: 'var(--white)',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--purple-accent)';
                e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--purple-light)';
                e.target.style.boxShadow = 'none';
              }}
            />
            <button
              onClick={handleSearch}
              style={{
                padding: '12px 24px',
                backgroundColor: 'var(--purple-main)',
                color: 'var(--white)',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
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
              Buscar
            </button>
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--purple-dark)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '4px', height: '20px', backgroundColor: 'var(--yellow-gema)', borderRadius: '2px' }}></span>
            Ordenar por
          </h4>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid var(--purple-light)',
              borderRadius: '8px',
              fontSize: '0.95rem',
              backgroundColor: 'var(--white)',
              cursor: 'pointer',
              transition: 'var(--transition)',
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B21A8' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 16px center',
              paddingRight: '40px',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--purple-accent)';
              e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.15)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--purple-light)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <option value="name">Nome (A-Z)</option>
            <option value="price_asc">Preço (Menor para Maior)</option>
            <option value="price_desc">Preço (Maior para Menor)</option>
            <option value="rating">Avaliação</option>
          </select>
        </div>
      </div>
    </div>
  );
}
