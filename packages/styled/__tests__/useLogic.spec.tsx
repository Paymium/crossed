import type { ReturnExtract } from '../src/extract';
import { useLogic } from '../src/useLogic';

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    useMemo: jest.fn().mockImplementation((c) => c()),
  };
});

jest.mock('@preact/signals-react', () => {
  return {
    effect: jest.fn((c) => c()),
    signal: jest.fn((e: any) => ({ value: e })),
  };
});
jest.mock('../src/hooks/useHover', () => {
  return {
    useHover: jest.fn().mockImplementation(() => ({
      hovered: { value: false },
      actions: { onHover: () => {} },
    })),
  };
});
jest.mock('../src/hooks/useActive', () => {
  return {
    useActive: jest.fn().mockImplementation(() => ({
      active: { value: false },
      actions: { onActive: () => {} },
    })),
  };
});
jest.mock('../src/hooks/useFocus', () => {
  return {
    useFocus: jest.fn().mockImplementation(() => ({
      focus: { value: false },
      actions: { onFocus: () => {} },
    })),
  };
});

const styles: Partial<ReturnExtract> = {
  base: {},
  hover: {},
  active: {},
  focus: {},
};

describe('useLogic', () => {
  // eslint-disable-next-line no-console
  const log = console.log;
  beforeEach(() => {
    jest.requireMock('react-native-unistyles').useStyles.mockClear();
    jest.requireMock('react').useMemo.mockClear();
    jest.requireMock('../src/hooks/useHover').useHover.mockClear();
    jest.requireMock('../src/hooks/useActive').useActive.mockClear();
    jest.requireMock('../src/hooks/useFocus').useFocus.mockClear();
    // eslint-disable-next-line no-console
    console.log = jest.fn();
  });
  afterEach(() => {
    // eslint-disable-next-line no-console
    console.log = log;
  });
  test('basic', () => {
    const props = { style: {} };
    const data = useLogic({ props, styles });
    const { useHover } = jest.requireMock('../src/hooks/useHover');
    const { useActive } = jest.requireMock('../src/hooks/useActive');
    const { useFocus } = jest.requireMock('../src/hooks/useFocus');
    const { effect, signal } = jest.requireMock('@preact/signals-react');

    expect(useHover).toBeCalledWith(props);
    expect(useActive).toBeCalledWith(props);
    expect(useFocus).toBeCalledWith(props);

    expect(data).toHaveProperty('actions');
    expect(data).toHaveProperty('styles');
    expect(data.styles).toEqual({ value: {} });
    expect(Object.keys(data.actions)).toEqual([
      'onActive',
      'onHover',
      'onFocus',
    ]);

    expect(effect).toBeCalled();
    expect(signal).toBeCalledTimes(2);
  });

  test('hover', () => {
    const props = {};
    const data = useLogic({ props, styles });
    const { useHover } = jest.requireMock('../src/hooks/useHover');
    const { useActive } = jest.requireMock('../src/hooks/useActive');
    const { useFocus } = jest.requireMock('../src/hooks/useFocus');

    expect(useHover).toBeCalledWith(props);
    expect(useActive).toBeCalledWith(props);
    expect(useFocus).toBeCalledWith(props);

    expect(data).toHaveProperty('actions');
    expect(data).toHaveProperty('styles');
    expect(data.styles).toEqual({ value: {} });
    expect(Object.keys(data.actions)).toEqual([
      'onActive',
      'onHover',
      'onFocus',
    ]);
  });

  test('active', () => {
    const props = {};
    const data = useLogic({ props, styles });
    const { useHover } = jest.requireMock('../src/hooks/useHover');
    const { useActive } = jest.requireMock('../src/hooks/useActive');
    const { useFocus } = jest.requireMock('../src/hooks/useFocus');

    expect(useHover).toBeCalledWith(props);
    expect(useActive).toBeCalledWith(props);
    expect(useFocus).toBeCalledWith(props);

    expect(data).toHaveProperty('actions');
    expect(data).toHaveProperty('styles');
    expect(data.styles).toEqual({ value: {} });
    expect(Object.keys(data.actions)).toEqual([
      'onActive',
      'onHover',
      'onFocus',
    ]);
  });

  test('focus', () => {
    const props = {};
    const data = useLogic({ props, styles });
    const { useHover } = jest.requireMock('../src/hooks/useHover');
    const { useActive } = jest.requireMock('../src/hooks/useActive');
    const { useFocus } = jest.requireMock('../src/hooks/useFocus');

    expect(useHover).toBeCalledWith(props);
    expect(useActive).toBeCalledWith(props);
    expect(useFocus).toBeCalledWith(props);

    expect(data).toHaveProperty('actions');
    expect(data).toHaveProperty('styles');
    expect(data.styles).toEqual({ value: {} });
    expect(Object.keys(data.actions)).toEqual([
      'onActive',
      'onHover',
      'onFocus',
    ]);
  });

  test('all', () => {
    const props = {};
    const { useHover } = jest.requireMock('../src/hooks/useHover');
    const { useActive } = jest.requireMock('../src/hooks/useActive');
    const { useFocus } = jest.requireMock('../src/hooks/useFocus');

    useHover.mockImplementation(() => ({
      hovered: { value: true },
      actions: { onHover: () => {} },
    }));
    useActive.mockImplementation(() => ({
      active: { value: true },
      actions: { onActive: () => {} },
    }));
    useFocus.mockImplementation(() => ({
      focus: { value: true },
      actions: { onFocus: () => {} },
    }));

    const data = useLogic({
      props,
      styles,
    });

    expect(useHover).toBeCalledWith(props);
    expect(useActive).toBeCalledWith(props);
    expect(useFocus).toBeCalledWith(props);

    expect(data).toHaveProperty('actions');
    expect(data).toHaveProperty('styles');
    expect(data.styles).toEqual({ value: {} });
    expect(Object.keys(data.actions)).toEqual([
      'onActive',
      'onHover',
      'onFocus',
    ]);
  });

  test('with extraStyle', () => {
    const props = {};
    const extraStyle = jest.fn();
    const data = useLogic({
      props,
      styles: {
        base: { extraStyle } as any,
        hover: {},
        active: {},
        focus: {},
      },
    });
    const { useHover } = jest.requireMock('../src/hooks/useHover');
    const { useActive } = jest.requireMock('../src/hooks/useActive');
    const { useFocus } = jest.requireMock('../src/hooks/useFocus');

    expect(useHover).toBeCalledWith(props);
    expect(useActive).toBeCalledWith(props);
    expect(useFocus).toBeCalledWith(props);

    expect(data).toHaveProperty('actions');
    expect(data).toHaveProperty('styles');
    expect(Object.keys(data.actions)).toEqual([
      'onActive',
      'onHover',
      'onFocus',
    ]);

    expect(extraStyle).toBeCalledWith(props, {
      focus: true,
      active: true,
      hover: true,
    });
  });

  test('with style', () => {
    const props = { style: [{ color: 'white' }] };
    const extraStyle = jest.fn(() => ({ color: 'violet' }));
    const data = useLogic({
      props,
      styles: {
        base: { color: 'red', extraStyle } as any,
        hover: { color: 'orange' },
        active: { color: 'green' },
        focus: { color: 'blue' },
      },
    });
    const { useHover } = jest.requireMock('../src/hooks/useHover');
    const { useActive } = jest.requireMock('../src/hooks/useActive');
    const { useFocus } = jest.requireMock('../src/hooks/useFocus');

    expect(useHover).toBeCalledWith(props);
    expect(useActive).toBeCalledWith(props);
    expect(useFocus).toBeCalledWith(props);

    expect(data).toHaveProperty('actions');
    expect(data).toHaveProperty('styles');
    expect(data.styles).toEqual({
      value: { color: 'white' },
    });
    expect(Object.keys(data.actions)).toEqual([
      'onActive',
      'onHover',
      'onFocus',
    ]);

    expect(extraStyle).toBeCalledWith(props, {
      focus: true,
      active: true,
      hover: true,
    });
  });

  test('debug', () => {
    const props = {};
    const extraStyle = jest.fn();
    const data = useLogic({
      props,
      debug: true,
      styles: {
        base: { extraStyle } as any,
        hover: {},
        active: {},
        focus: {},
      },
    });
    const { useHover } = jest.requireMock('../src/hooks/useHover');
    const { useActive } = jest.requireMock('../src/hooks/useActive');
    const { useFocus } = jest.requireMock('../src/hooks/useFocus');

    expect(useHover).toBeCalledWith(props);
    expect(useActive).toBeCalledWith(props);
    expect(useFocus).toBeCalledWith(props);

    expect(data).toHaveProperty('actions');
    expect(data).toHaveProperty('styles');
    expect(Object.keys(data.actions)).toEqual([
      'onActive',
      'onHover',
      'onFocus',
    ]);

    // eslint-disable-next-line no-console
    expect(console.log).toBeCalledTimes(2);

    expect(extraStyle).toBeCalledWith(props, {
      focus: true,
      active: true,
      hover: true,
    });
  });
});
