import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { SupabaseProvider } from './contexts/SupabaseProvider';

// Use HashRouter for GitHub Pages so refreshes do not 404
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SupabaseProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </SupabaseProvider>
  </StrictMode>
);
