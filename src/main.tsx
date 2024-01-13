import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import 'nprogress/nprogress.css';
import { SidebarProvider } from 'core/contexts/SidebarContext';
import * as serviceWorker from 'serviceWorker';
import App from 'App';
import { StrictMode, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import SuspenseLoader from 'core/components/SuspenseLoader';
import { ReactQueryDevtools } from 'react-query/devtools';
import './core/config/i18n';
import QueryWrapper from 'core/components/QueryWrapper';
import AuthProvider from 'content/auth/contexts/AuthProvider';
import SnackbarProvider from 'core/contexts/SnackbarProvider';

if (import.meta.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: import.meta.env.VITE_APP_SENTRY_DSN,
  });
}

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      suspense: true,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<SuspenseLoader />}>
        <Sentry.ErrorBoundary fallback={<SuspenseLoader />}>
          <QueryClientProvider client={queryClient}>
            <QueryWrapper>
              <HelmetProvider>
                <SnackbarProvider>
                  <AuthProvider>
                    <SidebarProvider>
                      <App />
                    </SidebarProvider>
                  </AuthProvider>
                </SnackbarProvider>
              </HelmetProvider>
            </QueryWrapper>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </Sentry.ErrorBoundary>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
);

serviceWorker.unregister();
