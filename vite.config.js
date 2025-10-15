import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/prarthanasureshkumar.github.io/',
  server: {
    fs: {
      strict: false
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  }
});
