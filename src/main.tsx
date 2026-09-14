import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './editorial.css';
import './tedy-overrides.css';
import './jrh-final.css';
import './jrh-polish.css';

const root = document.getElementById('root');

if (!root) {
  throw new Error('JRH root element not found');
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
