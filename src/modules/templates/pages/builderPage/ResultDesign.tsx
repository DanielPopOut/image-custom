import { DragEvent } from 'react';
import { Template, TextItemProps } from '../../models/template.model';

export const ResultDesign = ({
  onRefChange,
  state,
  setItemToUpdate,
  itemToUpdate,
  setDragStartOffSet,
  updateItemPositionOnDragEnd,
}: {
  state: Template;
  onRefChange: any;
  itemToUpdate: string;
  setItemToUpdate: (data: string) => void;
  setDragStartOffSet: (data: { x: number; y: number }) => void;
  updateItemPositionOnDragEnd: (
    itemId: string,
    dragEvent: DragEvent<HTMLDivElement>,
  ) => void;
}) => {
  return (
    <div style={{ border: '1px solid black', width: 'fit-content' }}>
      <div
        ref={onRefChange}
        className='to_download'
        style={{
          backgroundColor: 'white',
          position: 'relative',
          ...state.page,
        }}
        onClick={() => {
          setItemToUpdate(null);
        }}
      >
        {Object.values(state.elements).map((item) => {
          return (
            <TextItem
              isSelected={itemToUpdate === item.id}
              key={item.id}
              {...item}
              draggable
              onDragStart={(data) => {
                console.log('here drag start', data);
                const clientRect = data.currentTarget.getBoundingClientRect();
                setDragStartOffSet({
                  x: data.clientX - clientRect.left,
                  y: data.clientY - clientRect.y,
                });
              }}
              onDragEnd={(data) => updateItemPositionOnDragEnd(item.id, data)}
              onClick={(e) => {
                setItemToUpdate(item.id);
                e.stopPropagation();
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export const TextItem = ({
  value,
  style,
  isSelected,
  ...rest
}: TextItemProps) => {
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
