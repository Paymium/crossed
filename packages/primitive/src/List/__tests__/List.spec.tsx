/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import '@testing-library/jest-dom';

import { render, screen } from '@crossed/test';

import { createListMain } from '../List';
import { forwardRef } from 'react';

const Comp = forwardRef((p: any, ref: any) => <div {...p} ref={ref} />);
const NewComp = createListMain(Comp);

describe('createListMain', () => {
  test('init', async () => {
    const child = 'Pass child';
    render(<NewComp>{child}</NewComp>);

    await screen.findByText(child);
    await screen.findByRole('list');
  });
});
