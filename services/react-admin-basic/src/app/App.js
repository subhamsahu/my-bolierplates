import { useRoutes } from 'react-router-dom';
import routes from './routes/routes';
import { CssBaseline } from '@mui/material';
import AppTheme from './components/AppTheme/AppTheme';
import { SettingsProvider } from './context/SettingsContext';

function App() {
  const content = useRoutes(routes);
  return (
    <SettingsProvider>
      <AppTheme>
        <CssBaseline/>
        {content}
      </AppTheme>
    </SettingsProvider>
  );
}

export default App;
