import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  darkMode: 'class',
  base: "/nitesh-portfolio-site/",
  plugins: [
    [react(), tailwindcss(),]
  ],
})