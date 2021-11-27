import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { GeneratorPage } from 'src/modules/templates/pages/generationPage';
import { useGetTemplate } from '../../../src/modules/templates/hooks/hooks';
import { Template } from '../../../src/modules/templates/models/template.model';
import { CreateNewTemplateButton } from '../../../src/modules/templates/pages/builderPage/components/CreateNewTemplateButton';

const ElementComponent = () => {
  const router = useRouter();
  const elementId = router.query.elementId as string;
  const [templateData, getTemplateData] = useGetTemplate();

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

  if (!templateData?.value.publishedVersion) {
    return <div>No version published</div>;
  }

  return <GeneratorPage initialData={templateData.value as Template} />;
};

export default ElementComponent;
