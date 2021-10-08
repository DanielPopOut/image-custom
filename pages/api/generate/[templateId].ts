import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { screenShotService } from 'server/modules/screenshot/screenshotService';
import { authenticationHandler } from 'server/shared/isAuthenticated';

const apiRoute = nextConnect();

apiRoute.use(authenticationHandler);
apiRoute.use(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const templateId = req.query.templateId as string;
    const fileName = (req.query.fileName as string) || req.query.templateId;
    const result = await screenShotService.computeUrlAndFetch(
      templateId,
      req.query as Record<string, string>,
    );
    const body = await result.body;
    res.setHeader('content-type', result.headers.get('content-type'));
    res.setHeader(
      'content-disposition',
      result.headers.get('content-disposition'),
    );
    res.statusCode = 200;
    res.send(body);
  } else {
    res.status(400).send('Error');
  }
});
export default apiRoute;
