declare module '@iconscout/react-native-unicons' {
  import type { ComponentType } from 'react';

  type IconComponent = ComponentType<{
    size?: number | string;
    color?: 'string';
  }>;

  export const UilMessage: IconComponent;
}
