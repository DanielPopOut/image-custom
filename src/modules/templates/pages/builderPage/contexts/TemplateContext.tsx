import { createContext, CSSProperties, useEffect, useState } from 'react';
import { useDebounce, useStateWithHistory } from 'react-use';
import { ItemProps, Template } from '../../../models/template.model';
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
    isSaving: boolean;
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
  updateElementsZindex: (zIndexMapping: Record<string, number>) => void;
};
export const TemplateContextProvider = ({
  children,
  initialTemplate,
  isSaving,
  onChange,
}: {
  initialTemplate: Template;
  children: React.ReactNode;
  isSaving;
  onChange?: (newState: Template) => void;
}) => {
  const [historyState, setHistoryState, timeTravelProps] = useStateWithHistory<
    Template,
    Template
  >(initialTemplate, 20);

  const [state, setTemplate] = useState(initialTemplate);

  const [itemToUpdate, setItemToUpdate] = useState<string>(null);
  const [fontFamilyRequest, setFontFamilyRequest] = useState(null);
  useEffect(() => {
    const template = new Template(initialTemplate);
    setFontFamilyRequest(template.getGoogleRequestForFonts());
  }, [initialTemplate]);

  const [, cancel] = useDebounce(
    () => {
      if (historyState !== state) {
        debugLog('2. go update diff');
        setHistoryState?.(state);
      } else {
        debugLog('4. states are the same');
      }
    },
    1000,
    [state],
  );

  useEffect(() => {
    debugLog('3. go update server');
    onChange?.(historyState);
    setTemplate(historyState);
  }, [historyState]);

  const updateState = (newState: Template) => {
    debugLog('1. update template');
    setTemplate({ ...state, ...newState });
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
    let newValue = update.value;
    if (!newValue && elementToUpdate.type === 'text') {
      newValue = elementToUpdate.value;
    }
    const newElement = {
      ...elementToUpdate,
      value: newValue,
      style: {
        ...elementToUpdate.style,
        ...update.style,
      },
    } as ItemProps;
    updateState({
      ...state,
      elements: {
        ...state.elements,
        [itemId]: newElement,
      },
    });
  };

  const createNewElement = (newElement: ItemProps) => {
    updateState({
      ...state,
      elements: {
        ...state.elements,
        [newElement.id]: newElement,
      },
    });
    setTimeout(() => {
      window
        .getSelection()
        .selectAllChildren(document.getElementById(newElement.id));
    }, 100);
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

  const updateElementsZindex = (zIndexMapping: Record<string, number> = {}) => {
    const allElements = { ...state.elements };
    Object.entries(zIndexMapping).forEach(([elementId, zIndex]) => {
      const elementToUpdate = allElements[elementId];
      if (elementToUpdate) {
        elementToUpdate.style.zIndex = zIndex;
      }
    });
    updateState({
      ...state,
      elements: allElements,
    });
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
        updateElementsZindex,
        builderNavBarProps: {
          hasPrevious: timeTravelProps.position > 0,
          hasNext:
            timeTravelProps.position < timeTravelProps.history.length - 1,
          back: timeTravelProps.back,
          forward: timeTravelProps.forward,
          isSaving,
        },
      }}
    >
      <DownloadFonts fontFamilyRequest={fontFamilyRequest} />
      {children}
    </TemplateContext.Provider>
  );
};

const debugLog = (...data) => {
  if (process.env.DEBUG_MODE === 'true') {
    console.log(...data);
  }
};
