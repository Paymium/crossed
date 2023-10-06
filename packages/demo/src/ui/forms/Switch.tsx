import { Box, Switch } from '@crossed/ui';

export const SwitchDemo = () => {
  return (
    <Box>
      <Switch>
        <Switch.Thumb />
        <Switch.Label aria-label="Hello">Hello</Switch.Label>
      </Switch>
    </Box>
  );
};
