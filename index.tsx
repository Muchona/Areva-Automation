
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

console.log("%c AREVA SYSTEM ONLINE ", "background: #e31e24; color: white; font-weight: bold;");

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("FATAL: Root element not found.");
}
