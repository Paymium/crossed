import { render } from '@crossed/test';
import { Registry } from '../src/Registry';

jest.mock('next/navigation', () => ({
  useServerInsertedHTML: jest.fn((e) => e()),
}));
jest.mock('react-native', () => ({
  AppRegistry: {
    registerComponent: jest.fn(),
    getApplication: jest.fn(() => ({ getStyleElement: jest.fn() })),
  },
}));
jest.mock('react', () => {
  const { ...actual } = jest.requireActual('react');
  jest.spyOn(actual, 'useRef');
  return { __esModule: true, ...actual };
});

describe('Registry', () => {
  test('render', () => {
    const { useServerInsertedHTML } = jest.requireMock('next/navigation');
    const { AppRegistry } = jest.requireMock('react-native');
    const { useRef } = jest.requireMock('react');
    const getStyleElement = jest.fn();
    AppRegistry.getApplication.mockImplementation(() => ({ getStyleElement }));
    const { rerender } = render(<Registry />);
    expect(useServerInsertedHTML).toBeCalled();
    expect(useRef).toBeCalledWith(false);
    expect(AppRegistry.registerComponent).toBeCalled();
    expect(AppRegistry.getApplication).toBeCalledWith('Registry');
    expect(getStyleElement).toBeCalled();
    rerender(<Registry />);
    expect(useServerInsertedHTML).toBeCalledTimes(2);
    expect(AppRegistry.registerComponent).toBeCalledTimes(1);
    expect(AppRegistry.getApplication).toBeCalledTimes(1);
    expect(getStyleElement).toBeCalledTimes(1);
  });
});
