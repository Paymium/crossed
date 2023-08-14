import { Animate, Box, Button } from '@crossed/ui';
import { useState } from 'react';

export const AnimateDemo = () => {
  const [key, remount] = useState<any>();
  return (
    <Box space="md">
      <Button
        variant="filled"
        text="Remount"
        onPress={() => {
          remount(Math.random());
        }}
      />
      <Animate key={key} />
    </Box>
  );
};
