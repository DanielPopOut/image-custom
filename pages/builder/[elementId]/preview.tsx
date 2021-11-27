import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { PROTOCOL_AND_HOST } from 'server/shared/config/constants';
import { basicResultHandler } from 'src/modules/shared/hooks/generics';
import { Template } from '../../../src/modules/templates/models/template.model';
import { PreviewResultDesign } from '../../../src/modules/templates/shared/PreviewResultDesign';

const ElementComponent = ({ templateData }: { templateData: Template }) => {
  const router = useRouter();

  if (!templateData?.publishedVersion) {
    return <div className='to_download'>No version published</div>;
  }

  const queryElement = router.query as Record<string, string>;

  return (
    <>
      <PreviewResultDesign
        templateData={templateData}
        queryElements={queryElement}
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
