import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  fetchCategories,
  fetchProducts,
  filterProducts,
  services,
} from '../models/productModel.js';

export default function useHomePresenter() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [productsResponse, categoriesData] = await Promise.all([
          fetchProducts({ featured: true, perPage: 10 }),
          fetchCategories(),
        ]);
        setProducts(productsResponse.products || productsResponse);
        setCategories(categoriesData);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const visibleProducts = useMemo(
    () => filterProducts(products, search, category).slice(0, 10),
    [products, search, category],
  );

  return {
    search,
    setSearch,
    category,
    setCategory,
    visibleProducts,
    categories,
    services,
    loading,
  };
}
