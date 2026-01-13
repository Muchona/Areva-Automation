
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

console.log("AREVA LOADER: Initializing React " + React.version);

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  const errorMsg = "CRITICAL FAULT: Root element 'root' not found.";
  console.error(errorMsg);
  document.body.innerHTML = `<div style="color:white; background:#e31e24; padding:20px; font-family:sans-serif;">${errorMsg}</div>`;
}
