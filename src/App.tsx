import { useRoutes } from 'react-router-dom';
import router from 'router';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { CssBaseline } from '@mui/material';
import { ThemeProviderWrapper } from './core/theme/ThemeProvider';
import usePageTracking from 'core/hooks/usePageTracking';

function App() {
  const content = useRoutes(router);
  usePageTracking();

  return (
    <ThemeProviderWrapper>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        {content}
      </LocalizationProvider>
    </ThemeProviderWrapper>
  );
}
export default App;
