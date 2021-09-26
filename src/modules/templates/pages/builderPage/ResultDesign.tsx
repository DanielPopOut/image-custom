import React, {
  CSSProperties,
  DragEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Template, TextItemProps } from '../../models/template.model';

export const ResultDesign = ({
  state,
  setItemToUpdate,
  itemToUpdate,
  updateElement,
}: {
  state: Template;
  itemToUpdate: string;
  setItemToUpdate: (data: string) => void;
  updateElement: (
    itemId: string,
    update: Partial<{ value: string; style: CSSProperties }>,
  ) => void;
}) => {
  const [pageElementProps, setNodeElementProps] = useState<HTMLDivElement>();

  const onRefChange = useCallback(
    (node: HTMLDivElement) => {
      if (node === null) {
        // DOM node referenced by ref has been unmounted
      } else {
        setNodeElementProps(node);
      }
    },
    [state],
  ); // adjust deps

  const updateItemPositionOnDragEnd = (
    itemId: string,
    dragEvent: DragEvent<HTMLDivElement>,
  ) => {
    const mainPageRect = pageElementProps.getBoundingClientRect();
    updateElement(itemId, {
      style: {
        top: dragEvent.clientY - mainPageRect.top,
        left: dragEvent.clientX - mainPageRect.left,
      },
    });
  };

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
            <DraggableTextItem
              isSelected={itemToUpdate === item.id}
              key={item.id}
              {...item}
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

const setDragImageToTransparentImage = (dragStartEvent: DragEvent) => {
  {
    var img = new Image();
    img.src =
      'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    dragStartEvent.dataTransfer.setDragImage(img, 0, 0);
  }
};
const WithLiveDraggable =
  <P extends React.HTMLAttributes<HTMLDivElement>>(Component: React.FC<P>) =>
  ({ style, onDragStart, onDragEnd, ...props }: P) => {
    // dragOffset is the difference between the top left position of the element and my mouse click
    const [dragStartOffSet, setDragStartOffSet] =
      useState<{ x: number; y: number }>(null);
    const [position, setPosition] = useState<CSSProperties>({
      left: style?.left,
      top: style?.top,
    });
    useEffect(() => {
      setPosition({ left: style?.left, top: style?.top });
    }, [style]);
    const componentProps = { ...props, style: { ...style, ...position } } as P;
    return (
      <Component
        {...componentProps}
        draggable
        onDragStart={(dragEvent) => {
          setDragImageToTransparentImage(dragEvent);
          const clientRect = dragEvent.currentTarget.getBoundingClientRect();
          setDragStartOffSet({
            x: dragEvent.clientX - clientRect.left,
            y: dragEvent.clientY - clientRect.y,
          });
          onDragStart?.(dragEvent);
        }}
        onDragEnd={(dragEvent) => {
          onDragEnd?.({
            ...dragEvent,
            clientY: dragEvent.clientY - dragStartOffSet.y, // I substract the dragOffset to have a good positionning
            clientX: dragEvent.clientX - dragStartOffSet.x,
          });
        }}
      />
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

const DraggableTextItem = WithLiveDraggable(TextItem);
