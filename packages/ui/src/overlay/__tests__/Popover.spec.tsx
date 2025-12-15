/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { render } from '@crossed/test';
import { Popover } from '../index';
import { Floating } from '../Floating';
import { Text } from '../../typography';
import { useMedia } from '../../useMedia';

jest.mock('../Floating', () => ({
  ...jest.requireActual('../Floating'),
  Floating: jest.fn(() => null),
}));

jest.mock('../Sheet/index', () => ({
  Sheet: Object.assign(
    jest.fn(({ children }) => children),
    {
      Padded: jest.fn(({ children }) => children),
      Header: jest.fn(({ children }) => children),
      Title: jest.fn(({ children }) => children),
      Body: jest.fn(({ children }) => children),
      ScrollView: jest.fn(({ children }) => children),
      Content: jest.fn(({ children }) => children),
    }
  ),
}));

jest.mock('@floating-ui/react', () => ({
  useFloating: jest.fn(() => ({
    refs: {
      setReference: jest.fn(),
      setFloating: jest.fn(),
    },
    floatingStyles: { position: 'absolute', top: 0, left: 0 },
  })),
  autoUpdate: jest.fn(),
  offset: jest.fn((value) => ({ name: 'offset', options: value })), // ✅ Mock correct
}));

jest.mock('@floating-ui/dom', () => ({
  flip: jest.fn((options) => ({ name: 'flip', options })),
}));

jest.mock('../../useMedia', () => ({
  useMedia: jest.fn(),
}));

jest.mock('react-focus-on', () => ({
  FocusOn: ({ children }: any) => children,
}));

const FloatingMocked = jest.mocked(Floating);
const useMediaMocked = jest.mocked(useMedia);

const mockUseMedia = (md: boolean) => {
  useMediaMocked.mockReturnValue({
    md,
    sm: false,
    lg: false,
    xl: false,
  } as any);
};

describe('Popover', () => {
  beforeEach(() => {
    mockUseMedia(true);
  });

  afterEach(() => {
    FloatingMocked.mockReset();
    useMediaMocked.mockReset();
    jest.clearAllMocks();
  });

  test('verify default props', () => {
    render(
      <Popover>
        <Popover.Trigger>
          <Text>Trigger</Text>
        </Popover.Trigger>
        <Popover.Content>
          <Text>Content</Text>
        </Popover.Content>
      </Popover>
    );

    const call = FloatingMocked.mock.calls[0][0];
    expect(call).toHaveProperty('triggerStrategy', 'onPress');
    expect(call).toHaveProperty('removeScroll', false);
    expect(call).toHaveProperty('children');
  });

  test('adapts triggerStrategy on mobile when onPointerEnter', () => {
    mockUseMedia(false);

    render(
      <Popover triggerStrategy="onPointerEnter">
        <Popover.Trigger>
          <Text>Trigger</Text>
        </Popover.Trigger>
        <Popover.Content>
          <Text>Content</Text>
        </Popover.Content>
      </Popover>
    );

    const call = FloatingMocked.mock.calls[0][0];
    expect(call).toHaveProperty('triggerStrategy', 'onPress');
  });

  test('keeps triggerStrategy onPress on mobile', () => {
    mockUseMedia(false);

    render(
      <Popover triggerStrategy="onPress">
        <Popover.Trigger>
          <Text>Trigger</Text>
        </Popover.Trigger>
        <Popover.Content>
          <Text>Content</Text>
        </Popover.Content>
      </Popover>
    );

    const call = FloatingMocked.mock.calls[0][0];
    expect(call).toHaveProperty('triggerStrategy', 'onPress');
  });

  test('keeps triggerStrategy onPointerEnter on desktop', () => {
    mockUseMedia(true);

    render(
      <Popover triggerStrategy="onPointerEnter">
        <Popover.Trigger>
          <Text>Trigger</Text>
        </Popover.Trigger>
        <Popover.Content>
          <Text>Content</Text>
        </Popover.Content>
      </Popover>
    );

    const call = FloatingMocked.mock.calls[0][0];
    expect(call).toHaveProperty('triggerStrategy', 'onPointerEnter');
  });

  test('renders Trigger and Content components', () => {
    expect(Popover.Trigger).toBeDefined();
    expect(Popover.Content).toBeDefined();
  });
});
