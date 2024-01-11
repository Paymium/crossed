import { useLogic } from '../src/useLogic';

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    useMemo: jest.fn().mockImplementation((c) => c()),
  };
});

jest.mock('react-native-unistyles', () => {
  return {
    useStyles: jest.fn().mockImplementation((cb) => cb()),
  };
});
jest.mock('../src/hooks/useHover', () => {
  return {
    useHover: jest
      .fn()
      .mockImplementation(() => ({ hovered: false, actionHover: {} })),
  };
});
jest.mock('../src/hooks/useActive', () => {
  return {
    useActive: jest
      .fn()
      .mockImplementation(() => ({ active: false, actionActive: {} })),
  };
});
jest.mock('../src/hooks/useFocus', () => {
  return {
    useFocus: jest
      .fn()
      .mockImplementation(() => ({ focus: false, actionFocus: {} })),
  };
});

const styleSheet = jest.fn().mockImplementation(() => ({
  styles: { base: {}, hover: {}, active: {}, focus: {} },
}));

describe('useLogic', () => {
  beforeEach(() => {
    jest.requireMock('react-native-unistyles').useStyles.mockClear();
    jest.requireMock('react').useMemo.mockClear();
    jest.requireMock('../src/hooks/useHover').useHover.mockClear();
    jest.requireMock('../src/hooks/useActive').useActive.mockClear();
    jest.requireMock('../src/hooks/useFocus').useFocus.mockClear();
  });
  test('basic', () => {
    const props = { style: {} };
    const data = useLogic({ props, styleSheet });
    const { useMemo } = jest.requireMock('react');
    const { useStyles } = jest.requireMock('react-native-unistyles');
    const { useHover } = jest.requireMock('../src/hooks/useHover');
    const { useActive } = jest.requireMock('../src/hooks/useActive');
    const { useFocus } = jest.requireMock('../src/hooks/useFocus');

    expect(useStyles).toBeCalledWith(styleSheet, props);
    expect(useHover).toBeCalledWith(props);
    expect(useActive).toBeCalledWith(props);
    expect(useFocus).toBeCalledWith(props);

    expect(data).toHaveProperty('actions');
    expect(data).toHaveProperty('styles');
    expect(data.styles).toEqual([
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      {},
    ]);
    expect(Object.keys(data.actions)).toEqual([
      'actionActive',
      'actionHover',
      'actionFocus',
    ]);

    expect(useMemo).toBeCalledTimes(1);
    expect(useMemo.mock.calls[0][1]).toEqual([
      { style: {} },
      { base: {}, hover: {}, active: {}, focus: {} },
      false,
      undefined,
      false,
      undefined,
      false,
      undefined,
    ]);
  });

  test('hover', () => {
    const props = {};
    const data = useLogic({ props, styleSheet, hovered: true });
    const { useMemo } = jest.requireMock('react');
    const { useStyles } = jest.requireMock('react-native-unistyles');
    const { useHover } = jest.requireMock('../src/hooks/useHover');
    const { useActive } = jest.requireMock('../src/hooks/useActive');
    const { useFocus } = jest.requireMock('../src/hooks/useFocus');

    expect(useStyles).toBeCalledWith(styleSheet, props);
    expect(useHover).toBeCalledWith(props);
    expect(useActive).toBeCalledWith(props);
    expect(useFocus).toBeCalledWith(props);

    expect(data).toHaveProperty('actions');
    expect(data).toHaveProperty('styles');
    expect(data.styles).toEqual([undefined, undefined, undefined, undefined, undefined]);
    expect(Object.keys(data.actions)).toEqual([
      'actionActive',
      'actionHover',
      'actionFocus',
    ]);

    expect(useMemo).toBeCalledTimes(1);
    expect(useMemo.mock.calls[0][1]).toEqual([
      {},
      { base: {}, hover: {}, active: {}, focus: {} },
      false,
      true,
      false,
      undefined,
      false,
      undefined,
    ]);
  });

  test('active', () => {
    const props = {};
    const data = useLogic({ props, styleSheet, active: true });
    const { useMemo } = jest.requireMock('react');
    const { useStyles } = jest.requireMock('react-native-unistyles');
    const { useHover } = jest.requireMock('../src/hooks/useHover');
    const { useActive } = jest.requireMock('../src/hooks/useActive');
    const { useFocus } = jest.requireMock('../src/hooks/useFocus');

    expect(useStyles).toBeCalledWith(styleSheet, props);
    expect(useHover).toBeCalledWith(props);
    expect(useActive).toBeCalledWith(props);
    expect(useFocus).toBeCalledWith(props);

    expect(data).toHaveProperty('actions');
    expect(data).toHaveProperty('styles');
    expect(data.styles).toEqual([undefined, undefined, undefined, undefined, undefined]);
    expect(Object.keys(data.actions)).toEqual([
      'actionActive',
      'actionHover',
      'actionFocus',
    ]);

    expect(useMemo).toBeCalledTimes(1);
    expect(useMemo.mock.calls[0][1]).toEqual([
      {},
      { base: {}, hover: {}, active: {}, focus: {} },
      false,
      undefined,
      false,
      true,
      false,
      undefined,
    ]);
  });

  test('focus', () => {
    const props = {};
    const data = useLogic({ props, styleSheet, focus: true });
    const { useMemo } = jest.requireMock('react');
    const { useStyles } = jest.requireMock('react-native-unistyles');
    const { useHover } = jest.requireMock('../src/hooks/useHover');
    const { useActive } = jest.requireMock('../src/hooks/useActive');
    const { useFocus } = jest.requireMock('../src/hooks/useFocus');

    expect(useStyles).toBeCalledWith(styleSheet, props);
    expect(useHover).toBeCalledWith(props);
    expect(useActive).toBeCalledWith(props);
    expect(useFocus).toBeCalledWith(props);

    expect(data).toHaveProperty('actions');
    expect(data).toHaveProperty('styles');
    expect(data.styles).toEqual([
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ]);
    expect(Object.keys(data.actions)).toEqual([
      'actionActive',
      'actionHover',
      'actionFocus',
    ]);

    expect(useMemo).toBeCalledTimes(1);
    expect(useMemo.mock.calls[0][1]).toEqual([
      {},
      { base: {}, hover: {}, active: {}, focus: {} },
      false,
      undefined,
      false,
      undefined,
      false,
      true,
    ]);
  });

  test('all', () => {
    const props = {};
    const data = useLogic({
      props,
      styleSheet,
      focus: true,
      active: true,
      hovered: true,
    });
    const { useMemo } = jest.requireMock('react');
    const { useStyles } = jest.requireMock('react-native-unistyles');
    const { useHover } = jest.requireMock('../src/hooks/useHover');
    const { useActive } = jest.requireMock('../src/hooks/useActive');
    const { useFocus } = jest.requireMock('../src/hooks/useFocus');

    expect(useStyles).toBeCalledWith(styleSheet, props);
    expect(useHover).toBeCalledWith(props);
    expect(useActive).toBeCalledWith(props);
    expect(useFocus).toBeCalledWith(props);

    expect(data).toHaveProperty('actions');
    expect(data).toHaveProperty('styles');
    expect(data.styles).toEqual([
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ]);
    expect(Object.keys(data.actions)).toEqual([
      'actionActive',
      'actionHover',
      'actionFocus',
    ]);

    expect(useMemo).toBeCalledTimes(1);
    expect(useMemo.mock.calls[0][1]).toEqual([
      {},
      { base: {}, hover: {}, active: {}, focus: {} },
      false,
      true,
      false,
      true,
      false,
      true,
    ]);
  });

  test('with extraStyle', () => {
    const props = {};
    const extraStyle = jest.fn();
    const styleSheet = jest.fn().mockImplementation(() => ({
      styles: {
        base: { extraStyle },
        hover: {},
        active: {},
        focus: {},
      },
    }));
    const data = useLogic({
      props,
      styleSheet,
      focus: true,
      active: true,
      hovered: true,
    });
    const { useMemo } = jest.requireMock('react');
    const { useStyles } = jest.requireMock('react-native-unistyles');
    const { useHover } = jest.requireMock('../src/hooks/useHover');
    const { useActive } = jest.requireMock('../src/hooks/useActive');
    const { useFocus } = jest.requireMock('../src/hooks/useFocus');

    expect(useStyles).toBeCalledWith(styleSheet, props);
    expect(useHover).toBeCalledWith(props);
    expect(useActive).toBeCalledWith(props);
    expect(useFocus).toBeCalledWith(props);

    expect(data).toHaveProperty('actions');
    expect(data).toHaveProperty('styles');
    expect(data.styles).toEqual([
      { extraStyle },
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ]);
    expect(Object.keys(data.actions)).toEqual([
      'actionActive',
      'actionHover',
      'actionFocus',
    ]);

    expect(useMemo).toBeCalledTimes(1);
    expect(useMemo.mock.calls[0][1]).toEqual([
      {},
      { base: { extraStyle }, hover: {}, active: {}, focus: {} },
      false,
      true,
      false,
      true,
      false,
      true,
    ]);

    expect(extraStyle).toBeCalledWith(props, {
      focus: true,
      active: true,
      hover: true,
    });
  });
});
