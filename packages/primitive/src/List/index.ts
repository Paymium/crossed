import type { ComponentType } from 'react';
import { withStaticProperties } from '@crossed/core';
import { createListMain } from './List';
import { createListItem } from './ListItem';
import { createListTitle } from './ListTitle';
import { createListSubTitle } from './ListSubTitle';

export const createList = <
  ListProps extends Record<string, any>,
  ItemProps extends Record<string, any>,
  TitleProps extends Record<string, any>,
  SubTitleProps extends Record<string, any>
>(components: {
  Root: ComponentType<ListProps>;
  Item: ComponentType<ItemProps>;
  Title: ComponentType<TitleProps>;
  SubTitle: ComponentType<SubTitleProps>;
}) => {
  const { Root, Item, Title, SubTitle } = components;
  const Label = createListMain(Root);
  const LabelItem = createListItem(Item);
  const LabelTitle = createListTitle(Title);
  const LabelSubTitle = createListSubTitle(SubTitle);

  Label.displayName = 'List';
  LabelItem.displayName = 'List.Item';
  LabelTitle.displayName = 'List.Title';
  LabelSubTitle.displayName = 'List.SubTitle';

  return withStaticProperties(Label, {
    Item: LabelItem,
    Title: LabelTitle,
    SubTitle: LabelSubTitle,
  });
};
