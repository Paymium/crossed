import { useLogic } from '../src/useLogic';
// import { Text } from 'react-native';
// import { createStyleSheet } from 'react-native-unistyles';

jest.mock('react-native-unistyles', () => {
  return {
    useStyles: jest.fn().mockImplementation((cb) => cb()),
  };
});
jest.mock('react-native-reanimated', () => {
  return {
    useAnimatedStyle: jest.fn().mockImplementation((cb) => cb()),
    useSharedValue: jest.fn().mockImplementation((c) => c),
    withTiming: jest.fn().mockImplementation((c) => c),
  };
});

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    useCallback: jest.fn().mockImplementation((c) => c),
    useMemo: jest.fn().mockImplementation((c) => c()),
  };
});

describe('useLogic', () => {
  beforeEach(() => {
    const { useAnimatedStyle, useSharedValue, withTiming } = jest.requireMock(
      'react-native-reanimated'
    );
    useAnimatedStyle.mockClear();
    useSharedValue.mockClear();
    withTiming.mockClear();
    jest.requireMock('react-native-unistyles').useStyles.mockClear();
  });
  test('basic', () => {
    const styleSheet = jest
      .fn()
      .mockImplementation(() => ({ styles: { base: {} } }));
    const data = useLogic({
      props: {},
      styleSheet: styleSheet,
    });
    const { useStyles } = jest.requireMock('react-native-unistyles');
    const { useCallback, useMemo } = jest.requireMock('react');
    const { useAnimatedStyle } = jest.requireMock('react-native-reanimated');

    expect(useStyles).toBeCalledWith(styleSheet, {});

    expect(useAnimatedStyle).toBeCalled();
    expect(useAnimatedStyle.mock.calls[0][1]).toEqual([
      undefined,
      undefined,
      false,
      false,
    ]);
    expect(useAnimatedStyle.mock.results[0].value).toEqual({});

    expect(data).toHaveProperty('actions');
    expect(data).toHaveProperty('style');
    expect(data.style).toEqual([{}, {}, undefined]);
    expect(Object.keys(data.actions)).toEqual([
      'onPressOut',
      'onPressIn',
      'onPointerEnter',
      'onPointerLeave',
    ]);

    expect(useCallback).toBeCalledTimes(4);
    expect(useCallback.mock.calls[0][1]).toEqual([undefined]);
    expect(useCallback.mock.calls[1][1]).toEqual([undefined]);
    expect(useCallback.mock.calls[2][1]).toEqual([undefined]);
    expect(useCallback.mock.calls[3][1]).toEqual([undefined]);

    expect(useMemo).toBeCalledTimes(1);
    expect(useMemo.mock.calls[0][1]).toEqual([undefined, {}, { base: {} }]);
  });

  test('with animation', () => {
    const styleSheet = jest.fn().mockImplementation(() => ({
      styles: { base: { backgroundColor: 'red', color: 'white' } },
    }));
    const data = useLogic({
      props: {},
      styleSheet: styleSheet,
      animationDuration: 100,
      animationKeys: ['backgroundColor'],
    });
    const { useStyles } = jest.requireMock('react-native-unistyles');

    expect(useStyles).toBeCalledWith(styleSheet, {});

    expect(data).toHaveProperty('actions');
    expect(data).toHaveProperty('style');
    expect(data.style).toEqual([
      { backgroundColor: 'red', color: 'white' },
      { backgroundColor: 'red', color: 'white' },
      undefined,
    ]);
    expect(Object.keys(data.actions)).toEqual([
      'onPressOut',
      'onPressIn',
      'onPointerEnter',
      'onPointerLeave',
    ]);
  });

  test('with animation pressed', () => {
    const styleSheet = jest.fn().mockImplementation(() => ({
      styles: { base: { backgroundColor: 'red', color: 'white' } },
    }));
    const data = useLogic({
      props: {},
      styleSheet: styleSheet,
      animationDuration: 100,
      animationKeys: ['backgroundColor'],
      pressed: true,
    });
    const { useStyles } = jest.requireMock('react-native-unistyles');

    expect(useStyles).toBeCalledWith(styleSheet, {});

    expect(data).toHaveProperty('actions');
    expect(data).toHaveProperty('style');
    expect(data.style).toEqual([
      { backgroundColor: 'red', color: 'white' },
      { backgroundColor: 'red', color: 'white' },
      undefined,
    ]);
    expect(Object.keys(data.actions)).toEqual([
      'onPressOut',
      'onPressIn',
      'onPointerEnter',
      'onPointerLeave',
    ]);
  });
  test('with animation hover without animationKey and animationDuration', () => {
    const styleSheet = jest.fn().mockImplementation(() => ({
      styles: { base: { backgroundColor: 'red', color: 'white' } },
    }));
    const data = useLogic({
      props: {},
      styleSheet: styleSheet,
      hovered: true,
    });
    const { useStyles } = jest.requireMock('react-native-unistyles');

    expect(useStyles).toBeCalledWith(styleSheet, {});

    expect(data).toHaveProperty('actions');
    expect(data).toHaveProperty('style');
    expect(data.style).toEqual([
      { backgroundColor: 'red', color: 'white' },
      { backgroundColor: 'red', color: 'white' },
      undefined,
    ]);
    expect(Object.keys(data.actions)).toEqual([
      'onPressOut',
      'onPressIn',
      'onPointerEnter',
      'onPointerLeave',
    ]);
  });
  test('with animation hover with animationKey', () => {
    const styleSheet = jest.fn().mockImplementation(() => ({
      styles: { base: { backgroundColor: 'red', color: 'white' } },
    }));
    const data = useLogic({
      props: {},
      styleSheet: styleSheet,
      hovered: true,
      animationKeys: ['backgroundColor'],
    });
    const { useStyles } = jest.requireMock('react-native-unistyles');

    expect(useStyles).toBeCalledWith(styleSheet, {});

    expect(data).toHaveProperty('actions');
    expect(data).toHaveProperty('style');
    expect(data.style).toEqual([
      { backgroundColor: 'red', color: 'white' },
      { backgroundColor: 'red', color: 'white' },
      undefined,
    ]);
    expect(Object.keys(data.actions)).toEqual([
      'onPressOut',
      'onPressIn',
      'onPointerEnter',
      'onPointerLeave',
    ]);
  });

  describe('actions', () => {
    class Value {
      private _value: any;
      constructor(v: any) {
        this._value = v;
      }
      get value() {
        return this._value;
      }
      set value(v) {
        this._value = v;
      }
    }

    const toto = new Value(false);

    const styleSheet = jest.fn().mockImplementation(() => ({
      styles: { base: { backgroundColor: 'red', color: 'white' } },
    }));

    beforeEach(() => {
      const { useSharedValue } = jest.requireMock('react-native-reanimated');
      useSharedValue.mockImplementation((e: any) => {
        toto.value = e;
        return toto;
      });
    });

    test('pressIn/pressOut', () => {
      const data = useLogic({
        props: {},
        styleSheet: styleSheet,
        hovered: true,
        animationKeys: ['backgroundColor'],
      });

      data.actions.onPressIn({});
      expect(toto.value).toEqual(true);
      data.actions.onPressOut({});
      expect(toto.value).toEqual(false);
    });

    test('onPointerEnter/onPointerLeave', () => {
      const data = useLogic({
        props: {},
        styleSheet: styleSheet,
        animationKeys: ['backgroundColor'],
      });

      data.actions.onPointerEnter({});
      expect(toto.value).toEqual(true);
      data.actions.onPointerLeave({});
      expect(toto.value).toEqual(false);
    });
  });
});
