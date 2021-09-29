import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';
import { stringHelper } from '../../../src/modules/shared/services/stringHelper';
import { useGetTemplate } from '../../../src/modules/templates/hooks/hooks';
import { Template } from '../../../src/modules/templates/models/template.model';
import { CreateNewTemplateButton } from '../../../src/modules/templates/pages/builderPage/components/CreateNewTemplateButton';
import { ResultDesign } from '../../../src/modules/templates/pages/builderPage/ResultDesign';
import { DownloadFonts } from '../../../src/modules/templates/shared/DonwloadFonts';

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
    if (value.type === 'text') {
      value.value = stringHelper.replaceValueInString(
        value.value,
        queryElement as Record<string, string>,
      );
    }
  }

  const template = new Template(templateData.value);
  const fontFamilyRequest = template.getGoogleRequestForFonts();

  return (
    <>
      <DownloadFonts fontFamilyRequest={fontFamilyRequest} />
      <ResultDesign
        {...{
          state: templateDataToUse as Template,
          setItemToUpdate: () => null,
          itemToUpdate: '',
          updateElement: () => null,
        }}
      />
    </>
  );
};

export default ElementComponent;
