import '@testing-library/jest-dom';

import { render, screen } from '@crossed/test';

import { createListItem } from '../ListItem';
import { forwardRef } from 'react';

const Comp = forwardRef((p: any, ref: any) => <div {...p} ref={ref} />);
const NewComp = createListItem(Comp);

describe('createListItem', () => {
  test('init', async () => {
    const child = 'Pass child';
    render(<NewComp>{child}</NewComp>);

    await screen.findByText(child);
    await screen.findByRole('listitem');
  });
});
