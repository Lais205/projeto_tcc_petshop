import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  fetchCategories,
  fetchProducts,
  filterProducts,
} from '../models/productModel.js';

export default function useProductsPresenter() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(() => {
    const saved = localStorage.getItem('productsPagination');
    return saved ? JSON.parse(saved) : { page: 1, per_page: 12, total: 0, total_pages: 1 };
  });
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [cep, setCep] = useState('');
  const [cepModal, setCepModal] = useState({ show: false, inCoverage: false, city: '' });

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [productsResponse, categoriesData] = await Promise.all([
          fetchProducts({ category, search, minPrice: minPrice ? parseFloat(minPrice) : null, maxPrice: maxPrice ? parseFloat(maxPrice) : null, sortBy, page: pagination.page, perPage: pagination.per_page }),
          fetchCategories(),
        ]);
        setProducts(productsResponse.products || productsResponse);
        setCategories(categoriesData);
        setPagination(productsResponse.pagination || { page: 1, per_page: 12, total: 0, total_pages: 1 });
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [category, search, minPrice, maxPrice, sortBy, pagination.page, pagination.per_page]);

  const visibleProducts = useMemo(
    () => filterProducts(products, search, category),
    [products, search, category],
  );

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const setPage = useCallback((page) => {
    setPagination(prev => {
      const newPagination = { ...prev, page };
      localStorage.setItem('productsPagination', JSON.stringify(newPagination));
      return newPagination;
    });
  }, []);

  const handleCepSearch = useCallback(async (cepValue) => {
    const cleanCep = cepValue.replace(/\D/g, '');

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
  }, []);

  const closeCepModal = useCallback(() => {
    setCepModal({ show: false, inCoverage: false, city: '' });
  }, []);

  return {
    search,
    setSearch,
    category,
    setCategory,
    isCartOpen,
    openCart,
    closeCart,
    visibleProducts,
    categories,
    loading,
    pagination,
    setPage,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    sortBy,
    setSortBy,
    cep,
    setCep,
    handleCepSearch,
    cepModal,
    closeCepModal,
  };
}
