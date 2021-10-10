import React, { CSSProperties, forwardRef, RefCallback } from 'react';
import { ShapeItemProps } from '../../../../models/template.model';
import { WithCopyPaste } from '../WithCopyPaste';
import { WithLiveDraggable } from '../WithLiveDraggable';
import { WithResize } from '../WithResize';
import { SVGItem } from './shapes/SVGItem';
import { BasicItemActions, ItemContainer } from './TextItem';

const ShapeItem = forwardRef(
  (
    {
      style,
      isSelected,
      onChange,
      id,
      children,
      deleteElement,
      shapeData,
      ...rest
    }: ShapeItemProps &
      BasicItemActions & {
        onChange: (data: Partial<{ style: CSSProperties }>) => void;
      },
    ref: RefCallback<unknown>,
  ) => {
    return (
      <ItemContainer
        style={{
          ...style,
        }}
        tabIndex={-1}
        onKeyDown={(e) => {
          e.stopPropagation();
          const key = e.key;
          if (key === 'Backspace' || key === 'Delete') {
            deleteElement();
          }
        }}
        {...rest}
        id={id}
        ref={ref}
      >
        {
          // this is needed to work withCopy
          children
        }
        <SVGItem url={shapeData.url} />
      </ItemContainer>
    );
  },
);

export const DraggableShapeItem = WithLiveDraggable(
  WithResize(WithCopyPaste(ShapeItem)),
);
