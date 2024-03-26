/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

// import { Registry } from '../../Registry';
// import { BasePlugin } from '../../plugins';
// import { useStyles } from '../useStyles';
// import { useCallback, useMemo, useState, useTransition } from 'react';

jest.mock('react');

// const mocked = <C>(e: C) => e as jest.Mock<C>;

// const useCallbackMocked = mocked(useCallback);
// const useMemoMocked = mocked(useMemo);
// const useStateMocked = mocked(useState);
// const useTransitionMocked = mocked(useTransition);

describe('useStyles', () => {
  // beforeEach(() => {
  //   useCallbackMocked.mockReset();
  //   useMemoMocked.mockReset();
  //   useStateMocked.mockReset();
  //   useTransitionMocked.mockReset();
  // });
  // test('no theme or plugin', () => {
  //   const setState = jest.fn();
  //   const setTransition = jest.fn();
  //   const callback = jest.fn();
  //   useCallbackMocked.mockImplementation((cb) =>
  //     callback.mockImplementation(cb)
  //   );
  //   useMemoMocked.mockImplementation((cb) => cb());
  //   useStateMocked.mockImplementation((init) => [init, setState] as any);
  //   useTransitionMocked.mockImplementation(() => [null, setTransition] as any);
  //   const styleFunction = jest.fn().mockReturnValue({});
  //   const result = useStyle(styleFunction);
  //   expect(useStateMocked).toBeCalledTimes(2);
  //   expect(useStateMocked.mock.calls[0][0]).toBe(false);
  //   expect(useStateMocked.mock.calls[1][0]).toBe(false);
  //   expect(useTransitionMocked).toBeCalledTimes(1);
  //   expect(useCallbackMocked).toBeCalledTimes(4);
  //   expect(useMemoMocked).toBeCalledTimes(1);
  //   expect(result).toHaveProperty('style', [undefined]);
  //   expect(result).toHaveProperty('className', '');
  //   expect(result).toHaveProperty('theme', undefined);
  //   expect(result).toHaveProperty('onPressIn');
  //   expect(result).toHaveProperty('onPressOut');
  //   expect(result).toHaveProperty('onHoverIn');
  //   expect(result).toHaveProperty('onHoverOut');
  // });
  // test('theme or plugin', () => {
  //   Registry.addPlugin(BasePlugin);
  //   const setState = jest.fn();
  //   const setTransition = jest.fn();
  //   const callback = jest.fn();
  //   useCallbackMocked.mockImplementation((cb) =>
  //     callback.mockImplementation(cb)
  //   );
  //   useMemoMocked.mockImplementation((cb) => cb());
  //   useStateMocked.mockImplementation((init) => [init, setState] as any);
  //   useTransitionMocked.mockImplementation(() => [null, setTransition] as any);
  //   const styleFunction = jest
  //     .fn()
  //     .mockReturnValue({ base: { color: 'white' } });
  //   const result = useStyle(styleFunction);
  //   expect(useStateMocked).toBeCalledTimes(2);
  //   expect(useStateMocked.mock.calls[0][0]).toBe(false);
  //   expect(useStateMocked.mock.calls[1][0]).toBe(false);
  //   expect(useTransitionMocked).toBeCalledTimes(1);
  //   expect(useCallbackMocked).toBeCalledTimes(4);
  //   expect(useMemoMocked).toBeCalledTimes(1);
  //   expect(result).toHaveProperty('style', [{ color: 'white' }]);
  //   expect(result).toHaveProperty('className', '');
  //   expect(result).toHaveProperty('theme', {});
  //   expect(result).toHaveProperty('onPressIn');
  //   expect(result).toHaveProperty('onPressOut');
  //   expect(result).toHaveProperty('onHoverIn');
  //   expect(result).toHaveProperty('onHoverOut');
  // });
  // test('compose event onPressIn/onPressOut', () => {
  //   const setState = jest.fn();
  //   const setTransition = jest.fn().mockImplementation((cb) => cb());
  //   useCallbackMocked.mockImplementation((cb) => cb);
  //   useMemoMocked.mockImplementation((cb) => cb());
  //   useStateMocked.mockImplementation((init) => [init, setState] as any);
  //   useTransitionMocked.mockImplementation(() => [null, setTransition] as any);
  //   const styleFunction = jest.fn().mockReturnValue({});
  //   const onPressIn = jest.fn();
  //   const onPressOut = jest.fn();
  //   const result = useStyle(styleFunction, { onPressIn, onPressOut });
  //   // @ts-expect-error is on native props
  //   result.onPressIn({});
  //   expect(onPressIn).toBeCalledTimes(1);
  //   expect(setTransition).toBeCalledTimes(1);
  //   expect(setState).nthCalledWith(1, true);
  //   // @ts-expect-error is on native props
  //   result.onPressOut({});
  //   expect(onPressOut).toBeCalledTimes(1);
  //   expect(setTransition).toBeCalled();
  //   expect(setState).nthCalledWith(2, false);
  // });
  // test('compose event onHoverIn/onHoverOut', () => {
  //   const setState = jest.fn();
  //   const setTransition = jest.fn().mockImplementation((cb) => cb());
  //   useCallbackMocked.mockImplementation((cb) => cb);
  //   useMemoMocked.mockImplementation((cb) => cb());
  //   useStateMocked.mockImplementation((init) => [init, setState] as any);
  //   useTransitionMocked.mockImplementation(() => [null, setTransition] as any);
  //   const styleFunction = jest.fn().mockReturnValue({});
  //   const onHoverIn = jest.fn();
  //   const onHoverOut = jest.fn();
  //   const result = useStyle(styleFunction, { onHoverIn, onHoverOut });
  //   // @ts-expect-error is on native props
  //   result.onHoverIn({});
  //   expect(onHoverIn).toBeCalledTimes(1);
  //   expect(setTransition).toBeCalledTimes(1);
  //   expect(setState).nthCalledWith(1, true);
  //   // @ts-expect-error is on native props
  //   result.onHoverOut({});
  //   expect(onHoverOut).toBeCalled();
  //   expect(setTransition).toBeCalled();
  //   expect(setState).nthCalledWith(2, false);
  // });
  // describe('check plugin logic', () => {
  //   const theme = { primaryColor: 'white' };
  //   const props = { anyProps: 'toto' };
  //   const setState = jest.fn();
  //   const setTransition = jest.fn().mockImplementation((cb) => cb());
  //   useCallbackMocked.mockImplementation((cb) => cb);
  //   useMemoMocked.mockImplementation((cb) => cb());
  //   useStateMocked.mockImplementation((init) => [init, setState] as any);
  //   useTransitionMocked.mockImplementation(() => [null, setTransition] as any);
  //   const styleFunction = jest.fn().mockImplementation(() => ({
  //     test: { color: theme.primaryColor },
  //   }));
  //   const apply = jest.fn();
  //   const apply2 = jest.fn();
  //   Registry.addPlugin({
  //     test: 'test',
  //     apply: apply,
  //   }).addPlugin({
  //     test: 'test2',
  //     apply: apply2,
  //   });
  //   useStyle(styleFunction, props);
  //   expect(apply).nthCalledWith(
  //     1,
  //     expect.objectContaining({
  //       key: 'test',
  //       styles: { color: 'white' },
  //       props: { ...props, active: false, hover: false },
  //     })
  //   );
  //   expect(apply2).not.toBeCalled();
  // });
});
