import { CSSProperties } from 'react';
import { SVGItemProps } from 'src/modules/templates/models/template.model';

export const shapeHelper = {
  convertColorsToCSSVariables: (colors: SVGItemProps['colors']) => {
    if (!colors) {
      return {};
    }
    const colorsCSSProperties = Object.fromEntries(
      Object.entries(colors).map(([key, value]) => {
        return [`--${key}`, value];
      }),
    ) as CSSProperties;
    return colorsCSSProperties;
  },
};
