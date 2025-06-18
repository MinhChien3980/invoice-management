import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Cung cấp polyfills cho các thư viện Node.js
      util: 'util/'
    }
  },
  define: {
    // Tạo global variable cho trình duyệt
    global: 'window'
  }
})
