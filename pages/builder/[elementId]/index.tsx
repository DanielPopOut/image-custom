import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';
import { ROUTES } from '../../../src/modules/shared/routes/ROUTES';
import {
  useCreateTemplate,
  useGetTemplate,
  useUpdateTemplate,
} from '../../../src/modules/templates/hooks/hooks';
import { Template } from '../../../src/modules/templates/models/template.model';
import { BuilderPage } from '../../../src/modules/templates/pages/builderPage';
import { defaultInitialData } from '../../../src/modules/templates/pages/builderPage/defaultInitialData';

const ElementComponent = () => {
  const router = useRouter();
  const elementId = router.query.elementId as string;
  const [templateData, getTemplateData] = useGetTemplate();
  const [templateDataUpdated, updateTemplateData] = useUpdateTemplate();

  useEffect(() => {
    if (elementId) {
      getTemplateData(elementId);
    }
  }, [elementId]);

  if (templateData.loading) {
    return <div>Loading</div>;
  }
  if (!templateData.value) {
    return (
      <div>
        <div>Template not found</div>
        <CreateNewTemplateButton />
      </div>
    );
  }

  return (
    <BuilderPage
      initialData={templateData.value as Template}
      onChange={(newTemplateData) =>
        updateTemplateData(elementId, newTemplateData)
      }
    />
  );
};

const CreateNewTemplateButton = () => {
  const [templateDataResult, createTemplateData] = useCreateTemplate();
  const router = useRouter();
  return (
    <button
      disabled={templateDataResult.loading}
      onClick={() => {
        createTemplateData(defaultInitialData).then((result) => {
          if (result._id) {
            router.push(ROUTES.TEMPLATE_ID(result._id));
          }
        });
      }}
    >
      {templateDataResult.loading ? 'Creating' : 'Create new template'}
    </button>
  );
};

export default ElementComponent;
