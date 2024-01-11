type Style = Record<string, any>;
export const unifyStyle = (
  style?: (Style | undefined)[] | Style | {}
): Style | undefined => {
  let styleTmp: Style | undefined;
  if (Array.isArray(style)) {
    styleTmp = (style as (Style | undefined)[]).reduce<Style>((acc, e) => {
      return { ...acc, ...e };
    }, {});
  } else if (typeof style === 'object') {
    styleTmp = style;
  }

  if (style === undefined || Object.keys(style).length === 0) {
    styleTmp = undefined;
  }

  return styleTmp;
};
