import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      exclude: ['src/index.ts']
    },
    environment: 'jsdom',
    include: ['tests/**/*.test.ts']
  }
})
