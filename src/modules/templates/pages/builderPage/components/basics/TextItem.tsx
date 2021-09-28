import styled from '@emotion/styled';
import React, { CSSProperties, useEffect } from 'react';
import ContentEditable from 'react-contenteditable';
import { useDebounce } from 'react-use';
import { TextItemProps } from '../../../../models/template.model';
import { WithLiveDraggable } from '../WithLiveDraggable';
import { WithResize } from '../WithResize';

const TextItemContainer = styled.div`
  &:focus-within {
    border: 1px dashed red;
  }
`;

const TextItem = ({
  value,
  style,
  isSelected,
  onChange,
  id,
  ...rest
}: TextItemProps & {
  onChange: (data: Partial<{ value: string; style: CSSProperties }>) => void;
}) => {
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
        // border: isSelected ? '1px dashed red' : null,
        ...style,
      }}
      tabIndex={-1}
      {...rest}
    >
      <ContentEditable
        id={id}
        style={{ outline: 'none' }}
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
};

export const DraggableTextItem = WithLiveDraggable(WithResize(TextItem));
