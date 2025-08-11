import { defineConfig } from 'vite'
import path  from 'path'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/review-activity/",
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      models: path.resolve(__dirname, 'src/models'),
      styles: path.resolve(__dirname, 'src/styles'),
      // add other aliases as needed
    },
  },
})
