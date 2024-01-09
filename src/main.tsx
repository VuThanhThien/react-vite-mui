import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import 'nprogress/nprogress.css';
import { SidebarProvider } from 'contexts/SidebarContext';
import * as serviceWorker from 'serviceWorker';
import App from 'App';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <SidebarProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SidebarProvider>
  </HelmetProvider>
)

serviceWorker.unregister();
