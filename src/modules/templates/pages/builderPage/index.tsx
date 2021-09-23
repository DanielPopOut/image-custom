import { CSSProperties, DragEvent, useCallback, useState } from 'react';
import { BackgroundInput } from '../../../form/BackgroundInput';
import { DimensionInput } from '../../../form/DimensionInput';
import Form from '../../../form/Form';
import { Input } from '../../../form/Input';
import { Select } from '../../../form/Select';
import { Template, TextItemProps } from '../../models/template.model';

export const BuilderPage = ({
  initialData,
  onChange,
}: {
  initialData: Template;
  onChange?: (newState: Template) => void;
}) => {
  const [state, setState] = useState<Template>(initialData);
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

  const updateState = (newState: Template) => {
    setState(newState);
    onChange?.(newState);
  };

  const updatePageData = (newPageProps) => {
    const newState = { ...state, page: { ...state.page, ...newPageProps } };
    console.log({ newState });
    updateState(newState);
  };

  const updateElement = (
    itemId: string,
    update: Partial<{ value: string; style: CSSProperties }>,
  ) => {
    const elementToUpdate = state.elements[itemId];
    updateState({
      ...state,
      elements: {
        ...state.elements,
        [itemId]: {
          ...elementToUpdate,
          value: update.value || elementToUpdate.value,
          style: {
            ...elementToUpdate.style,
            ...update.style,
          },
        } as TextItemProps,
      },
    });
  };

  const updateItemPositionOnDragEnd = (
    itemId: string,
    dragEvent: DragEvent<HTMLDivElement>,
  ) => {
    const mainPageRect = pageElementProps.getBoundingClientRect();
    console.log('here end', mainPageRect);
    updateElement(itemId, {
      style: {
        top: dragEvent.clientY - mainPageRect.top - dragStartOffSet.y,
        left: dragEvent.clientX - mainPageRect.left - dragStartOffSet.x,
      },
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
              defaultValues={{
                ...state.elements[itemToUpdate].style,
                value: state.elements[itemToUpdate].value,
              }}
              onSubmit={({ value, ...style }) => {
                updateElement(itemToUpdate, { value, style });
              }}
            />
          </div>
        )}
      </div>

      <div style={{ padding: 20 }}>
        <div style={{ border: '1px solid black' }}>
          <div
            ref={onRefChange}
            style={{
              backgroundColor: 'white',
              position: 'relative',
              ...state.page,
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
                    const clientRect =
                      data.currentTarget.getBoundingClientRect();
                    setDragStartOffSet({
                      x: data.clientX - clientRect.left,
                      y: data.clientY - clientRect.y,
                    });
                  }}
                  onDragEnd={(data) =>
                    updateItemPositionOnDragEnd(item.id, data)
                  }
                  onClick={(data) => setItemToUpdate(item.id)}
                />
              );
            })}
          </div>
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
      style={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 250,
        padding: 20,
        border: '1px solid grey',
      }}
    >
      <DimensionInput name='width' label='width' />
      {/* <Input name='width' label='width'></Input> */}
      <DimensionInput name='height' label='height' />

      <BackgroundInput name='background' />

      <Input label='Background color' name='backgroundColor' type='color' />
      <Select
        label='Background size'
        name='backgroundSize'
        options={['auto', 'contain', 'cover']}
      />
      <Select
        label='Background repeat'
        name='backgroundRepeat'
        options={['no-repeat', 'repeat-x', 'repeat-y', 'round']}
      />
      <Select
        label='Background size'
        name='backgroundPosition'
        options={['center', 'left', 'right', 'top', 'bottom', 'unset']}
      />
      {/* <Input name='height' label='height'></Input> */}
    </Form>
  );
};
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
      onSubmit={({ top, left, ...data }) => {
        onSubmit(data);
      }}
      style={{ display: 'flex', flexDirection: 'column', maxWidth: 200 }}
    >
      <Input name='value' label='value' />
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
      <Input label='Color' name='color' type='color' />
      <Select
        label='Font weight'
        name='fontWeight'
        options={['normal', 'bolder', 'bold', 'lighter']}
      />
      <DimensionInput label='Font size' name='fontSize' />
      {/* <Input name='height' label='height'></Input> */}
    </Form>
  );
};
