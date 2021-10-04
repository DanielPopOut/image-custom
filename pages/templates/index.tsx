import Link from 'next/link';
import { useEffect } from 'react';
import { EmptyDivBoxIllustration } from 'src/modules/shared/components/EmptyDiv/EmptyDivBoxIllustration';
import { ROUTES } from 'src/modules/shared/routes/ROUTES';
import { Template } from 'src/modules/templates/models/template.model';
import { CreateNewTemplateButton } from 'src/modules/templates/pages/builderPage/components/CreateNewTemplateButton';
import { PageLayout } from '../../src/modules/shared/components/Layout';
import { withAuthenticatedGuard } from '../../src/modules/shared/guard/AuthenticatedGuard';
import { useGetAllTemplates } from '../../src/modules/templates/hooks/hooks';

export const TemplatesPage = () => {
  const [allTemplatesState, getAllTemplates] = useGetAllTemplates();
  useEffect(() => {
    getAllTemplates();
  }, []);

  if (allTemplatesState.loading) {
    return <div className='loader' />;
  }
  return (
    <PageLayout>
      <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
        <div>Your templates </div>
        <div style={{ flex: 1 }}></div>
        <CreateNewTemplateButton />
      </div>
      {!allTemplatesState.value?.length && (
        <EmptyDivBoxIllustration style={{ width: 500 }} />
      )}
      <div
        style={{
          display: 'grid',
          columns: 3,
          gridTemplateColumns: 'repeat( auto-fit, minmax(300px, 1fr) )',
          width: '900px',
          gap: 20,
          justifyContent: 'space-evenly',
          justifyItems: 'center',
          // margin: '20px auto',
        }}
      >
        {allTemplatesState.value.map((template) => (
          <TemplateElement template={template} />
        ))}
      </div>
    </PageLayout>
  );
};

const TemplateElement = ({ template }: { template: Template }) => {
  return (
    <Link href={ROUTES.TEMPLATE_ID(template._id)}>
      <div
        style={{
          padding: 20,
          border: '1px solid grey',
          minWidth: 300,
          minHeight: 200,
          background: `center / contain no-repeat url(${template.imageUrl})`,
          position: 'relative',
          cursor: 'pointer',
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 10,
            color: 'white',
            backgroundColor: '#33333333',
            textShadow: '1px 1px 2px black',
          }}
        >
          <div>{(template as any)?.name}</div>
          <div style={{ fontSize: '0.8em' }}>
            Created on {new Date(template?.dateCreation).toDateString()}
          </div>
          {template.version && (
            <div style={{ fontSize: '0.8em' }}>
              V{template.version} published on{' '}
              {new Date(template?.publicationDate).toDateString()}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
export default withAuthenticatedGuard(TemplatesPage);
