import { useParams } from 'react-router-dom';
import CartDrawer from '../components/common/CartDrawer.jsx';
import SiteFooter from '../components/common/SiteFooter.jsx';
import SiteHeader from '../components/common/SiteHeader.jsx';
import ProductDetailSection from '../components/products/ProductDetailSection.jsx';
import useProductDetailPresenter from '../presenters/useProductDetailPresenter.js';

export default function ProductDetailView({ authenticated, user }) {
  const { id } = useParams();
  const {
    product,
    loading,
    quantity,
    setQuantity,
    isCartOpen,
    openCart,
    closeCart,
    handleAddToCart,
    categories,
  } = useProductDetailPresenter(id);

  return (
    <>
      <SiteHeader
        authenticated={authenticated}
        user={user}
        isCartOpen={isCartOpen}
        onCartOpen={openCart}
        categories={categories}
        showAllProducts={true}
      />
      <main>
        <ProductDetailSection
          product={product}
          loading={loading}
          quantity={quantity}
          setQuantity={setQuantity}
          onAddToCart={handleAddToCart}
        />
      </main>
      <CartDrawer
        isOpen={isCartOpen}
        onClose={closeCart}
      />
      <SiteFooter />
    </>
  );
}
