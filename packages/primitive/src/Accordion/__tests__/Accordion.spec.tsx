/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import '@testing-library/jest-dom';

import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
  createAccordion,
} from '../index';
import { render, screen, userEvent } from '@crossed/test';
import { Text } from 'react-native';

describe('Accordion', () => {
  test('createAccordion', async () => {
    const components = createAccordion();
    expect(components).toHaveProperty('Accordion');
    expect(components).toHaveProperty('AccordionItem');
    expect(components).toHaveProperty('AccordionPanel');
    expect(components).toHaveProperty('AccordionTrigger');
  });

  test('Show component, single', async () => {
    render(
      <Accordion defaultValues={['1']}>
        <AccordionItem value="1" testID="item-1">
          <AccordionTrigger testID="trigger-1">
            <Text>title 1</Text>
          </AccordionTrigger>
          <AccordionPanel testID="panel-1">
            <Text>content 1</Text>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="2" testID="item-2">
          <AccordionTrigger testID="trigger-2">
            <Text>title 1</Text>
          </AccordionTrigger>
          <AccordionPanel testID="panel-2">
            <Text>content 2</Text>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    );

    expect(screen.getByTestId('item-1')).toBeVisible();
    expect(screen.getByTestId('item-2')).toBeVisible();
    expect(screen.getByTestId('trigger-1')).toBeVisible();
    expect(screen.getByTestId('trigger-2')).toBeVisible();
    expect(screen.getByTestId('panel-1')).toBeVisible();
    expect(() => screen.getByTestId('panel-2')).toThrow();

    await userEvent.click(screen.getByTestId('trigger-2'));
    expect(screen.getByTestId('panel-2')).toBeVisible();
    expect(() => screen.getByTestId('panel-1')).toThrow();

    await userEvent.click(screen.getByTestId('trigger-2'));
    expect(screen.getByTestId('panel-2')).toBeVisible();
    expect(() => screen.getByTestId('panel-1')).toThrow();
  });

  test('Show component, multiple', async () => {
    render(
      <Accordion defaultValues={['1']} allowMultiple>
        <AccordionItem value="1" testID="item-1">
          <AccordionTrigger testID="trigger-1">
            <Text>title 1</Text>
          </AccordionTrigger>
          <AccordionPanel testID="panel-1">
            <Text>content 1</Text>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="2" testID="item-2">
          <AccordionTrigger testID="trigger-2">
            <Text>title 1</Text>
          </AccordionTrigger>
          <AccordionPanel testID="panel-2">
            <Text>content 2</Text>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    );

    expect(screen.getByTestId('item-1')).toBeVisible();
    expect(screen.getByTestId('item-2')).toBeVisible();
    expect(screen.getByTestId('trigger-1')).toBeVisible();
    expect(screen.getByTestId('trigger-2')).toBeVisible();
    expect(screen.getByTestId('panel-1')).toBeVisible();
    expect(() => screen.getByTestId('panel-2')).toThrow();

    await userEvent.click(screen.getByTestId('trigger-2'));
    expect(screen.getByTestId('panel-1')).toBeVisible();
    expect(screen.getByTestId('panel-2')).toBeVisible();

    await userEvent.click(screen.getByTestId('trigger-1'));
    expect(screen.getByTestId('panel-2')).toBeVisible();
    expect(() => screen.getByTestId('panel-1')).toThrow();
  });
});
