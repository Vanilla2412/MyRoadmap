import '@testing-library/jest-dom';
import { vi } from 'vitest';

// --- Global Mocks for UI Tests ---

// Mock ResizeObserver which is required by many Radix UI / shadcn components.
// jsdom does not provide a native implementation.
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserverMock;

// Mock window.matchMedia which is often used for responsive UI or theme detection.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
