import './style.config';

import React from 'react';

import { jest } from '@jest/globals';

const consoleWarn = console.warn;

console.warn = (...e: any[]) => {
  if (
    typeof e[0] === 'string' &&
    e[0].startsWith(
      '[Reanimated] Reduced motion setting is enabled on this device.'
    )
  )
    return;
  consoleWarn(...e);
};

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
global.React = React;
