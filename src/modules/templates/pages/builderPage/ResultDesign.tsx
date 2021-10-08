import { ObjectId } from 'bson';
import React, {
  CSSProperties,
  DragEvent,
  forwardRef,
  HTMLAttributes,
  useCallback,
  useContext,
} from 'react';
import { uploadImageFnFromFile } from 'src/modules/components/uploadImageFn';
import { clipBoardService } from '../../../shared/services/clipBoardService';
import {
  ItemProps,
  Template,
  TextItemProps,
} from '../../models/template.model';
import { DraggableImageItem } from './components/basics/ImageItem';
import { DraggableTextItem } from './components/basics/TextItem';
import { WithCopyPaste } from './components/WithCopyPaste';
import { PageContext } from './contexts/PageContext';
import { getDefaultImage, getDefaultText } from './defaultInitialData';

export const ResultDesign = ({
  state,
  setItemToUpdate,
  itemToUpdate,
  updateElement,
  createNewElement,
  deleteElement,
}: {
  state: Template;
  itemToUpdate: string;
  setItemToUpdate: (data: string) => void;
  updateElement: (
    itemId: string,
    update: Partial<{ value: string; style: CSSProperties }>,
  ) => void;
  createNewElement?: (elementProps: unknown) => void;
  deleteElement: (itemId: string) => void;
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
    <div style={{ position: 'relative', width: 'fit-content' }}>
      <div
        style={{
          border: '1px solid black',
          zIndex: 1,
          position: 'absolute',
          pointerEvents: 'none',
          inset: 0,
        }}
      />
      <DrawingPage
        style={state.page}
        onClick={() => {
          setItemToUpdate(null);
        }}
        onCreateNewElement={(element) => {
          createNewElement?.(element);
        }}
      >
        {Object.values(state.elements).map((item) => {
          if (item.type === 'text') {
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
                deleteElement={() => deleteElement(item.id)}
                onChange={(data) => updateElement(item.id, data)}
              />
            );
          } else if (item.type === 'image') {
            return (
              <DraggableImageItem
                isSelected={itemToUpdate === item.id}
                key={item.id}
                {...item}
                onCopy={(e) => {
                  clipBoardService.copy(item);
                  e.stopPropagation();
                }}
                deleteElement={() => deleteElement(item.id)}
                onDragStart={() => setItemToUpdate(item.id)}
                onDragEnd={(data) => updateItemPositionOnDragEnd(item.id, data)}
                onClick={(e) => {
                  setItemToUpdate(item.id);
                  e.stopPropagation();
                }}
                onChange={(data) => updateElement(item.id, data)}
              />
            );
          }
        })}
      </DrawingPage>
    </div>
  );
};

const DrawingPage: React.FC<
  HTMLAttributes<HTMLDivElement> & {
    onCreateNewElement: (data: ItemProps) => void;
  }
> = ({ children, style, onClick, onCreateNewElement }) => {
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
        position: 'relative',
        ...style,
      }}
      shouldCatchPasteBubbling
      onClick={onClick}
      onPaste={async (event) => {
        const dataTextFormat = event.clipboardData.getData('text/plain');
        if (event.clipboardData.files.length) {
          const fileToUpload = event.clipboardData.files[0];
          if (fileToUpload.type.includes('image')) {
            console.log('here', { fileToUpload });
            const result = await uploadImageFnFromFile(fileToUpload);
            if (result.imageUrl) {
              onCreateNewElement({
                id: new ObjectId().toHexString(),
                ...getDefaultImage({
                  top: 50,
                  left: 50,
                  imagePath: result.imageUrl,
                }),
              });
            }
          }
        }
        if (!dataTextFormat) {
          event.preventDefault();
          return;
        }
        try {
          let dataParsed: TextItemProps;
          if (dataTextFormat.includes('{')) {
            dataParsed = JSON.parse(
              JSON.parse(dataTextFormat),
            ) as TextItemProps;
          } else {
            dataParsed = {
              id: null,
              ...getDefaultText({ top: 50, left: 50, text: dataTextFormat }),
            };
          }

          if (dataParsed.type === 'text') {
            event.preventDefault();
            const id = new ObjectId().toHexString();
            const newElement = {
              ...dataParsed,
              id,
              style: {
                ...dataParsed.style,
                top: dataParsed.style.top + 20, // we slightly shift the element
                left: dataParsed.style.left + 20, // we slightly shift the element
              },
            };
            onCreateNewElement(newElement);
            clipBoardService.copy(newElement); // we update the value in the keyboard
          }
          return;
        } catch (e) {
          console.error(e);
        }
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
