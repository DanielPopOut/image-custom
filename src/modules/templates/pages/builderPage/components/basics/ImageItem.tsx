import React, { CSSProperties, forwardRef, RefCallback } from 'react';
import { ImageItemProps } from '../../../../models/template.model';
import { WithCopyPaste } from '../WithCopyPaste';
import { WithLiveDraggable } from '../WithLiveDraggable';
import { WithResize } from '../WithResize';
import { BasicItemActions, ItemContainer } from './TextItem';

const ImageItem = forwardRef(
  (
    {
      style,
      isSelected,
      onChange,
      id,
      children,
      deleteElement,
      ...rest
    }: ImageItemProps &
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
        {/* <image
          id={id}
          style={{
            outline: 'none',
            height: 'fit-content',
            cursor: 'text',
            position: 'relative',
            minWidth: 30,
            minHeight: 30,
          }}
          onKeyDown={(e) => {
            e.stopPropagation();
          }}
          onPaste={(e) => {
            const data = e.clipboardData.getData('text');
            if (!data) {
              e.preventDefault();
            }
          }}
          tagName='article' // Use a custom HTML tag (uses a div by default)
        /> */}
      </ItemContainer>
    );
  },
);

export const DraggableImageItem = WithLiveDraggable(
  WithResize(WithCopyPaste(ImageItem)),
);
