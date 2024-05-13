import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { createHtmlPlugin } from 'vite-plugin-html'


export default defineConfig({
  plugins: [
    vue(),
    createHtmlPlugin({
      minify: true,
      entry: '/src/main.js',
    })
  ],
  define: {
    '__APP_VERSION__': JSON.stringify(process.env.npm_package_version),
    '__BUILD_DATE__': JSON.stringify(new Date().toISOString())
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
  server: {
    open: true,
  },
})