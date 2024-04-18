import vue from '@vitejs/plugin-vue'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { resolve } from 'path'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },

  renderer: {
    resolve: {
      alias: {
        '@': resolve('src/renderer/src'),
        '@pages': resolve('src/renderer/src/pages'),
        '@atoms': resolve('src/renderer/src/components/atoms'),
        '@template': resolve('src/renderer/src/components/template')
      }
    },
    plugins: [vue()]
  }
})
