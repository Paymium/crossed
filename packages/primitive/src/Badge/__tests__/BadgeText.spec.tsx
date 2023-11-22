import '@testing-library/jest-dom';

import { render, screen } from '@crossed/test';

import { createBadgeText } from '../BadgeText';
import { forwardRef } from 'react';

const Comp = forwardRef((p: any, ref: any) => <div {...p} ref={ref} />);
const NewComp = createBadgeText(Comp);

describe('createBadgeText', () => {
  test('init', async () => {
    const child = 'Pass child';
    render(<NewComp>{child}</NewComp>);

    await screen.findByText(child);
  });
});
