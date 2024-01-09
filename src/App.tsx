import { useRoutes } from 'react-router-dom';
import router from 'router';

import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';

import { CssBaseline } from '@mui/material';
import {ThemeProviderWrapper} from './theme/ThemeProvider';

function App() {
  const content = useRoutes(router);

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
