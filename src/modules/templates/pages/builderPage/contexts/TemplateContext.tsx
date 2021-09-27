import { createContext, CSSProperties, useEffect, useState } from 'react';
import { useStateWithHistory } from 'react-use';
import { Template, TextItemProps } from '../../../models/template.model';
import { DownloadFonts } from '../../../shared/DonwloadFonts';

export const TemplateContext = createContext<
  TemplateContextData & TemplateContextAction
>(null);
type TemplateContextData = {
  state: Template;
  itemToUpdate: string;
  builderNavBarProps: {
    hasPrevious: boolean;
    hasNext: boolean;
    back: () => void;
    forward: () => void;
  };
};
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
export const TemplateContextProvider = ({
  children,
  initialTemplate,
  onChange,
}: {
  initialTemplate: Template;
  children: React.ReactNode;
  onChange?: (newState: Template) => void;
}) => {
  const [state, setTemplate, timeTravelProps] = useStateWithHistory<
    Template,
    Template
  >(initialTemplate, 20);
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
        builderNavBarProps: {
          hasPrevious: timeTravelProps.position > 0,
          hasNext:
            timeTravelProps.position < timeTravelProps.history.length - 1,
          back: timeTravelProps.back,
          forward: timeTravelProps.forward,
        },
      }}
    >
      <DownloadFonts fontFamilyRequest={fontFamilyRequest} />
      {children}
    </TemplateContext.Provider>
  );
};
