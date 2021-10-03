import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { screenShotService } from 'server/modules/screenshot/screenshotService';

const apiRoute = nextConnect();

apiRoute.use(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const templateId = req.query.templateId as string;
    const fileName = (req.query.fileName as string) || req.query.templateId;
    const result = await screenShotService.computeUrlAndFetch(
      req.headers.host,
      templateId,
      req.query as Record<string, string>,
    );
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Content-Disposition', `inline;filename=${fileName}.png`);
    res.statusCode = 200;
    res.send(result);
  } else {
    res.status(400).send('Error');
  }
});
export default apiRoute;
