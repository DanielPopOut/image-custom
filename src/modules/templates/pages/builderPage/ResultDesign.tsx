import React, {
  CSSProperties,
  DragEvent,
  forwardRef,
  HTMLAttributes,
  useCallback,
  useContext,
} from 'react';
import { clipBoardService } from '../../../shared/services/clipBoardService';
import { Template } from '../../models/template.model';
import { DraggableTextItem } from './components/basics/TextItem';
import { WithCopyPaste } from './components/WithCopyPaste';
import { PageContext } from './contexts/PageContext';

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
  const updateItemPositionOnDragEnd = (
    itemId: string,
    dragEvent: DragEvent<HTMLDivElement>,
  ) => {
    updateElement(itemId, {
      style: {
        top: dragEvent.clientY,
        left: dragEvent.clientX,
      },
    });
  };

  return (
    <div style={{ border: '1px solid black', width: 'fit-content' }}>
      <DrawingPage
        style={state.page}
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
              onCopy={(e) => {
                clipBoardService.copy(item);
                e.stopPropagation();
              }}
              onDragStart={() => setItemToUpdate(item.id)}
              onDragEnd={(data) => updateItemPositionOnDragEnd(item.id, data)}
              onClick={(e) => {
                setItemToUpdate(item.id);
                e.stopPropagation();
              }}
              onChange={(data) => updateElement(item.id, data)}
            />
          );
        })}
      </DrawingPage>
    </div>
  );
};

const DrawingPage: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  style,
  onClick,
}) => {
  const { updateSheetData } = useContext(PageContext);
  const onRefChange = useCallback(
    (node: HTMLDivElement) => {
      if (node === null) {
        // DOM node referenced by ref has been unmounted
      } else {
        const mainPageRect = node.getBoundingClientRect();
        updateSheetData({
          left: mainPageRect.left,
          top: mainPageRect.top,
          width: mainPageRect.width,
          height: mainPageRect.height,
        });
      }
    },
    [style],
  ); // adjust deps
  return (
    <MainDiv
      ref={onRefChange}
      className='to_download'
      style={{
        backgroundColor: 'white',
        position: 'relative',
        ...style,
      }}
      onClick={onClick}
      onPaste={(event) => {
        event.preventDefault();
        console.log({ data: event, text: 'data to paste' });
      }}
    >
      {children}
    </MainDiv>
  );
};

const MainDiv = WithCopyPaste(
  forwardRef(({ children, ...props }, ref) => {
    return (
      <div {...props} ref={ref as any}>
        {children}
      </div>
    );
  }),
);
