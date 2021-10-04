import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import { PROTOCOL_AND_HOST } from 'server/shared/config/constants';
import { basicResultHandler } from 'src/modules/shared/hooks/generics';
import { stringHelper } from '../../../src/modules/shared/services/stringHelper';
import { Template } from '../../../src/modules/templates/models/template.model';
import { ResultDesign } from '../../../src/modules/templates/pages/builderPage/ResultDesign';
import { DownloadFonts } from '../../../src/modules/templates/shared/DonwloadFonts';

const ElementComponent = ({ templateData }: { templateData: Template }) => {
  const router = useRouter();

  if (!templateData?.publishedVersion) {
    return <div className='to_download'>No version published</div>;
  }

  const queryElement = router.query;
  const templateDataValue = templateData;
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

  const template = new Template({
    _id: templateData._id,
    ...templateData.publishedVersion,
  });
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

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const templateId = context.query.elementId;
  const urlToFetch = `${PROTOCOL_AND_HOST}/api/custom/templates/${templateId}`;

  const templateData = await fetch(urlToFetch).then(basicResultHandler);

  return { props: { templateData: templateData } };
};
