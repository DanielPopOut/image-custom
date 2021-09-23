import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';
import {
  useGetTemplate,
  useUpdateTemplate,
} from '../../../src/modules/templates/hooks/hooks';
import { Template } from '../../../src/modules/templates/models/template.model';
import { BuilderPage } from '../../../src/modules/templates/pages/builderPage';
import { CreateNewTemplateButton } from '../../../src/modules/templates/pages/builderPage/components/CreateNewTemplateButton';

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

export default ElementComponent;
