import { useEffect, useState } from 'react';
import { getCurrentSession } from '../models/sessionModel.js';

export default function useAppPresenter(path) {
  const [session, setSession] = useState({
    loading: true,
    authenticated: false,
    user: null,
    messages: [],
    error: '',
  });

  useEffect(() => {
    let active = true;

    getCurrentSession()
      .then((data) => {
        if (!active) return;
        setSession({
          loading: false,
          authenticated: data.authenticated,
          user: data.user,
          messages: data.messages || [],
          error: '',
        });
      })
      .catch((error) => {
        if (!active) return;
        setSession({
          loading: false,
          authenticated: false,
          user: null,
          messages: [],
          error: error.message,
        });
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (session.loading) return;

    if (session.authenticated && (path === '/auth/login' || path === '/auth/register')) {
      window.location.replace('/');
    } else if (path === '/dashboard' && !session.authenticated && !session.error) {
      window.location.replace('/auth/login');
    }
  }, [path, session.authenticated, session.error, session.loading]);

  return session;
}
