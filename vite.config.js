import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    proxy: {
      '/api': 'http://127.0.0.1:5000',
      '/auth': {
        target: 'http://127.0.0.1:5000',
        bypass: (request) => {
          const path = request.url?.split('?')[0];
          if (
            request.method === 'GET'
            && (path === '/auth/login' || path === '/auth/register')
          ) {
            return request.url;
          }
        },
      },
      '/static': 'http://127.0.0.1:5000',
    },
  },
});
