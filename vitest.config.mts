import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'
 
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [
      'tests/setup.ts'
    ],
    include: [
      "tests/**/*.test.{ts,tsx}"
    ],
    exclude: [
      "tests/__*"
    ]
  },
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, './src/app'),
      '@lib': path.resolve(__dirname, './src/app/lib'),
      '@fixtures': path.resolve(__dirname, './tests/__fixtures'),
    },
  },
})