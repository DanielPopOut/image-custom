import { NextApiRequest, NextApiResponse } from 'next';
import { ROUTES } from '../../../src/modules/shared/routes/ROUTES';
const DOWNLOAD_SELECTOR = '.to_download';
const SCREENSHOT_REMOTE_URL = 'https://screenshot-web-page.vercel.app';
// const SCREENSHOT_REMOTE_URL = 'http://localhost:3003';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const templateId = req.query.templateId as string;
    const fileName = req.query.fileName as string;
    const urlSearchParams = new URLSearchParams();
    Object.entries(req.query).map(([key, value]) => {
      urlSearchParams.set(key, value as string);
    });
    const host = req.headers.host;
    const requestToDownloadResume =
      //   'https://google.com' ||
      `https://${host}${ROUTES.PREVIEW_TEMPLATE_ID(
        templateId,
      )}?${urlSearchParams.toString()}`;
    const screenshotApiUrl = `${SCREENSHOT_REMOTE_URL}/api/img?selector=${DOWNLOAD_SELECTOR}&url=${requestToDownloadResume}`;

    console.log({ requestToDownloadResume, screenshotApiUrl });
    const result = await fetch(screenshotApiUrl).then((res) => res.body);
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Content-Disposition', `inline;filename=${fileName}.png`);
    res.statusCode = 200;
    res.send(result);
  } else {
    res.status(400).send('Error');
  }
};
