import '@testing-library/jest-dom';

import { render, screen } from '@crossed/test';

import { createListSubTitle } from '../ListSubTitle';
import { forwardRef } from 'react';

const Comp = forwardRef((p: any, ref: any) => <div {...p} ref={ref} />);
const NewComp = createListSubTitle(Comp);

describe('createListSubTitle', () => {
  test('init', async () => {
    const child = 'Pass child';
    render(<NewComp>{child}</NewComp>);

    await screen.findByText(child);
  });
});
