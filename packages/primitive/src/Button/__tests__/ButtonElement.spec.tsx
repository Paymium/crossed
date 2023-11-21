import '@testing-library/jest-dom';
import { render, screen } from '@crossed/test';

import { createButtonElement } from '../ButtonElement';
import { forwardRef } from 'react';

const Comp = forwardRef((p: any, ref: any) => <div {...p} ref={ref} />);
const NewComp = createButtonElement(Comp);

describe('createButtonElement', () => {
  test('init', async () => {
    const child = 'Pass child';
    render(<NewComp>{child}</NewComp>);
    await screen.findByText(child);
  });
});
