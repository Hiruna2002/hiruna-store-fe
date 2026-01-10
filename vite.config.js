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

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'


// export default defineConfig({
//   plugins: [react()],

//   server: {
//     proxy: {
      
//       '/api': {
//         target: 'http://localhost:9000',
//         changeOrigin: true,
        
//       }
//     }
//   }
// })

// vite.config.js  (හෝ vite.config.ts)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      // All requests starting with /api will be proxied to backend
      '/api': {
        target: 'http://localhost:9000',
        changeOrigin: true,
        secure: false,              // development වලදී HTTPS නැති නිසා
        rewrite: (path) => path.replace(/^\/api/, ''),   // optional - ඕන නැත්නම් remove කරන්න
      },
    },
  },
})
