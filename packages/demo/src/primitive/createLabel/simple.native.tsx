import { createLabel } from '@crossed/primitive';
import { YBox } from '@crossed/ui';
import { Text, TextInput, TextProps, View, ViewProps } from 'react-native';

const Label = createLabel({
  Root: (props: ViewProps) => {
    return <View {...props} />;
  },
  Text: (props: TextProps) => {
    return <Text {...props} style={[{ color: 'white' }, props.style]} />;
  },
});

export const CreateLabelSimpleNativeDemo = () => {
  return (
    <YBox space="md">
      <Label>
        <Label.Text aria-label="Input">Input</Label.Text>
        <Label.Input>
          <TextInput
            style={{ borderWidth: 1, borderColor: 'gray' }}
            placeholder="toto"
          />
        </Label.Input>
      </Label>
    </YBox>
  );
};
