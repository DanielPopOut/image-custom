import { NextApiRequest, NextApiResponse } from 'next';
const DOWNLOAD_SELECTOR = '.to_download';
const SCREENSHOT_REMOTE_URL = 'https://screenshot-web-page.vercel.app';
// const SCREENSHOT_REMOTE_URL = 'http://localhost:3003';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const templateId = req.query.templateId as string;
    const pdfName = req.query.pdfName as string;
    const urlSearchParams = new URLSearchParams();
    Object.entries(req.query).map(([key, value]) => {
      urlSearchParams.set(key, value as string);
    });
    const host = req.headers.host;
    const requestToDownloadResume = `https://${host}/builder/${templateId}/test?${urlSearchParams.toString()}`;

    console.log({ requestToDownloadResume });
    const result = await fetch(
      `${SCREENSHOT_REMOTE_URL}/api/img?selector=${DOWNLOAD_SELECTOR}&url=${requestToDownloadResume}`,
    ).then((res) => res.body);
    const fileName = pdfName;
    res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
    res.setHeader('Content-type', 'image/jpeg');
    res.statusCode = 200;
    res.send(result);
  } else {
    res.status(400).send('Error');
  }
};
