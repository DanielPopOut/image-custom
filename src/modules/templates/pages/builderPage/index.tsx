import {
  createContext,
  CSSProperties,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Template, TextItemProps } from '../../models/template.model';
import { DownloadFonts } from '../../shared/DonwloadFonts';
import { ActionBar } from './components/ActionBar';
import { ParametersForm } from './components/ParametersForm';
import { QueryAndDownloadUrls } from './components/QueryAndDownloadUrls';
import { PageContextProvider } from './PageContext';
import { ResultDesign } from './ResultDesign';

export const BuilderPage = ({
  initialData,
  onChange,
}: {
  initialData: Template;
  onChange?: (newState: Template) => void;
}) => {
  return (
    <TemplateContextProvider initialTemplate={initialData} onChange={onChange}>
      <PageContextProvider>
        <BuilderPageContent />
      </PageContextProvider>
    </TemplateContextProvider>
  );
};

const BuilderPageContent = () => {
  const {
    deleteElement,
    updatePageData,
    updateElement,
    createNewElement,
    itemToUpdate,
    setItemToUpdate,
    state,
  } = useContext(TemplateContext);
  return (
    <div
      style={{ display: 'flex', outline: 'none', overflow: 'hidden' }}
      onKeyDown={(e) => {
        const key = e.key;
        if (key === 'Backspace' || key === 'Delete') {
          deleteElement();
        }
      }}
      tabIndex={-1}
    >
      <ParametersForm
        defaultValues={state.page}
        onSubmit={(data) => updatePageData(data)}
      />

      <div style={{ padding: 20, position: 'relative' }}>
        <ActionBar
          addNewItem={createNewElement}
          deleteItem={deleteElement}
          selectedItemStyle={state.elements[itemToUpdate]?.style}
          updateElementStyle={(data) =>
            updateElement(itemToUpdate, { style: data })
          }
        />
        <ResultDesign
          state={state}
          setItemToUpdate={setItemToUpdate}
          itemToUpdate={itemToUpdate}
          updateElement={updateElement}
        />
        <QueryAndDownloadUrls state={state} />
      </div>
    </div>
  );
};

type TemplateContextData = { state: Template; itemToUpdate: string };
type TemplateContextAction = {
  updatePageData: (pageData: Partial<Template['page']>) => void;
  updateElement: (
    elementId: string,
    update: Partial<{ value: string; style: CSSProperties }>,
  ) => void;
  createNewElement: (elementProps: unknown) => void;
  deleteElement: (elementId?: string) => void;
  setItemToUpdate: (elementId?: string) => void;
};
const TemplateContext = createContext<
  TemplateContextData & TemplateContextAction
>(null);

const TemplateContextProvider = ({
  children,
  initialTemplate,
  onChange,
}: {
  initialTemplate: Template;
  children: React.ReactNode;
  onChange?: (newState: Template) => void;
}) => {
  const [state, setTemplate] = useState<Template>(initialTemplate);
  const [itemToUpdate, setItemToUpdate] = useState<string>(null);
  const [fontFamilyRequest, setFontFamilyRequest] = useState(null);
  useEffect(() => {
    const template = new Template(initialTemplate);
    setFontFamilyRequest(template.getGoogleRequestForFonts());
  }, [initialTemplate]);

  const updateState = (newState: Template) => {
    setTemplate({ ...state, ...newState });
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

  const deleteElement = (elementId = itemToUpdate) => {
    if (!elementId || !state.elements[elementId]) {
      return;
    }
    const allElements = { ...state.elements };

    delete allElements[elementId];
    updateState({
      ...state,
      elements: allElements,
    });
    setItemToUpdate(null);
  };

  return (
    <TemplateContext.Provider
      value={{
        state: state,
        itemToUpdate,
        updatePageData,
        updateElement,
        createNewElement,
        deleteElement,
        setItemToUpdate,
      }}
    >
      <DownloadFonts fontFamilyRequest={fontFamilyRequest} />
      {children}
    </TemplateContext.Provider>
  );
};
