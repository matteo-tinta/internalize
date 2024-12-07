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
      '@': path.resolve(__dirname, './src/'),
      '@tests': path.resolve(__dirname, './tests'),
    },
  },
})