import SiteFooter from '../components/common/SiteFooter.jsx';
import SiteHeader from '../components/common/SiteHeader.jsx';
import HeroSection from '../components/home/HeroSection.jsx';
import ProductsSection from '../components/home/ProductsSection.jsx';
import ServicesSection from '../components/home/ServicesSection.jsx';
import useHomePresenter from '../presenters/useHomePresenter.js';

export default function HomeView({ authenticated, user }) {
  const {
    search,
    setSearch,
    category,
    setCategory,
    visibleProducts,
    categories,
    services,
    loading,
  } = useHomePresenter();

  return (
    <>
      <SiteHeader
        authenticated={authenticated}
        user={user}
        search={search}
        onSearchChange={setSearch}
        isCartOpen={false}
        onCartOpen={() => {}}
        category={category}
        onCategoryChange={setCategory}
        categories={categories}
        showAllProducts={false}
      />
      <main>
        <HeroSection />
        <ProductsSection products={visibleProducts} loading={loading} showViewAllButton={true} />
        <ServicesSection services={services} />
      </main>
      <SiteFooter />
    </>
  );
}
