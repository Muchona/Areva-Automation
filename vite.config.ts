
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', 
  define: {
    // Hard-define the environment object to prevent 'process is not defined'
    'process.env': {
      API_KEY: JSON.stringify(process.env.API_KEY || ''),
      NODE_ENV: JSON.stringify('production')
    }
  },
  server: {
    port: 3000,
    open: true,
    host: true
  },
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    target: 'esnext'
  }
});
