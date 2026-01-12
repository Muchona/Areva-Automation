
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const renderApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error("Areva Boot Fault: Root element missing. Retrying...");
    return false;
  }

  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  return true;
};

// Start boot sequence
if (!renderApp()) {
  window.addEventListener('DOMContentLoaded', renderApp);
}
