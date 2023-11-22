import '@testing-library/jest-dom';

import { render, screen } from '@crossed/test';

import { createBadgeMain } from '../Badge';
import { forwardRef } from 'react';

const Comp = forwardRef((p: any, ref: any) => <div {...p} ref={ref} />);
const NewComp = createBadgeMain(Comp);

describe('createBadgeMain', () => {
  test('init', async () => {
    const child = 'Pass child';
    render(<NewComp>{child}</NewComp>);

    await screen.findByText(child);
  });
});
