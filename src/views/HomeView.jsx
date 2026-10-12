import CartDrawer from '../components/common/CartDrawer.jsx';
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
    cartItems,
    cartCount,
    cartTotal,
    isCartOpen,
    openCart,
    closeCart,
    addToCart,
    updateCartQuantity,
    visibleProducts,
    categories,
    services,
  } = useHomePresenter();

  return (
    <>
      <SiteHeader
        authenticated={authenticated}
        user={user}
        search={search}
        onSearchChange={setSearch}
        cartCount={cartCount}
        isCartOpen={isCartOpen}
        onCartOpen={openCart}
        category={category}
        onCategoryChange={setCategory}
        categories={categories}
      />
      <main>
        <HeroSection />
        <ProductsSection products={visibleProducts} onAddToCart={addToCart} />
        <ServicesSection services={services} />
      </main>
      <CartDrawer
        isOpen={isCartOpen}
        items={cartItems}
        itemCount={cartCount}
        total={cartTotal}
        onClose={closeCart}
        onChangeQuantity={updateCartQuantity}
      />
      <SiteFooter />
    </>
  );
}
