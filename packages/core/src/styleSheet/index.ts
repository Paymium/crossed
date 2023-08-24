import tw from 'twrnc';

export class StyleSheet {
  static create(baseClassName: string) {
    return tw.style(baseClassName);
  }
}
