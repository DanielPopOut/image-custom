import { API_ROUTES, ROUTES } from '../../../../shared/routes/ROUTES';
import { Template } from '../../../models/template.model';

export const QueryAndDownloadUrls = ({ state }: { state: Template }) => {
  const queryObject = Template.generateDefaultQueryVariables(state);

  const queryString = Object.entries(queryObject)
    .map(([key, value]) => [key, value].join('='))
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
