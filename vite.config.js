import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url' // 更安全的路径处理方式

export default defineConfig({
  plugins: [vue()],
  resolve: {
    server:{

      host:'0.0.0.0',

    },
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))

    },

    extensions: ['.js', '.vue', '.json']
  },
  optimizeDeps: {
    exclude: ['three'] // 排除Three.js重复打包
  }
})