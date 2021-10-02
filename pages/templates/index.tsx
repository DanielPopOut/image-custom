import { PageLayout } from '../../src/modules/shared/components/Layout';
import { withAuthenticatedGuard } from '../../src/modules/shared/guard/AuthenticatedGuard';

export const TemplatesPage = () => {
  return <PageLayout>Hello template Page</PageLayout>;
};

export default withAuthenticatedGuard(TemplatesPage);
