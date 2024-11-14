/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { render, userEvent } from '@crossed/test';
import { Modal } from '..';
import { Button } from '../../../forms/Button';
import { Text } from '../../../typography/Text';
import { PortalProvider } from '@gorhom/portal';
import { expect } from '@jest/globals';

describe('Modal spec accessibility', () => {
  test('open/close', async () => {
    const screen = render(
      <PortalProvider>
        <Modal>
          <Modal.Trigger asChild>
            <Button>
              <Button.Text>Trigger</Button.Text>
            </Button>
          </Modal.Trigger>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Text>Hello world</Text>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="tertiary">
                <Button.Text>Button</Button.Text>
              </Button>

              <Button>
                <Button.Text>Button</Button.Text>
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </PortalProvider>
    );

    expect(
      screen.getByRole('dialog', { hidden: true }).getAttribute('data-hidden')
    ).toBe('false');
    await userEvent.click(screen.getByLabelText('Trigger'));

    expect(screen.getByRole('dialog')).toBeTruthy();
    expect(screen.getByLabelText('Close')).toBeTruthy();

    await userEvent.click(screen.getByLabelText('Close'));
    expect(screen.getByRole('dialog')).toBeTruthy();
  });
});
