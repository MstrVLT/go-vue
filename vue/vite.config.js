import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  optimizeDeps:{
		exclude:["src/worker/main.wasm"]
	},
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
