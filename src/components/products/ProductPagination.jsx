export default function ProductPagination({ pagination, onPageChange }) {
  const { page, total_pages, total } = pagination;
  const maxVisiblePages = 5;

  if (total_pages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(total_pages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '40px', flexWrap: 'wrap' }}>
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        style={{
          padding: '10px 16px',
          border: '2px solid var(--purple-light)',
          borderRadius: '8px',
          backgroundColor: page === 1 ? 'var(--bg-light)' : 'var(--white)',
          color: page === 1 ? 'var(--text-muted)' : 'var(--purple-main)',
          cursor: page === 1 ? 'not-allowed' : 'pointer',
          fontWeight: '600',
          fontSize: '0.9rem',
          transition: 'var(--transition)',
        }}
      >
        Anterior
      </button>

      {pageNumbers[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            style={{
              padding: '10px 16px',
              border: '2px solid var(--purple-light)',
              borderRadius: '8px',
              backgroundColor: 'var(--white)',
              color: 'var(--purple-main)',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.9rem',
              transition: 'var(--transition)',
            }}
          >
            1
          </button>
          {pageNumbers[0] > 2 && <span style={{ color: 'var(--text-muted)' }}>...</span>}
        </>
      )}

      {pageNumbers.map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          style={{
            padding: '10px 16px',
            border: page === pageNum ? '2px solid var(--yellow-gema)' : '2px solid var(--purple-light)',
            borderRadius: '8px',
            backgroundColor: page === pageNum ? 'var(--yellow-gema)' : 'var(--white)',
            color: page === pageNum ? 'var(--purple-dark)' : 'var(--purple-main)',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.9rem',
            transition: 'var(--transition)',
          }}
        >
          {pageNum}
        </button>
      ))}

      {pageNumbers[pageNumbers.length - 1] < total_pages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < total_pages - 1 && <span style={{ color: 'var(--text-muted)' }}>...</span>}
          <button
            onClick={() => onPageChange(total_pages)}
            style={{
              padding: '10px 16px',
              border: '2px solid var(--purple-light)',
              borderRadius: '8px',
              backgroundColor: 'var(--white)',
              color: 'var(--purple-main)',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.9rem',
              transition: 'var(--transition)',
            }}
          >
            {total_pages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === total_pages}
        style={{
          padding: '10px 16px',
          border: '2px solid var(--purple-light)',
          borderRadius: '8px',
          backgroundColor: page === total_pages ? 'var(--bg-light)' : 'var(--white)',
          color: page === total_pages ? 'var(--text-muted)' : 'var(--purple-main)',
          cursor: page === total_pages ? 'not-allowed' : 'pointer',
          fontWeight: '600',
          fontSize: '0.9rem',
          transition: 'var(--transition)',
        }}
      >
        Próxima
      </button>
    </div>
  );
}
