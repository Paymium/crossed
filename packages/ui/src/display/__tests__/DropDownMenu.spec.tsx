/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { render } from '@crossed/test';
import { DropDownMenu } from '../index';
import { Popover, useFloatingContext } from '../../overlay';
import { MenuList } from '../MenuList';
import { Divider } from '../../layout/Divider';
import { useMedia } from '../../useMedia';
import { Text } from '../../typography';

jest.mock('../../overlay', () => ({
  Popover: Object.assign(
    jest.fn(({ children }) => children),
    {
      Trigger: jest.fn(({ children }) => children),
      Content: jest.fn(({ children }) => children),
    }
  ),
  useFloatingContext: jest.fn(),
}));

jest.mock('../MenuList', () => ({
  MenuList: Object.assign(
    jest.fn(({ children }) => children),
    {
      Item: jest.fn(({ children }) => children),
      Label: jest.fn(({ children }) => children),
      Title: jest.fn(({ children }) => children),
    }
  ),
}));

jest.mock('../../layout/Divider', () => ({
  Divider: jest.fn(() => null),
}));

jest.mock('../../useMedia', () => ({
  useMedia: jest.fn(),
}));

const PopoverMocked = jest.mocked(Popover);
const MenuListMocked = jest.mocked(MenuList);
const useFloatingContextMocked = jest.mocked(useFloatingContext);
const useMediaMocked = jest.mocked(useMedia);
const DividerMocked = jest.mocked(Divider);

const mockUseMedia = (md: boolean) => {
  useMediaMocked.mockReturnValue({
    md,
    sm: false,
    lg: false,
    xl: false,
  } as any);
};

const mockFloatingContext = (onClose = jest.fn()) => {
  useFloatingContextMocked.mockReturnValue({
    onClose,
    open: true,
    onOpen: jest.fn(),
  } as any);
};

describe('DropDownMenu', () => {
  beforeEach(() => {
    mockUseMedia(true);
    mockFloatingContext();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders with default props', () => {
    render(
      <DropDownMenu>
        <DropDownMenu.Trigger>
          <Text>Open Menu</Text>
        </DropDownMenu.Trigger>
        <DropDownMenu.Content>
          <DropDownMenu.Item>
            <DropDownMenu.Label>Item 1</DropDownMenu.Label>
          </DropDownMenu.Item>
        </DropDownMenu.Content>
      </DropDownMenu>
    );

    const call = PopoverMocked.mock.calls[0][0];
    expect(call).toHaveProperty('placement', 'bottom-end');
    expect(call).toHaveProperty('triggerStrategy', 'onPress');
    expect(call).toHaveProperty('children');
  });

  test('accepts custom placement', () => {
    render(
      <DropDownMenu placement="top-start">
        <DropDownMenu.Trigger>
          <Text>Open Menu</Text>
        </DropDownMenu.Trigger>
        <DropDownMenu.Content>
          <DropDownMenu.Item>
            <DropDownMenu.Label>Item 1</DropDownMenu.Label>
          </DropDownMenu.Item>
        </DropDownMenu.Content>
      </DropDownMenu>
    );

    const call = PopoverMocked.mock.calls[0][0];
    expect(call).toHaveProperty('placement', 'top-start');
  });

  test('accepts custom triggerStrategy', () => {
    render(
      <DropDownMenu triggerStrategy="onPointerEnter">
        <DropDownMenu.Trigger>
          <Text>Open Menu</Text>
        </DropDownMenu.Trigger>
        <DropDownMenu.Content>
          <DropDownMenu.Item>
            <DropDownMenu.Label>Item 1</DropDownMenu.Label>
          </DropDownMenu.Item>
        </DropDownMenu.Content>
      </DropDownMenu>
    );

    const call = PopoverMocked.mock.calls[0][0];
    expect(call).toHaveProperty('triggerStrategy', 'onPointerEnter');
  });

  test('forwards additional props to Popover', () => {
    render(
      <DropDownMenu offsetValue={15}>
        <DropDownMenu.Trigger>
          <Text>Open Menu</Text>
        </DropDownMenu.Trigger>
        <DropDownMenu.Content>
          <DropDownMenu.Item>
            <DropDownMenu.Label>Item 1</DropDownMenu.Label>
          </DropDownMenu.Item>
        </DropDownMenu.Content>
      </DropDownMenu>
    );

    const call = PopoverMocked.mock.calls[0][0];
    expect(call).toHaveProperty('offsetValue', 15);
  });

  test('renders all static components', () => {
    expect(DropDownMenu.Trigger).toBeDefined();
    expect(DropDownMenu.Content).toBeDefined();
    expect(DropDownMenu.Item).toBeDefined();
    expect(DropDownMenu.Label).toBeDefined();
    expect(DropDownMenu.Title).toBeDefined();
    expect(DropDownMenu.Divider).toBeDefined();
  });

  test('Content renders MenuList with bordered=true on desktop', () => {
    mockUseMedia(true);
    MenuListMocked.mockClear();

    render(
      <DropDownMenu>
        <DropDownMenu.Trigger>
          <Text>Open Menu</Text>
        </DropDownMenu.Trigger>
        <DropDownMenu.Content>
          <DropDownMenu.Item>
            <DropDownMenu.Label>Item 1</DropDownMenu.Label>
          </DropDownMenu.Item>
        </DropDownMenu.Content>
      </DropDownMenu>
    );

    const menuListCall = MenuListMocked.mock.calls[0][0];
    expect(menuListCall).toHaveProperty('bordered', true);
  });

  test('Content renders MenuList with bordered=false on mobile', () => {
    mockUseMedia(false);
    MenuListMocked.mockClear();

    render(
      <DropDownMenu>
        <DropDownMenu.Trigger>
          <Text>Open Menu</Text>
        </DropDownMenu.Trigger>
        <DropDownMenu.Content>
          <DropDownMenu.Item>
            <DropDownMenu.Label>Item 1</DropDownMenu.Label>
          </DropDownMenu.Item>
        </DropDownMenu.Content>
      </DropDownMenu>
    );

    const menuListCall = MenuListMocked.mock.calls[0][0];
    expect(menuListCall).toHaveProperty('bordered', false);
  });

  test('Item closes popover on press', () => {
    const onClose = jest.fn();
    mockFloatingContext(onClose);
    const MenuListItemMocked = jest.mocked(MenuList.Item);

    render(
      <DropDownMenu>
        <DropDownMenu.Trigger>
          <Text>Open Menu</Text>
        </DropDownMenu.Trigger>
        <DropDownMenu.Content>
          <DropDownMenu.Item onPress={() => {}}>
            <DropDownMenu.Label>Item 1</DropDownMenu.Label>
          </DropDownMenu.Item>
        </DropDownMenu.Content>
      </DropDownMenu>
    );

    const itemCall = MenuListItemMocked.mock.calls[0][0];
    expect(itemCall).toHaveProperty('onPress');

    if (itemCall.pressable) {
      itemCall.onPress({} as any);
    }

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('Item composes custom onPress with onClose', () => {
    const onClose = jest.fn();
    const customOnPress = jest.fn();
    mockFloatingContext(onClose);
    const MenuListItemMocked = jest.mocked(MenuList.Item);

    render(
      <DropDownMenu>
        <DropDownMenu.Trigger>
          <Text>Open Menu</Text>
        </DropDownMenu.Trigger>
        <DropDownMenu.Content>
          <DropDownMenu.Item onPress={customOnPress}>
            <DropDownMenu.Label>Item 1</DropDownMenu.Label>
          </DropDownMenu.Item>
        </DropDownMenu.Content>
      </DropDownMenu>
    );

    const itemCall = MenuListItemMocked.mock.calls[0][0];

    if (itemCall.pressable) {
      itemCall.onPress({} as any);
    }

    expect(customOnPress).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('Label renders MenuList.Label', () => {
    const MenuListLabelMocked = jest.mocked(MenuList.Label);

    render(
      <DropDownMenu>
        <DropDownMenu.Trigger>
          <Text>Open Menu</Text>
        </DropDownMenu.Trigger>
        <DropDownMenu.Content>
          <DropDownMenu.Item>
            <DropDownMenu.Label>Item 1</DropDownMenu.Label>
          </DropDownMenu.Item>
        </DropDownMenu.Content>
      </DropDownMenu>
    );

    expect(MenuListLabelMocked).toHaveBeenCalled();
  });

  test('Title renders MenuList.Title', () => {
    const MenuListTitleMocked = jest.mocked(MenuList.Title);

    render(
      <DropDownMenu>
        <DropDownMenu.Trigger>
          <Text>Open Menu</Text>
        </DropDownMenu.Trigger>
        <DropDownMenu.Content>
          <DropDownMenu.Title>Menu Title</DropDownMenu.Title>
        </DropDownMenu.Content>
      </DropDownMenu>
    );

    expect(MenuListTitleMocked).toHaveBeenCalled();
  });

  test('Divider renders Divider component', () => {
    render(
      <DropDownMenu>
        <DropDownMenu.Trigger>
          <Text>Open Menu</Text>
        </DropDownMenu.Trigger>
        <DropDownMenu.Content>
          <DropDownMenu.Item>
            <DropDownMenu.Label>Item 1</DropDownMenu.Label>
          </DropDownMenu.Item>
          <DropDownMenu.Divider />
          <DropDownMenu.Item>
            <DropDownMenu.Label>Item 2</DropDownMenu.Label>
          </DropDownMenu.Item>
        </DropDownMenu.Content>
      </DropDownMenu>
    );

    expect(DividerMocked).toHaveBeenCalled();
  });

  test('Divider forwards props', () => {
    DividerMocked.mockClear();

    render(
      <DropDownMenu>
        <DropDownMenu.Trigger>
          <Text>Open Menu</Text>
        </DropDownMenu.Trigger>
        <DropDownMenu.Content>
          <DropDownMenu.Divider direction="vertical" />
        </DropDownMenu.Content>
      </DropDownMenu>
    );

    const dividerCall = DividerMocked.mock.calls[0][0];
    expect(dividerCall).toHaveProperty('direction', 'vertical');
  });
});
