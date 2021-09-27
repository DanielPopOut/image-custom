import { CSSProperties, useEffect, useState } from 'react';
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
  const [state, setState] = useState<Template>(initialData);

  const [itemToUpdate, setItemToUpdate] = useState<string>(null);

  const [fontFamilyRequest, setFontFamilyRequest] = useState(null);
  useEffect(() => {
    const template = new Template(initialData);
    setFontFamilyRequest(template.getGoogleRequestForFonts());
  }, [initialData]);

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

  return (
    <PageContextProvider>
      <DownloadFonts fontFamilyRequest={fontFamilyRequest} />

      <div
        style={{ display: 'flex', outline: 'none', overflow: 'hidden' }}
        onKeyDown={(e) => {
          const key = e.key;
          if (key === 'Backspace' || key === 'Delete') {
            deleteSelectedElement();
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
            deleteItem={deleteSelectedElement}
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
        </div>
        <QueryAndDownloadUrls state={state} />
      </div>
    </PageContextProvider>
  );
};
