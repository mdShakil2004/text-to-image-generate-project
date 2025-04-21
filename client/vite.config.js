import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Output directory for built assets
    // The relative path of the directory containing built assets to publish.
    // Examples: './build', 'dist', and 'frontend/build'
  },
  env: {
    NODE_ENV: 'production',
  },
})