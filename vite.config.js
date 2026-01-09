// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// // import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react() /**, tailwindcss */()],
// })

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";

// export default defineConfig({
//   plugins: [react()],
// });

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      // All requests that start with /api  → go to backend
      '/api': {
        target: 'http://localhost:9000',
        changeOrigin: true,
        // optional: rewrite (if your backend doesn't have /api prefix)
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
