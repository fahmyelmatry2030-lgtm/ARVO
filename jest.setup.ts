/// <reference types="jest" />
import '@testing-library/jest-dom'

// Mock next/router for simple push usage in tests
;(global as any).jest = (global as any).jest || {}
jest.mock('next/router', () => ({
  useRouter() {
    return { push: jest.fn(), prefetch: jest.fn() }
  }
}))
