import { styled } from '../src/styled';
import { Text } from 'react-native';
import { createStyleSheet } from 'react-native-unistyles';
import { render } from '@crossed/test';

jest.mock('react-native-unistyles', () => {
  const { ...actual } = jest.requireActual('react-native-unistyles');
  jest.spyOn(actual, 'createStyleSheet');
  jest.spyOn(actual, 'useStyles');
  return { __esModule: true, ...actual };
});

jest.mock('../src/useLogic', () => ({
  useLogic: jest.fn().mockImplementation(() => ({ action: {}, style: [] })),
}));

describe('styled', () => {
  afterEach(() => {
    jest.requireMock('react-native-unistyles').createStyleSheet.mockReset();
  });

  describe('without render', () => {
    test('all mock call with object', () => {
      styled(Text, {
        'backgroundColor': 'red',
        'hover:': { backgroundColor: 'gray' },
        'active:': { backgroundColor: 'green' },
      });
      expect(createStyleSheet).toBeCalled();
      expect(
        typeof (createStyleSheet as jest.Mock).mock.results[0].value
      ).toEqual('function');
      expect((createStyleSheet as jest.Mock).mock.results[0].value()).toEqual({
        active: { backgroundColor: 'green' },
        base: { backgroundColor: 'red' },
        checked: {},
        disabled: {},
        focus: {},
        focusVisible: {},
        hover: { backgroundColor: 'gray' },
        invalid: {},
        loading: {},
        pressed: {},
        readOnly: {},
        required: {},
      });
    });

    test('all mock call with function', () => {
      styled(Text, () => ({
        'backgroundColor': 'red',
        'hover:': { backgroundColor: 'gray' },
        'active:': { backgroundColor: 'green' },
      }));
      expect(createStyleSheet).toBeCalled();
      expect(
        typeof (createStyleSheet as jest.Mock).mock.results[0].value
      ).toEqual('function');
      expect((createStyleSheet as jest.Mock).mock.results[0].value()).toEqual({
        active: { backgroundColor: 'green' },
        base: { backgroundColor: 'red' },
        checked: {},
        disabled: {},
        focus: {},
        focusVisible: {},
        hover: { backgroundColor: 'gray' },
        invalid: {},
        loading: {},
        pressed: {},
        readOnly: {},
        required: {},
      });
    });
  });

  describe('with render', () => {
    test('all mock call with object', () => {
      const Body = styled(Text, {
        'backgroundColor': 'red',
        'hover:': { backgroundColor: 'gray' },
        'active:': { backgroundColor: 'green' },
      });
      expect(createStyleSheet).toBeCalledTimes(1);

      render(<Body />);

      const { useLogic } = jest.requireMock('../src/useLogic');
      expect(useLogic).toBeCalled();

      const [params] = useLogic.mock.lastCall;
      expect(params).toHaveProperty('animationDuration', 100);
      expect(params).toHaveProperty('animationKeys', []);
      expect(params).toHaveProperty('hovered', undefined);
      expect(params).toHaveProperty('pressed', undefined);
      expect(params).toHaveProperty('props', {});
      expect(params).toHaveProperty('styleSheet');
      expect(typeof params.styleSheet).toEqual('function');
    });

    test('all mock call with function', () => {
      const Body = styled(Text, () => ({
        'backgroundColor': 'red',
        'hover:': { backgroundColor: 'gray' },
        'active:': { backgroundColor: 'green' },
      }));
      expect(createStyleSheet).toBeCalledTimes(1);

      render(<Body />);

      const { useLogic } = jest.requireMock('../src/useLogic');
      expect(useLogic).toBeCalled();

      const [params] = useLogic.mock.lastCall;
      expect(params).toHaveProperty('animationDuration', 100);
      expect(params).toHaveProperty('animationKeys', []);
      expect(params).toHaveProperty('hovered', undefined);
      expect(params).toHaveProperty('pressed', undefined);
      expect(params).toHaveProperty('props', {});
      expect(params).toHaveProperty('styleSheet');
      expect(typeof params.styleSheet).toEqual('function');
    });
  });
});
