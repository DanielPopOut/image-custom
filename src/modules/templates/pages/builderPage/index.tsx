import { useContext } from 'react';
import { Template } from '../../models/template.model';
import { ActionBar } from './components/ActionBar';
import { BuilderNavBar } from './components/BuilderNavBar';
import { PageParameters } from './components/ParametersForm';
import { QueryAndDownloadUrls } from './components/QueryAndDownloadUrls';
import { PageContextProvider } from './contexts/PageContext';
import {
  TemplateContext,
  TemplateContextProvider,
} from './contexts/TemplateContext';
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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <BuilderNavBarWithTemplateContext />
      <div
        style={{
          display: 'flex',
          outline: 'none',
          overflow: 'hidden',
          flex: 1,
        }}
        onKeyDown={(e) => {
          const key = e.key;
          if (key === 'Backspace' || key === 'Delete') {
            deleteElement();
          }
        }}
        tabIndex={-1}
      >
        <div style={{ width: 250, borderRight: '1px solid #aaa' }}>
          <PageParameters
            defaultValues={state.page}
            onChange={(data) => updatePageData(data)}
          />
        </div>

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
    </div>
  );
};

const BuilderNavBarWithTemplateContext = () => {
  const {
    builderNavBarProps: { hasPrevious, hasNext, back, forward },
    state,
  } = useContext(TemplateContext);
  return (
    <BuilderNavBar
      onExport={() => {
        navigator.clipboard.writeText(JSON.stringify(state, null, 3));
        setTimeout(() => alert('Copied in clipboard'), 1000);
      }}
      timeTravelProps={{
        hasPrevious,
        hasNext,
        undo: () => back(),
        redo: () => forward(),
      }}
    />
  );
};
