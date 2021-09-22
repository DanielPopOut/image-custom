import {
  CSSProperties,
  DragEvent,
  HTMLAttributes,
  useCallback,
  useState,
} from 'react';
import Form, { DimensionInput, Select } from '../../src/modules/form/Form';

const initialPageWidth = 400;

const BuilderPage = () => {
  const [state, setState] = useState({
    page: { width: '400px', height: '300px' },
    elements: {
      text1: {
        id: 'text1',
        type: 'text',
        value: 'Hello Daniel',
        style: {
          display: 'flex',
          top: initialPageWidth / 2,
          left: initialPageWidth / 2,
          width: 300,
          height: 100,
          color: 'black',
        },
      } as TextItemProps,
    },
  });
  const [pageElementProps, setNodeElementProps] = useState<HTMLDivElement>();
  const [dragStartOffSet, setDragStartOffSet] =
    useState<{ x: number; y: number }>(null);
  const [itemToUpdate, setItemToUpdate] = useState<string>(null);

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

  const updatePageData = (newPageProps) => {
    const newState = { ...state, page: { ...state.page, ...newPageProps } };
    console.log({ newState });
    setState(newState);
  };

  const updateElementStyle = (
    itemId: string,
    styleUpdate: Partial<CSSProperties>,
  ) => {
    const elementToUpdate = state.elements[itemId];
    setState({
      ...state,
      elements: {
        ...state.elements,
        [itemId]: {
          ...elementToUpdate,
          style: {
            ...elementToUpdate.style,
            ...styleUpdate,
          },
        },
      },
    });
  };

  const updateItemPositionOnDragEnd = (
    itemId: string,
    dragEvent: DragEvent<HTMLDivElement>,
  ) => {
    const mainPageRect = pageElementProps.getBoundingClientRect();
    console.log('here end', mainPageRect);
    updateElementStyle(itemId, {
      top: dragEvent.clientY - mainPageRect.top - dragStartOffSet.y,
      left: dragEvent.clientX - mainPageRect.left - dragStartOffSet.x,
    });
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;1,400&display=swap');
      </style> */}
      <div style={{ display: 'flex', flexDirection: 'column', width: 350 }}>
        <ParametersForm
          defaultValues={state.page}
          onSubmit={(data) => updatePageData(data)}
        />
        <div style={{ padding: 20 }}></div>
        {itemToUpdate && (
          <div
            style={{
              backgroundColor: 'white',
              color: 'black',
              width: 'fit-content',
              padding: 10,
            }}
          >
            <div>Update element</div>
            <TextInputFormFields
              defaultValues={state.elements[itemToUpdate].style}
              onSubmit={(data) => {
                updateElementStyle(itemToUpdate, data);
                setItemToUpdate(null);
              }}
            />
          </div>
        )}
      </div>

      <div style={{ padding: 20 }}>
        <div
          ref={onRefChange}
          style={{
            width: state.page.width,
            height: state.page.height,
            backgroundColor: 'white',
            position: 'relative',
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
                onClick={(data) => setItemToUpdate(item.id)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const ParametersForm = ({
  defaultValues,
  onSubmit,
}: {
  defaultValues?;
  onSubmit: (data) => void;
}) => {
  return (
    <Form
      defaultValues={defaultValues}
      onSubmit={(data) => {
        onSubmit(data);
      }}
      style={{ display: 'flex', flexDirection: 'column', maxWidth: 200 }}
    >
      <DimensionInput name='width' label='width' />
      {/* <Input name='width' label='width'></Input> */}
      <DimensionInput name='height' label='height' />
      {/* <Input name='height' label='height'></Input> */}
    </Form>
  );
};

type TextItemStyleProps = {
  top?: number;
  left?: number;
  width?: number;
  height?: number;
  color?: CSSProperties['color'];
  textAlign?: CSSProperties['textAlign'];
};
type TextItemProps = {
  id: string;
  type: 'text';
  value: string;
  style: TextItemStyleProps;
  isSelected?: boolean;
} & HTMLAttributes<HTMLDivElement>;

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

const TextInputFormFields = ({
  defaultValues,
  onSubmit,
}: {
  defaultValues?;
  onSubmit: (data) => void;
}) => {
  return (
    <Form
      defaultValues={defaultValues}
      onSubmit={(data) => {
        onSubmit(data);
      }}
      style={{ display: 'flex', flexDirection: 'column', maxWidth: 200 }}
    >
      <DimensionInput name='width' label='width' />
      {/* <Input name='width' label='width'></Input> */}
      <DimensionInput name='height' label='height' />
      <Select
        name='justifyContent'
        label='Horizontal alignment'
        options={['center', 'start', 'end']}
      />
      <Select
        name='alignItems'
        label='Vertical alignment'
        options={['center', 'start', 'end']}
      />
      {/* <Input name='height' label='height'></Input> */}
    </Form>
  );
};

export default BuilderPage;
