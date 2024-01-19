/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import '@testing-library/jest-dom';
import { forwardRef } from 'react';

import { createBadge } from '../index';
import { createBadgeMain } from '../Badge';
import { createBadgeText } from '../BadgeText';
import * as allExport from '../index';

const createBadgeMainMocked = createBadgeMain as unknown as jest.Mock<any>;
const createBadgeTextMocked = createBadgeText as unknown as jest.Mock<any>;

jest.mock('../Badge');
jest.mock('../BadgeText');

describe('createBadge', () => {
  beforeEach(() => {
    createBadgeMainMocked.mockImplementation((e: any) => e);
    createBadgeTextMocked.mockImplementation((e: any) => e);
  });

  afterEach(() => {
    createBadgeMainMocked.mockReset();
    createBadgeTextMocked.mockReset();
  });

  test('check exports', () => {
    expect(Object.keys(allExport)).toEqual(['createBadge']);
  });

  test('init', async () => {
    const Root = forwardRef((p: any, ref: any) => <p {...p} ref={ref} />);
    const Text = forwardRef((p: any, ref: any) => (
      <p {...p} ref={ref} />
    )) as any;

    const Badge = createBadge({
      Root,
      Text,
    });

    expect(createBadgeMainMocked).toHaveBeenCalledWith(Root);
    expect(createBadgeTextMocked).toHaveBeenCalledWith(Text);

    expect(Badge).toHaveProperty('displayName', 'Badge');
    expect(Badge.Text).toHaveProperty('displayName', 'BadgeText');
  });
});
