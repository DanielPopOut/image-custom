import { useRouter } from 'next/dist/client/router';
import { ROUTES } from '../../../../shared/routes/ROUTES';
import { useCreateTemplate } from '../../../hooks/hooks';
import { defaultInitialData } from '../defaultInitialData';

export const CreateNewTemplateButton = () => {
  const [templateDataResult, createTemplateData] = useCreateTemplate();
  const router = useRouter();
  return (
    <button
      disabled={templateDataResult.loading}
      onClick={() => {
        createTemplateData(defaultInitialData).then((result) => {
          if (result._id) {
            router.push(ROUTES.TEMPLATE_ID(result._id));
          }
        });
      }}
    >
      {templateDataResult.loading ? 'Creating' : 'Create new template'}
    </button>
  );
};
