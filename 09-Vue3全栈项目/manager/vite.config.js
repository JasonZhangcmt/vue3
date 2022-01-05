import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 改变端口等配置
  server: {
    port: 8081,
    proxy: {
      // 此处代理并非是 http://localhost:8081/api  -> http://localhost:3000/api
      // 因为后端是 http://127.0.0.1:3000/api/users/login
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
      // 注释 router.prefix('/api') 
      // 重写：api 替代成空 ''
      // http://localhost:8082/api  http://localhost:3000
    }
  }
})
