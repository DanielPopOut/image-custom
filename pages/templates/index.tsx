import { useEffect } from 'react';
import { EmptyDivBoxIllustration } from 'src/modules/shared/components/EmptyDiv/EmptyDivBoxIllustration';
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
          <div>{template._id}</div>
        ))}
      </div>
    </PageLayout>
  );
};

export default withAuthenticatedGuard(TemplatesPage);
