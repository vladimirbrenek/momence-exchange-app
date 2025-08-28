import react from '@vitejs/plugin-react';
import envF from 'dotenv';
import { defineConfig } from 'vite';

envF.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': process.env.API_URL || 'http://localhost:5000',
    },
  },
});
