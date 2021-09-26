import React from 'react';
import { TextItemProps } from '../../../../models/template.model';
import { WithLiveDraggable } from '../../ResultDesign';

const TextItem = ({ value, style, isSelected, ...rest }: TextItemProps) => {
  return (
    <div
      style={{
        position: 'absolute',
        border: isSelected ? '1px dashed red' : null,
        ...style,
      }}
      {...rest}
    >
      {value}
    </div>
  );
};
export const DraggableTextItem = WithLiveDraggable(TextItem);
