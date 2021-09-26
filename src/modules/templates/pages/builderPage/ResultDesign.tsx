import React, {
  createContext,
  CSSProperties,
  DragEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Template, TextItemProps } from '../../models/template.model';

type PageContextData = { sheetPosition: { left: number; top: number } };
const PageContext = createContext<PageContextData>({
  sheetPosition: { left: 0, top: 0 },
});

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
  const [pageContext, setPageContext] = useState<PageContextData>({
    sheetPosition: { left: 0, top: 0 },
  });

  const onRefChange = useCallback(
    (node: HTMLDivElement) => {
      if (node === null) {
        // DOM node referenced by ref has been unmounted
      } else {
        setNodeElementProps(node);
        const mainPageRect = node.getBoundingClientRect();
        setPageContext({
          sheetPosition: { left: mainPageRect.left, top: mainPageRect.top },
        });
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
        top: dragEvent.clientY,
        left: dragEvent.clientX,
      },
    });
  };

  return (
    <PageContext.Provider value={pageContext}>
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
    </PageContext.Provider>
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
            clientX: dragEvent.clientX - dragStartOffSet.x - sheetPosition.left, // I substract the dragOffset to have a good positionning
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
