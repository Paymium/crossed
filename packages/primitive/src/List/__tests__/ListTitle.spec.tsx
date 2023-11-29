import '@testing-library/jest-dom';

import { render, screen } from '@crossed/test';

import { createListTitle } from '../ListTitle';
import { forwardRef } from 'react';

const Comp = forwardRef((p: any, ref: any) => <div {...p} ref={ref} />);
const NewComp = createListTitle(Comp);

describe('createListTitle', () => {
  test('init', async () => {
    const child = 'Pass child';
    render(<NewComp>{child}</NewComp>);

    await screen.findByText(child);
  });
});
