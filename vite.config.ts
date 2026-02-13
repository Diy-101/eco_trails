import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Получаем base URL из переменной окружения
  // VITE_BASE_URL должен быть установлен при билде для GitHub Pages
  const base = process.env.VITE_BASE_URL || '/'
  
  // Выводим base URL для отладки (только в режиме разработки)
  if (mode === 'development') {
    console.log('Vite base URL:', base)
  }
  
  return {
    plugins: [react()],
    base: base,
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      // Убеждаемся, что пути обрабатываются правильно
      rollupOptions: {
        output: {
          // Это поможет Vite правильно обработать пути
          assetFileNames: 'assets/[name].[hash].[ext]',
          chunkFileNames: 'assets/[name].[hash].js',
          entryFileNames: 'assets/[name].[hash].js',
        },
      },
    },
  }
})
