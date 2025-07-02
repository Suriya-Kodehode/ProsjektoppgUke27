import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { baseUrl } from './config'

// https://vite.dev/config/
export default defineConfig({
  base: baseUrl,
  resolve: {
    alias: {
      '@': '/src',
    }
  },
  plugins: [react()],
})
