import React from 'react';
import ContentEditable from 'react-contenteditable';
import { useDebounce } from 'react-use';
import { TextItemProps } from '../../../../models/template.model';
import { WithLiveDraggable } from '../WithLiveDraggable';

const TextItem = ({
  value,
  style,
  isSelected,
  onChange,
  ...rest
}: TextItemProps & { onChange: (value: string) => void }) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  const [, cancel] = useDebounce(
    () => {
      if (debouncedValue === value) {
        return;
      }
      console.log('here update');
      onChange(debouncedValue);
    },
    1000,
    [debouncedValue],
  );
  return (
    <div
      style={{
        position: 'absolute',
        border: isSelected ? '1px dashed red' : null,
        ...style,
      }}
      {...rest}
    >
      <ContentEditable
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
    </div>
  );
};
export const DraggableTextItem = WithLiveDraggable(TextItem);
