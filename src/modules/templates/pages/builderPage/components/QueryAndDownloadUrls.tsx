import { API_ROUTES, ROUTES } from '../../../../shared/routes/ROUTES';
import { stringHelper } from '../../../../shared/services/stringHelper';
import { Template } from '../../../models/template.model';

export const QueryAndDownloadUrls = ({ state }: { state: Template }) => {
  const allVariables = stringHelper.getValueToInterpolateInStringArray(
    Object.values(state.elements).map((element) => {
      if (element.type === 'text') {
        return element.value;
      }
      return '';
    }),
  );

  const queryString = [...allVariables]
    .map((variable) => `${variable}=VALUE_${variable.toUpperCase()}`)
    .join('&');
  return (
    <div style={{ padding: 20 }}>
      <div>
        <a
          style={{ color: 'blue', textDecoration: 'underline' }}
          href={`${ROUTES.PREVIEW_TEMPLATE_ID(state._id)}?${queryString}`}
        >
          Preview page
        </a>
        <br />
        <div>
          Api url :
          <div>
            {`https://${
              process.env.NEXT_PUBLIC_VERCEL_URL
            }${API_ROUTES.DOWNLOAD_TEMPLATE_ID(state._id)}?${queryString}`}
          </div>
        </div>
      </div>
    </div>
  );
};
