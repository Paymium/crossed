import { createLabel } from '@crossed/primitive';
import { Text } from 'react-native';
import { Box } from '../layout/Box';
import type { GetProps } from '@crossed/styled';
import { styled } from '@crossed/styled';

const LabelTextFrame = styled(Text, {
  'className': ['font-medium'],
  ':dark': { className: ['text-neutral-500'] },
  ':light': { className: ['text-neutral-800'] },
});

export type LabelTextFrameProps = GetProps<typeof LabelTextFrame>;

const Label = createLabel({
  Root: Box,
  Text: LabelTextFrame,
});

const { Text: LabelText, Input: LabelInput } = Label;

export type LabelProps = GetProps<typeof Label>;
export type LabelTextProps = GetProps<typeof LabelText>;
export type LabelInputProps = GetProps<typeof LabelInput>;

export { Label, LabelText, LabelInput };
