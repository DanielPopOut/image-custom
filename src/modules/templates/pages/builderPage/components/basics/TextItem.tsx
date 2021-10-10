import styled from '@emotion/styled';
import { isEqual } from 'lodash';
import React, { CSSProperties, forwardRef, memo, useEffect } from 'react';
import ContentEditable from 'react-contenteditable';
import { useDebounce } from 'react-use';
import { TextItemProps } from '../../../../models/template.model';
import { WithCopyPaste } from '../WithCopyPaste';
import { WithLiveDraggable } from '../WithLiveDraggable';
import { WithResize } from '../WithResize';

export const ItemContainer = styled.div`
  &:focus-within {
    cursor: grab;
  }
  &:hover,
  &:focus-within,
  &.selected {
    &:after {
      position: absolute;
      inset: 0;
      border: 2px dashed #fa9696;
      content: ' ';
      pointer-events: none;
    }
  }
  &:focus-within,
  &.selected {
    &:after {
      border: 2px solid #fa9696;
      border-style: solid;
    }
  }

  cursor: pointer;
`;

export type BasicItemActions = {
  deleteElement: () => void;
};

const TextItem = memo(
  forwardRef(
    (
      {
        value,
        style,
        isSelected,
        onChange,
        id,
        children,
        deleteElement,
        ...rest
      }: TextItemProps &
        BasicItemActions & {
          onChange: (
            data: Partial<{ value: string; style: CSSProperties }>,
          ) => void;
        },
      ref,
    ) => {
      const [debouncedValue, setDebouncedValue] = React.useState(value);
      const [,] = useDebounce(
        () => {
          if (debouncedValue === value) {
            return;
          }
          onChange({ value: debouncedValue });
        },
        1000,
        [debouncedValue],
      );
      useEffect(() => {
        setDebouncedValue(value);
      }, [value]);
      return (
        <ItemContainer
          className={isSelected ? 'selected' : ''}
          style={{
            ...style,
          }}
          tabIndex={-1}
          {...rest}
          onKeyDown={(e) => {
            e.stopPropagation();
            const key = e.key;
            if (key === 'Backspace' || key === 'Delete') {
              deleteElement();
            }
          }}
        >
          {
            // this is needed to work withCopy
            children
          }
          <ContentEditable
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
            html={debouncedValue} // innerHTML of the editable div
            onChange={(data) => {
              setDebouncedValue(data.target.value);
            }} // handle innerHTML change
            onPaste={(e) => {
              const data = e.clipboardData.getData('text');
              if (!data) {
                e.preventDefault();
              }
            }}
            tagName='article' // Use a custom HTML tag (uses a div by default)
          />
        </ItemContainer>
      );
    },
  ),
  (prevProps, newProps) => {
    if (prevProps.isSelected !== newProps.isSelected) {
      return false;
    }
    if (!newProps.isSelected) {
      return true;
    }
    return (
      prevProps.value === newProps.value &&
      isEqual(prevProps.style, newProps.style)
    );
  },
);

export const DraggableTextItem = WithLiveDraggable(
  WithResize(WithCopyPaste(TextItem)),
);
