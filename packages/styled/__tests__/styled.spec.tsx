import { styled } from '../src/styled';
import { Text } from 'react-native';
import { createStyleSheet } from 'react-native-unistyles';
import { render } from '@crossed/test';

jest.mock('@preact/signals-react/runtime', () => {
  return { useSignals: jest.fn() };
});
jest.mock('react-native-unistyles', () => {
  const { ...actual } = jest.requireActual('react-native-unistyles');
  jest.spyOn(actual, 'createStyleSheet');
  jest.spyOn(actual, 'useStyles');
  return { __esModule: true, ...actual };
});

jest.mock('../src/useLogic', () => ({
  useLogic: jest
    .fn()
    .mockImplementation(() => ({ actions: {}, styles: { value: {} } })),
}));

describe('styled', () => {
  // eslint-disable-next-line no-console
  const log = console.log;
  beforeEach(() => {
    // eslint-disable-next-line no-console
    console.log = jest.fn();
  });
  afterEach(() => {
    // eslint-disable-next-line no-console
    console.log = log;
    jest.requireMock('react-native-unistyles').createStyleSheet.mockReset();
  });

  describe('without render', () => {
    test('all mock call with object', () => {
      styled(Text, {
        'backgroundColor': 'red',
        'hover:': { backgroundColor: 'gray' },
        'active:': { backgroundColor: 'green' },
      });
      expect(createStyleSheet).toBeCalledTimes(0);
      // expect(
      //   typeof (createStyleSheet as jest.Mock).mock.results[0].value
      // ).toEqual('function');
      // expect((createStyleSheet as jest.Mock).mock.results[0].value()).toEqual({
      //   active: { backgroundColor: 'green' },
      //   base: { backgroundColor: 'red' },
      //   focus: {},
      //   hover: { backgroundColor: 'gray' },
      // });
    });

    test('all mock call with function', () => {
      styled(Text, () => ({
        'backgroundColor': 'red',
        'hover:': { backgroundColor: 'gray' },
        'active:': { backgroundColor: 'green' },
      }));
      expect(createStyleSheet).toBeCalledTimes(0);
      // expect(
      //   typeof (createStyleSheet as jest.Mock).mock.results[0].value
      // ).toEqual('function');
      // expect((createStyleSheet as jest.Mock).mock.results[0].value()).toEqual({
      //   active: { backgroundColor: 'green' },
      //   base: { backgroundColor: 'red' },
      //   focus: {},
      //   hover: { backgroundColor: 'gray' },
      // });
    });
  });

  describe('with render', () => {
    test('all mock call with object', () => {
      const Body = styled(Text, {
        'backgroundColor': 'red',
        'hover:': { backgroundColor: 'gray' },
        'active:': { backgroundColor: 'green' },
      });

      render(<Body />);

      expect(createStyleSheet).toBeCalledTimes(1);

      const { useLogic } = jest.requireMock('../src/useLogic');
      expect(useLogic).toBeCalled();

      const [params] = useLogic.mock.lastCall;
      expect(params).toHaveProperty('props', {});
    });

    test('all mock call with function', () => {
      const Body = styled(Text, () => ({
        'backgroundColor': 'red',
        'hover:': { backgroundColor: 'gray' },
        'active:': { backgroundColor: 'green' },
      }));

      render(<Body />);

      expect(createStyleSheet).toBeCalledTimes(1);

      const { useLogic } = jest.requireMock('../src/useLogic');
      expect(useLogic).toBeCalled();

      const [params] = useLogic.mock.lastCall;
      expect(params).toHaveProperty('debug', undefined);
      expect(params).toHaveProperty('name', 'Text');
      expect(params).toHaveProperty('props', {});
      expect(params).toHaveProperty('styles', {});
    });
  });

  test('debug', () => {
    const Body = styled(
      Text,
      () => ({
        'backgroundColor': 'red',
        'hover:': { backgroundColor: 'gray' },
        'active:': { backgroundColor: 'green' },
      }),
      { debug: true }
    );

    render(<Body />);

    // eslint-disable-next-line no-console
    expect(console.log).toBeCalledTimes(3);
  });

  test('children function', () => {
    const Body = styled(Text, () => ({
      'backgroundColor': 'red',
      'hover:': { backgroundColor: 'gray' },
      'active:': { backgroundColor: 'green' },
    }));
    const { container } = render(
      <Body asChild>
        <Text>Hello</Text>
      </Body>
    );

    expect(container.innerHTML).toEqual(
      '<div dir="auto" class="css-text-146c3p1">Hello</div>'
    );
  });

  describe('check styleSheet', () => {
    test('with function', () => {
      const Body = styled(Text, () => ({
        'backgroundColor': 'red',
        'hover:': { backgroundColor: 'gray' },
        'active:': { backgroundColor: 'green' },
      }));

      expect(typeof Body.styleSheet).toEqual('function');
      expect(Body.styleSheet({} as never)).toEqual({
        active: { backgroundColor: 'green' },
        hover: { backgroundColor: 'gray' },
        focus: {},
        base: { backgroundColor: 'red' },
      });
    });
    test('with object', () => {
      const Body = styled(Text, {
        'backgroundColor': 'red',
        'hover:': { backgroundColor: 'gray' },
        'active:': { backgroundColor: 'green' },
      });

      expect(typeof Body.styleSheet).toEqual('function');
      expect(Body.styleSheet({} as never)).toEqual({
        active: { backgroundColor: 'green' },
        hover: { backgroundColor: 'gray' },
        focus: {},
        base: { backgroundColor: 'red' },
      });
    });

    test('with extends', () => {
      const { createStyleSheet } = jest.requireMock('react-native-unistyles');
      createStyleSheet.mockImplementation((e: any) => e);
      const First = styled(Text, {
        backgroundColor: 'red',
      });
      const Body = styled(First, {
        'hover:': { backgroundColor: 'gray' },
        'active:': { backgroundColor: 'green' },
      });

      expect(typeof Body.styleSheet).toEqual('function');
      expect(Body.styleSheet({} as never)).toEqual({
        active: { backgroundColor: 'green' },
        hover: { backgroundColor: 'gray' },
        focus: {},
        base: { backgroundColor: 'red' },
      });
    });
  });
});
