import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Mock matchMedia for react-hot-toast
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', async () => {
  const React = await import('react');
  
  // Create a component that forwards all props except motion-specific ones
  const createMotionComponent = (element: string) => {
    const component = React.forwardRef<HTMLElement, Record<string, unknown>>((props, ref) => {
      // Filter out framer-motion specific props
      const motionProps = [
        'animate', 'initial', 'exit', 'variants', 'transition',
        'whileHover', 'whileTap', 'whileFocus', 'whileInView'
      ];
      const domProps = Object.keys(props)
        .filter(key => !motionProps.includes(key))
        .reduce((obj, key) => {
          obj[key] = props[key];
          return obj;
        }, {} as Record<string, unknown>);
      
      return React.createElement(element, { ...domProps, ref });
    });
    component.displayName = `Motion${element.charAt(0).toUpperCase() + element.slice(1)}`;
    return component;
  };

  return {
    motion: {
      div: createMotionComponent('div'),
      label: createMotionComponent('label'),
      input: createMotionComponent('input'),
      textarea: createMotionComponent('textarea'),
      select: createMotionComponent('select'),
      button: createMotionComponent('button'),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  };
});

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
}));

