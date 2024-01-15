const propertyToTransformInPixel = ['lineHeight'];
export const parseStyle = (style?: any) => {
  return style
    ? Object.entries(style).reduce((acc, [key, v]) => {
        acc[key] = propertyToTransformInPixel.includes(key) ? `${v}px` : v;
        return acc;
      }, style)
    : style;
};
