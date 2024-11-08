import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Your backend URL with port
        changeOrigin: true,             // Required for different origin
        secure: false,                // If your backend uses HTTPS, set to true
        // rewrite: (path) => path.replace(/^\/api/, ''), // Important: removes the /api prefix
      },
    },
  },
})