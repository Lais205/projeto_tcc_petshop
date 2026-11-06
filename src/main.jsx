import { createRoot } from 'react-dom/client';
import { BrowserRouter, useLocation } from 'react-router-dom';
import AppView from './views/AppView.jsx';
import '../app/static/css/style.css';
import { useEffect } from 'react';
import { CartProvider } from './context/CartContext.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CartProvider>
      <ScrollToTop />
      <AppView />
    </CartProvider>
  </BrowserRouter>
);
