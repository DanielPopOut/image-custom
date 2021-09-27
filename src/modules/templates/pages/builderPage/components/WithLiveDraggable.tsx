import React, {
  CSSProperties,
  DragEvent,
  useContext,
  useEffect,
  useState,
} from 'react';
import { PageContext } from '../contexts/PageContext';

export const WithLiveDraggable =
  <P extends React.HTMLAttributes<HTMLDivElement>>(Component: React.FC<P>) =>
  ({ style, onDragStart, onDragEnd, ...props }: P) => {
    // dragOffset is the difference between the top left position of the element and my mouse click
    const [dragStartOffSet, setDragStartOffSet] =
      useState<{ x: number; y: number }>(null);
    const { sheetPosition } = useContext(PageContext);
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
            clientX: dragEvent.clientX - dragStartOffSet.x - sheetPosition.left,
            clientY: dragEvent.clientY - dragStartOffSet.y - sheetPosition.top,
          });
        }}
        onDrag={(dragEvent) => {
          setPosition({
            left: dragEvent.clientX - dragStartOffSet.x - sheetPosition.left,
            top: dragEvent.clientY - dragStartOffSet.y - sheetPosition.top,
          });
        }}
      />
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
