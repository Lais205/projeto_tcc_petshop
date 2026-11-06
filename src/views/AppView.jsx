import FlashMessages from '../components/common/FlashMessages.jsx';
import useAppPresenter from '../presenters/useAppPresenter.js';
import AuthView from './AuthView.jsx';
import DashboardView from './DashboardView.jsx';
import HomeView from './HomeView.jsx';
import ProductsView from './ProductsView.jsx';
import ProductDetailView from './ProductDetailView.jsx';
import { Routes, Route, useLocation } from 'react-router-dom';

export default function AppView() {
  const location = useLocation();
  const session = useAppPresenter(location.pathname);

  return (
    <>
      <FlashMessages messages={session.messages} error={session.error} />
      <Routes>
        <Route path="/auth/login" element={<AuthView isRegister={false} />} />
        <Route path="/auth/register" element={<AuthView isRegister={true} />} />
        <Route path="/dashboard" element={
          session.authenticated ? (
            <DashboardView user={session.user} />
          ) : (
            <main className="section-container">
              <p>{session.loading ? 'Carregando sua conta...' : 'Não foi possível verificar sua conta.'}</p>
            </main>
          )
        } />
        <Route path="/products" element={<ProductsView authenticated={session.authenticated} user={session.user} />} />
        <Route path="/product/:id" element={<ProductDetailView authenticated={session.authenticated} user={session.user} />} />
        <Route path="/" element={<HomeView authenticated={session.authenticated} user={session.user} />} />
      </Routes>
    </>
  );
}
