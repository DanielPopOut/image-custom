import { useContext } from 'react';
import { ROUTES } from 'src/modules/shared/routes/ROUTES';
import Link from 'next/link';
import { usePublishTemplate, useUpdateTemplate } from '../../hooks/hooks';
import { Template } from '../../models/template.model';
import { ActionBar } from './components/ActionBar';
import { BuilderNavBar } from './components/BuilderNavBar';
import { LayerLevels } from './components/LayerLevels';
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
}: {
  initialData: Template;
  onChange?: (newState: Template) => void;
}) => {
  const [templateDataUpdated, updateTemplateData] = useUpdateTemplate();
  return (
    <TemplateContextProvider
      initialTemplate={initialData}
      isSaving={templateDataUpdated.loading}
      onChange={(newTemplateData) => {
        updateTemplateData(newTemplateData._id, newTemplateData);
      }}
    >
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
    builderNavBarProps,
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
          if (e.metaKey || e.ctrlKey) {
            if (e.key === 'z' || e.key === 'Z') {
              if (e.shiftKey) {
                builderNavBarProps.forward();
              } else {
                builderNavBarProps.back();
              }
            }
          }
        }}
        tabIndex={-1}
      >
        <div
          style={{
            width: 250,
            borderRight: '1px solid #aaa',
            backgroundColor: 'white',
            zIndex: 100,
          }}
        >
          <PageParameters
            defaultValues={state.page}
            onChange={(data) => updatePageData(data)}
          />
          <LayerLevels elements={state.elements} />
        </div>

        <div style={{ paddingLeft: 20, position: 'relative' }}>
          <div
            style={{
              marginLeft: -20,
              padding: 20,
              paddingBottom: 10,
              backgroundColor: 'white',
              position: 'relative',
              zIndex: 100,
            }}
          >
            <ActionBar
              addNewItem={createNewElement}
              deleteItem={deleteElement}
              selectedItem={state.elements[itemToUpdate]}
              updateElementStyle={(data) =>
                updateElement(itemToUpdate, { style: data })
              }
            />
          </div>
          <ResultDesign
            state={state}
            setItemToUpdate={setItemToUpdate}
            itemToUpdate={itemToUpdate}
            updateElement={updateElement}
            createNewElement={createNewElement}
            deleteElement={deleteElement}
          />
          <QueryAndDownloadUrls state={state} />
        </div>
      </div>
    </div>
  );
};

const BuilderNavBarWithTemplateContext = () => {
  const {
    builderNavBarProps: { hasPrevious, hasNext, back, forward, isSaving },
    state,
  } = useContext(TemplateContext);
  return (
    <BuilderNavBar
      timeTravelProps={{
        hasPrevious,
        hasNext,
        undo: () => back(),
        redo: () => forward(),
      }}
      ActionButtons={
        <>
          <PublishButton templateId={state._id} />
          <GenerateDesignsButton templateId={state._id} />
        </>
      }
      isSaving={isSaving}
    />
  );
};

const PublishButton = ({ templateId }: { templateId: string }) => {
  const [publishTemplateState, publishTemplate] = usePublishTemplate();
  return (
    <button
      className='button primary'
      onClick={() =>
        publishTemplate(templateId).then((data) => {
          if (!(data instanceof Error)) {
            alert('Votre template a bien ??t?? publi??');
          }
        })
      }
    >
      {publishTemplateState.loading && (
        <span
          className='loader'
          style={{
            fontSize: 10,
            margin: 0,
            marginRight: 10,
            display: 'inline-block',
          }}
        />
      )}
      Publish
    </button>
  );
};

const ExportButton = ({ onExport }) => {
  return (
    <button className='button' onClick={onExport}>
      Export
    </button>
  );
};

const GenerateDesignsButton = ({ templateId }: { templateId: string }) => {
  return (
    <Link href={ROUTES.TEMPLATE.GENERATE_IMAGES(templateId)}>
      <button className='button'>Generate images</button>
    </Link>
  );
};
