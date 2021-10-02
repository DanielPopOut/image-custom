import { PageLayout } from '../../src/modules/shared/components/Layout';
import { AuthenticatedGuard } from '../../src/modules/shared/guard/AuthenticatedGuard';

export const TemplatesPage = () => {
  return (
    <AuthenticatedGuard>
      <PageLayout>Hello template Page</PageLayout>
    </AuthenticatedGuard>
  );
};

export default TemplatesPage;
