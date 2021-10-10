import React, {
  CSSProperties,
  DragEvent,
  forwardRef,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useThrottle } from 'react-use';
import { PageContext } from '../contexts/PageContext';

export const WithLiveDraggable = <
  P extends React.HTMLAttributes<HTMLDivElement>,
>(
  Component: React.ForwardRefExoticComponent<P>,
) =>
  forwardRef(({ style, onDragStart, onDragEnd, ...props }: P, ref) => {
    // dragOffset is the difference between the top left position of the element and my mouse click
    const [dragStartOffSet, setDragStartOffSet] =
      useState<{ x: number; y: number }>(null);
    const [currentDragEvent, setCurrenDragEvent] =
      useState<{ clientX: number; clientY: number }>(null);
    const { sheetPosition } = useContext(PageContext);
    const [position, setPosition] = useState<CSSProperties>({
      left: style?.left,
      top: style?.top,
    });
    const throttledPosition = useThrottle(position, 100);
    useEffect(() => {
      setPosition({ left: style?.left, top: style?.top });
    }, [style]);
    const componentProps = {
      ...props,
      style: { ...style, ...throttledPosition },
    } as P;
    return (
      <Component
        {...componentProps}
        ref={ref}
        draggable
        onDragStart={(dragEvent) => {
          setDragImageToTransparentImage(dragEvent);
          const clientRect = dragEvent.currentTarget.getBoundingClientRect();
          setDragStartOffSet((prevState) => {
            return {
              x: dragEvent.clientX - clientRect.left,
              y: dragEvent.clientY - clientRect.y,
            };
          });
          onDragStart?.(dragEvent);
        }}
        onDragEnd={(dragEvent) => {
          const { left, top } = computeLeftAndTopValues(
            dragEvent,
            dragStartOffSet,
            sheetPosition,
          );
          onDragEnd?.({
            ...dragEvent,
            clientX: left,
            clientY: top,
          });
        }}
        onDrag={(dragEvent) => {
          if (
            !currentDragEvent ||
            dragEvent.clientX !== currentDragEvent.clientX ||
            dragEvent.clientY !== currentDragEvent.clientY
          ) {
            setCurrenDragEvent(dragEvent);
            setPosition(
              computeLeftAndTopValues(
                dragEvent,
                dragStartOffSet,
                sheetPosition,
              ),
            );
          }
        }}
      />
    );
  });

const computeLeftAndTopValues = (
  dragEvent: DragEvent,
  dragStartOffSet: { x: number; y: number } = { x: 0, y: 0 },
  sheetPosition: { top: number; left: number },
) => {
  return {
    left: dragEvent.clientX - dragStartOffSet?.x - sheetPosition?.left,
    top: dragEvent.clientY - dragStartOffSet?.y - sheetPosition?.top,
  };
};
const setDragImageToTransparentImage = (dragStartEvent: DragEvent) => {
  {
    var img = new Image();
    img.src =
      'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    dragStartEvent.dataTransfer.setDragImage(img, 0, 0);
  }
};
