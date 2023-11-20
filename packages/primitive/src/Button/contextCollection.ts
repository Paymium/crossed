import { createCollection } from '../utils';

const GROUP_NAME = 'ButtonGroup';

type ItemData = { id: string };
export const [ButtonGroupCollection, useButtonGroupCollection] =
  createCollection<HTMLSpanElement, ItemData>(GROUP_NAME);
