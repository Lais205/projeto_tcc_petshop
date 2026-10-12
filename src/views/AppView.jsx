import FlashMessages from '../components/common/FlashMessages.jsx';
import useAppPresenter from '../presenters/useAppPresenter.js';
import AuthView from './AuthView.jsx';
import DashboardView from './DashboardView.jsx';
import HomeView from './HomeView.jsx';

export default function AppView() {
  const path = window.location.pathname;
  const session = useAppPresenter(path);
  let page;

  if (path === '/auth/login' || path === '/auth/register') {
    page = <AuthView isRegister={path === '/auth/register'} />;
  } else if (path === '/dashboard') {
    if (session.authenticated) {
      page = <DashboardView user={session.user} />;
    } else {
      page = (
        <main className="section-container">
          <p>{session.loading ? 'Carregando sua conta...' : 'Não foi possível verificar sua conta.'}</p>
        </main>
      );
    }
  } else {
    page = <HomeView authenticated={session.authenticated} user={session.user} />;
  }

  return (
    <>
      <FlashMessages messages={session.messages} error={session.error} />
      {page}
    </>
  );
}
