import { CSSProperties, useState } from 'react';
import { BackgroundInput } from '../../../form/BackgroundInput';
import { DimensionInput } from '../../../form/DimensionInput';
import { FontSelect } from '../../../form/FontSelector';
import Form from '../../../form/Form';
import { Input } from '../../../form/Input';
import { Select } from '../../../form/Select';
import { API_ROUTES, ROUTES } from '../../../shared/routes/ROUTES';
import { stringHelper } from '../../../shared/services/stringHelper';
import { Template, TextItemProps } from '../../models/template.model';
import { ActionBar } from './components/ActionBar';
import { PageContextProvider } from './PageContext';
import { ResultDesign } from './ResultDesign';

export const BuilderPage = ({
  initialData,
  onChange,
}: {
  initialData: Template;
  onChange?: (newState: Template) => void;
}) => {
  const [state, setState] = useState<Template>(initialData);

  const [itemToUpdate, setItemToUpdate] = useState<string>(null);

  const updateState = (newState: Template) => {
    setState(newState);
    onChange?.(newState);
  };

  const updatePageData = (newPageProps) => {
    const newState = { ...state, page: { ...state.page, ...newPageProps } };
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

  const createNewElement = (newElement: TextItemProps) => {
    updateState({
      ...state,
      elements: {
        ...state.elements,
        [newElement.id]: newElement,
      },
    });
  };

  const deleteSelectedElement = () => {
    if (!itemToUpdate || !state.elements[itemToUpdate]) {
      return;
    }
    const allElements = { ...state.elements };

    delete allElements[itemToUpdate];
    updateState({
      ...state,
      elements: allElements,
    });
    setItemToUpdate(null);
  };

  const allVariables = stringHelper.getValueToInterpolateInStringArray(
    Object.values(state.elements).map((element) => element.value.toLowerCase()),
  );

  const queryString = [...allVariables]
    .map((variable) => `${variable}=VALUE_${variable.toUpperCase()}`)
    .join('&');

  return (
    <PageContextProvider>
      <div
        style={{ display: 'flex', outline: 'none' }}
        onKeyDown={(e) => {
          const key = e.key;
          if (key === 'Backspace' || key === 'Delete') {
            deleteSelectedElement();
          }
        }}
        tabIndex={-1}
      >
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
        </div>

        <div style={{ padding: 20, position: 'relative' }}>
          <ActionBar
            addNewItem={createNewElement}
            deleteItem={deleteSelectedElement}
            selectedItem={itemToUpdate}
          />
          <ResultDesign
            state={state}
            setItemToUpdate={setItemToUpdate}
            itemToUpdate={itemToUpdate}
            updateElement={updateElement}
          />
          <div>
            <div>
              <a
                style={{ color: 'blue', textDecoration: 'underline' }}
                href={`${ROUTES.PREVIEW_TEMPLATE_ID(state._id)}?${queryString}`}
              >
                Preview page
              </a>
              <br />
              <div>
                Api url :
                <div>
                  {`https://${
                    process.env.NEXT_PUBLIC_VERCEL_URL
                  }${API_ROUTES.DOWNLOAD_TEMPLATE_ID(
                    state._id,
                  )}?${queryString}`}
                </div>
              </div>
            </div>
          </div>
        </div>
        {itemToUpdate && state.elements[itemToUpdate] && (
          <div
            style={{
              ...containerStyle,
              height: 'fit-content',
              backgroundColor: 'white',
              color: 'black',
              width: 'fit-content',
              padding: 10,
            }}
          >
            <h4 style={{ marginTop: 0 }}>Update element</h4>
            <TextInputFormFields
              defaultValues={{
                ...state.elements[itemToUpdate].style,
                value: state.elements[itemToUpdate].value,
              }}
              onSubmit={(style) => {
                updateElement(itemToUpdate, { style });
              }}
            />
          </div>
        )}
      </div>
    </PageContextProvider>
  );
};

const containerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: 250,
  padding: 20,
  border: '1px solid grey',
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
      style={containerStyle}
    >
      <h4 style={{ marginTop: 0 }}>Page parameters</h4>
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
      onChange={({ top, left, ...data }) => {
        onSubmit(data);
      }}
      onSubmit={({ top, left, ...data }) => {
        onSubmit(data);
      }}
      style={{ display: 'flex', flexDirection: 'column', maxWidth: 200 }}
    >
      <FontSelect name='font-family' label='font' />
      <DimensionInput name='width' label='width' />
      <DimensionInput name='height' label='height' />
      <Select
        name='justifyContent'
        label='Horizontal alignment'
        defaultValue='start'
        options={['center', 'start', 'end']}
      />
      <Select
        name='alignItems'
        label='Vertical alignment'
        defaultValue='start'
        options={['center', 'start', 'end']}
      />
      <Select
        name='textAlign'
        label='Text alignment'
        defaultValue='initial'
        options={['initial', 'center', 'justify', 'start', 'end']}
      />
      <Input label='Color' name='color' type='color' />
      <Select
        label='Font weight'
        name='fontWeight'
        defaultValue='normal'
        options={['normal', 'bolder', 'bold', 'lighter']}
      />
      <DimensionInput label='Font size' name='fontSize' />
    </Form>
  );
};
