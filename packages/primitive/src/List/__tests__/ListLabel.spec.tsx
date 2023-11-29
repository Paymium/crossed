import '@testing-library/jest-dom';

import { render, screen } from '@crossed/test';

import { createListLabel } from '../ListLabel';
import { forwardRef } from 'react';

const Comp = forwardRef((p: any, ref: any) => <div {...p} ref={ref} />);
const NewComp = createListLabel(Comp);

describe('createListLabel', () => {
  test('init', async () => {
    const child = 'Pass child';
    render(<NewComp>{child}</NewComp>);

    await screen.findByText(child);
  });
});
