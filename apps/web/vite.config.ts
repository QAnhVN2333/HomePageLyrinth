import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Allow external hostnames (for example: *.trycloudflare.com).
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: ['.trycloudflare.com',"test.lyrinth.com"],
    // Keep frontend and API under one public URL when tunneling Vite.
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
    // Cloudflare tunnel terminates TLS at the edge, browser connects via 443.
    hmr: {
      clientPort: 443,
    },
  },
})
