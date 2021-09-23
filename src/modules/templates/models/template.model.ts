import { CSSProperties, HTMLAttributes } from 'react';

export type Template = {
  _id: string;
  page: CSSProperties;
  elements: Record<string, TextItemProps>;
};

export type TextItemProps = {
  id: string;
  type: 'text';
  value: string;
  style: TextItemStyleProps;
  isSelected?: boolean;
} & HTMLAttributes<HTMLDivElement>;

type TextItemStyleProps = {
  top?: number;
  left?: number;
  width?: number;
  height?: number;
  color?: CSSProperties['color'];
  textAlign?: CSSProperties['textAlign'];
};
