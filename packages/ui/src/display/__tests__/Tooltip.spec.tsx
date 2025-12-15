/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { render } from '@crossed/test';
import { Tooltip } from '../index';
import { Popover } from '../../overlay';
import { Text } from '../../typography';

jest.mock('../../overlay', () => ({
  Popover: Object.assign(
    jest.fn(({ children }) => children),
    {
      Trigger: jest.fn(({ children }) => children),
      Content: jest.fn(({ children }) => children),
    }
  ),
}));

const PopoverMocked = jest.mocked(Popover);

describe('Tooltip', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders with default props', () => {
    render(
      <Tooltip>
        <Tooltip.Trigger>
          <Text>Hover me</Text>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <Tooltip.Text>Tooltip text</Tooltip.Text>
        </Tooltip.Content>
      </Tooltip>
    );

    const call = PopoverMocked.mock.calls[0][0];
    expect(call).toHaveProperty('placement', 'bottom');
    expect(call).toHaveProperty('triggerStrategy', 'onPointerEnter');
    expect(call).toHaveProperty('children');
  });

  test('accepts custom placement', () => {
    render(
      <Tooltip placement="top">
        <Tooltip.Trigger>
          <Text>Hover me</Text>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <Tooltip.Text>Tooltip text</Tooltip.Text>
        </Tooltip.Content>
      </Tooltip>
    );

    const call = PopoverMocked.mock.calls[0][0];
    expect(call).toHaveProperty('placement', 'top');
  });

  test('accepts custom triggerStrategy', () => {
    render(
      <Tooltip triggerStrategy="onPress">
        <Tooltip.Trigger>
          <Text>Click me</Text>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <Tooltip.Text>Tooltip text</Tooltip.Text>
        </Tooltip.Content>
      </Tooltip>
    );

    const call = PopoverMocked.mock.calls[0][0];
    expect(call).toHaveProperty('triggerStrategy', 'onPress');
  });

  test('forwards additional props to Popover', () => {
    render(
      <Tooltip offsetValue={20}>
        <Tooltip.Trigger>
          <Text>Hover me</Text>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <Tooltip.Text>Tooltip text</Tooltip.Text>
        </Tooltip.Content>
      </Tooltip>
    );

    const call = PopoverMocked.mock.calls[0][0];
    expect(call).toHaveProperty('offsetValue', 20);
  });

  test('renders all static components', () => {
    expect(Tooltip.Trigger).toBeDefined();
    expect(Tooltip.Content).toBeDefined();
    expect(Tooltip.Text).toBeDefined();
  });

  test('Tooltip.Text has correct displayName', () => {
    expect(Tooltip.Text.displayName).toBe('Tooltip.Text');
  });

  test('renders Trigger with Popover.Trigger', () => {
    const PopoverTriggerMocked = jest.mocked(Popover.Trigger);

    render(
      <Tooltip>
        <Tooltip.Trigger>
          <Text>Hover me</Text>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <Tooltip.Text>Tooltip text</Tooltip.Text>
        </Tooltip.Content>
      </Tooltip>
    );

    expect(PopoverTriggerMocked).toHaveBeenCalled();
  });

  test('renders Content with Popover.Content', () => {
    const PopoverContentMocked = jest.mocked(Popover.Content);

    render(
      <Tooltip>
        <Tooltip.Trigger>
          <Text>Hover me</Text>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <Tooltip.Text>Tooltip text</Tooltip.Text>
        </Tooltip.Content>
      </Tooltip>
    );

    expect(PopoverContentMocked).toHaveBeenCalled();
  });
});
