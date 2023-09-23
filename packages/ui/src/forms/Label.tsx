import { createLabel } from '@crossed/primitive';
import { Text } from 'react-native';
import { Box } from '../layout/Box';
import { styled } from '@crossed/styled';

const LabelTextFrame = styled(Text, {
  'className': ['font-medium'],
  ':dark': { className: ['text-neutral-500'] },
  ':light': { className: ['text-neutral-800'] },
});

const Label = createLabel({
  Root: Box,
  Text: LabelTextFrame,
});

const { Text: LabelText, Input: LabelInput } = Label;

export { Label, LabelText, LabelInput };
