
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log("%c AREVA SYSTEM INITIALIZED ", "background: #e31e24; color: white; font-weight: bold;");
console.log("React Version:", React.version);

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
