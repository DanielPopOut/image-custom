import { useEffect } from 'react';
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
      Hello template Page
    </PageLayout>
  );
};

export default withAuthenticatedGuard(TemplatesPage);
