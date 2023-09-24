import { tw } from '@crossed/styled';
import { Box, Label } from '@crossed/ui';
import { TextInput } from 'react-native';

export const LabelDemo = () => {
  return (
    <Box>
      <Label className="gap-2">
        <Label.Text aria-label="Label">Label</Label.Text>
        <Label.Input>
          <TextInput style={tw.style('border border-neutral-700 p-2')} />
        </Label.Input>
      </Label>
    </Box>
  );
};
