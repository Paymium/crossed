/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createInput } from '@crossed/primitive/src/LabelV2';
import { Box } from '../layout';
import { Text } from '../typography';

const Label = ({ children, id }: { children?: any; id?: string }) => {
  return <Text id={id}>{children}</Text>;
};

const Input = ({ ariaLabelledby, ...props }: { ariaLabelledby?: string }) => {
  return <input type="text" aria-labelledby={ariaLabelledby} {...props} />;
};

const Root = ({
  children,
  role,
  id,
  label,
}: {
  children?: any;
  role?: string;
  id?: string;
  label?: string;
}) => {
  return (
    <Box accessibilityRole={role}>
      {children ?? (
        <>
          <Label id={id}>{label}</Label>
          <Input ariaLabelledby={id} />
        </>
      )}
    </Box>
  );
};

export const LabelV3 = createInput({
  Root,
  Input,
  Label,
});
