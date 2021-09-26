import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useEffect } from 'react';
import { stringHelper } from '../../../src/modules/shared/services/stringHelper';
import { useGetTemplate } from '../../../src/modules/templates/hooks/hooks';
import { Template } from '../../../src/modules/templates/models/template.model';
import { CreateNewTemplateButton } from '../../../src/modules/templates/pages/builderPage/components/CreateNewTemplateButton';
import { ResultDesign } from '../../../src/modules/templates/pages/builderPage/ResultDesign';

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
  const fontsToDownload = new Set<string>();
  for (const [key, value] of Object.entries(templateDataToUse.elements)) {
    value.value = stringHelper.replaceValueInString(
      value.value,
      queryElement as Record<string, string>,
    );
    if (value.style.fontFamily) {
      fontsToDownload.add(value.style.fontFamily);
    }
  }

  const fontFamilyFields = calculateFontFamilyFields([
    ...fontsToDownload,
  ] as string[]);

  return (
    <>
      {fontFamilyFields ? (
        <Head>
          {' '}
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin='anonymous'
          />
          <link
            href={`https://fonts.googleapis.com/css2?${fontFamilyFields}&display=swap`}
            rel='stylesheet'
          ></link>
        </Head>
      ) : null}
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

const calculateFontFamilyFields = (families: string[]) => {
  return families
    .map((family) => {
      return `family=${family
        .split(' ')
        .join('+')}:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700`;
    })
    .join('&');
};

export default ElementComponent;
