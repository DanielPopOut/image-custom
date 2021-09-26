import { Resizable } from 're-resizable';
import React, { CSSProperties } from 'react';
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
  return (
    <Resizable
      style={{ position: 'absolute', top: style.top, left: style.left }}
      size={{ width: style.width, height: style.height }}
      enable={{
        top: false,
        right: true,
        bottom: true,
        left: false,
        topRight: false,
        bottomRight: true,
        bottomLeft: false,
        topLeft: false,
      }}
      onResizeStart={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onResizeStop={(e, direction, ref, d) => {
        onChange({
          style: {
            width: style.width + d.width,
            height: style.height + d.height,
          },
        });
      }}
    >
      <div
        style={{
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
    </Resizable>
  );
};
export const DraggableTextItem = WithLiveDraggable(TextItem);
