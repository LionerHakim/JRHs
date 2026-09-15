import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './jrh-system.css';
import './jrh-fixes.css';

const root = document.getElementById('root');

if (!root) {
  throw new Error('JRH root element not found');
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
