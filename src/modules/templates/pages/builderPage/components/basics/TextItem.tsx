import styled from '@emotion/styled';
import React, { CSSProperties, forwardRef, useEffect } from 'react';
import ContentEditable from 'react-contenteditable';
import { useDebounce } from 'react-use';
import { TextItemProps } from '../../../../models/template.model';
import { WithCopyPaste } from '../WithCopyPaste';
import { WithLiveDraggable } from '../WithLiveDraggable';
import { WithResize } from '../WithResize';

export const ItemContainer = styled.div`
  border: 2px solid transparent;
  &:focus-within {
    border: 2px solid #fa9696;
    cursor: grab;
  }
  &:hover {
    border: 2px dashed #fa9696;
  }
  cursor: pointer;
`;

const TextItem = forwardRef(
  (
    {
      value,
      style,
      isSelected,
      onChange,
      id,
      children,
      ...rest
    }: TextItemProps & {
      onChange: (
        data: Partial<{ value: string; style: CSSProperties }>,
      ) => void;
    },
    ref,
  ) => {
    const [debouncedValue, setDebouncedValue] = React.useState(value);
    const [, cancel] = useDebounce(
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
        style={{
          border: isSelected && '2px solid #fa9696',
          ...style,
        }}
        tabIndex={-1}
        {...rest}
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
);

export const DraggableTextItem = WithLiveDraggable(
  WithResize(WithCopyPaste(TextItem)),
);
