import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';
import { stringHelper } from '../../../src/modules/shared/services/stringHelper';
import { useGetTemplate } from '../../../src/modules/templates/hooks/hooks';
import { Template } from '../../../src/modules/templates/models/template.model';
import { BuilderPage } from '../../../src/modules/templates/pages/builderPage';
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

  const queryElement = router.query;
  const templateDataValue = templateData.value;
  const templateDataToUse = {
    ...templateDataValue,
    elements: { ...templateDataValue.elements },
  };
  for (const [key, value] of Object.entries(templateDataToUse.elements)) {
    value.value = stringHelper.replaceValueInString(
      value.value,
      queryElement as Record<string, string>,
    );
    console.log({ value, queryElement, result: value.value });
  }

  return <BuilderPage initialData={templateDataToUse as Template} />;
};

export default ElementComponent;
