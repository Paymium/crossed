/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import '@testing-library/jest-dom';
import { forwardRef } from 'react';

import { createList } from '../index';
import { createListMain } from '../List';
import { createListItem } from '../ListItem';
import { createListSubTitle } from '../ListSubTitle';
import { createListTitle } from '../ListTitle';
import { createListLabel } from '../ListLabel';
import { createListDivider } from '../ListDivider';
import * as allExport from '../index';

const createListMainMocked = createListMain as unknown as jest.Mock<any>;
const createListItemMocked = createListItem as unknown as jest.Mock<any>;
const createListSubTitleMocked =
  createListSubTitle as unknown as jest.Mock<any>;
const createListTitleMocked = createListTitle as unknown as jest.Mock<any>;
const createListLabelMocked = createListLabel as unknown as jest.Mock<any>;
const createListDividerMocked = createListDivider as unknown as jest.Mock<any>;

jest.mock('../List');
jest.mock('../ListItem');
jest.mock('../ListSubTitle');
jest.mock('../ListTitle');
jest.mock('../ListLabel');
jest.mock('../ListDivider');

describe('createList', () => {
  beforeEach(() => {
    createListMainMocked.mockImplementation((e: any) => e);
    createListItemMocked.mockImplementation((e: any) => e);
    createListSubTitleMocked.mockImplementation((e: any) => e);
    createListTitleMocked.mockImplementation((e: any) => e);
    createListLabelMocked.mockImplementation((e: any) => e);
    createListDividerMocked.mockImplementation((e: any) => e);
  });

  afterEach(() => {
    createListMainMocked.mockReset();
    createListItemMocked.mockReset();
    createListSubTitleMocked.mockReset();
    createListTitleMocked.mockReset();
    createListLabelMocked.mockReset();
    createListDividerMocked.mockReset();
  });

  test('check exports', () => {
    expect(Object.keys(allExport)).toEqual(['createList']);
  });

  test('init', async () => {
    const Root = forwardRef((p: any, ref: any) => <p {...p} ref={ref} />);
    const Item = forwardRef((p: any, ref: any) => <p {...p} ref={ref} />);
    const Label = forwardRef((p: any, ref: any) => <p {...p} ref={ref} />);
    const SubTitle = forwardRef((p: any, ref: any) => <p {...p} ref={ref} />);
    const Title = forwardRef((p: any, ref: any) => <p {...p} ref={ref} />);
    const Divider = forwardRef((p: any, ref: any) => <p {...p} ref={ref} />);

    const List = createList({ Root, Item, Label, SubTitle, Title, Divider });

    expect(createListMainMocked).toHaveBeenCalledWith(Root);
    expect(createListItemMocked).toHaveBeenCalledWith(Item);
    expect(createListSubTitleMocked).toHaveBeenCalledWith(SubTitle);
    expect(createListTitleMocked).toHaveBeenCalledWith(Title);
    expect(createListLabelMocked).toHaveBeenCalledWith(Label);
    expect(createListDividerMocked).toHaveBeenCalledWith(Divider);

    expect(List).toHaveProperty('displayName', 'List');
    expect(List.Item).toHaveProperty('displayName', 'List.Item');
    expect(List.Label).toHaveProperty('displayName', 'List.Label');
    expect(List.SubTitle).toHaveProperty('displayName', 'List.SubTitle');
    expect(List.Title).toHaveProperty('displayName', 'List.Title');
    expect(List.Divider).toHaveProperty('displayName', 'List.Divider');
  });
});
