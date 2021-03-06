import { CSSProperties } from 'react';
import { SVGItemProps } from 'src/modules/templates/models/template.model';
import { shapeHelper } from './shapeHelper';
import { SVGItem } from './SVGItem';

const allShapes = [
  {
    id: 'brand_test',
    name: 'brand',
    url: '/shapes/brand.svg',
    colors: {
      color1: 'blue',
      color2: 'red',
    } as CSSProperties,
  },
  {
    id: 'brand_test_2',
    name: 'brand',
    url: '/shapes/brand.svg',
    colors: {
      color1: '#3fe',
      color2: 'red',
    } as CSSProperties,
  },
  {
    id: 'brand_test_3',
    name: 'brand',
    url: '/shapes/brand.svg',
    colors: {
      color1: 'pink',
      color2: 'red',
    } as CSSProperties,
  },
  {
    id: 'brand_test_4',
    name: 'brand',
    url: '/shapes/brand.svg',
    colors: {
      color1: 'blue',
      color2: 'yellow',
    } as CSSProperties,
  },
  {
    id: 'brand_test_5',
    name: 'brand',
    url: '/shapes/brand.svg',
    colors: {
      color1: 'blue',
      color2: 'red',
    } as CSSProperties,
  },
] as SVGItemProps[];

export const ShapesSelector = ({
  shapes = allShapes,
  onSelect,
}: {
  shapes?: SVGItemProps[];
  onSelect: (data: SVGItemProps) => void;
}) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '80px 80px',
        gridAutoRows: '80px',
        gap: 5,
        maxHeight: 500,
        overflowY: 'auto',
      }}
    >
      {shapes.map((shape) => {
        const colorsCSSProperties = shapeHelper.convertColorsToCSSVariables(
          shape.colors,
        );
        return (
          <div
            style={{
              padding: 8,
              border: '1px solid #eee',
              ...colorsCSSProperties,
            }}
            onClick={() => onSelect(shape)}
          >
            <SVGItem {...shape} key={shape.id} />
          </div>
        );
      })}
    </div>
  );
};
