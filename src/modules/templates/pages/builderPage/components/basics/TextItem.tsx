import styled from '@emotion/styled';
import React, { CSSProperties, forwardRef, useEffect } from 'react';
import ContentEditable from 'react-contenteditable';
import { useDebounce } from 'react-use';
import { TextItemProps } from '../../../../models/template.model';
import { WithCopyPaste } from '../WithCopyPaste';
import { WithLiveDraggable } from '../WithLiveDraggable';
import { WithResize } from '../WithResize';

const TextItemContainer = styled.div`
  &:focus-within {
    border: 1px dashed red;
    cursor: grab;
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
      <TextItemContainer
        style={{
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
          }}
          onKeyDown={(e) => {
            e.stopPropagation();
          }}
          html={debouncedValue} // innerHTML of the editable div
          onChange={(data) => {
            setDebouncedValue(data.target.value);
          }} // handle innerHTML change
          tagName='article' // Use a custom HTML tag (uses a div by default)
        />
      </TextItemContainer>
    );
  },
);

export const DraggableTextItem = WithLiveDraggable(
  WithResize(WithCopyPaste(TextItem)),
);
