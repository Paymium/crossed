import { Platform } from 'react-native';
import tw from 'twrnc';

export class StyleSheet {
  static create(baseClassName: string) {
    return Platform.OS !== 'web' ? tw.style(baseClassName) : baseClassName;
  }
}
