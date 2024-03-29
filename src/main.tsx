import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import 'nprogress/nprogress.css';
import { SidebarProvider } from 'core/contexts/SidebarContext';
import setupServiceWorker from 'serviceWorker';
import App from 'App';
import { StrictMode, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import SuspenseLoader from 'core/components/SuspenseLoader';
import { ReactQueryDevtools } from 'react-query/devtools';
import './core/config/i18n';
import QueryWrapper from 'core/components/QueryWrapper';
import AuthProvider from 'modules/auth/contexts/AuthProvider';
import SnackbarProvider from 'core/contexts/SnackbarProvider';
import { NODE_ENV, VITE_APP_SENTRY_DSN } from 'core/config';

if (NODE_ENV === 'production') {
  Sentry.init({
    dsn: VITE_APP_SENTRY_DSN,
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
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={<SuspenseLoader />}>
          <Sentry.ErrorBoundary fallback={<SuspenseLoader />}>
            <QueryClientProvider client={queryClient}>
              <QueryWrapper>
                <SnackbarProvider>
                  <AuthProvider>
                    <SidebarProvider>
                      <App />
                    </SidebarProvider>
                  </AuthProvider>
                </SnackbarProvider>
              </QueryWrapper>
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </Sentry.ErrorBoundary>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);

setupServiceWorker();
