import { ROUTES } from 'src/modules/shared/routes/ROUTES';

const SCREENSHOT_REMOTE_URL = 'https://screenshot-web-page.vercel.app';
// const SCREENSHOT_REMOTE_URL = 'http://localhost:3002';
const DOWNLOAD_SELECTOR = '.to_download';

class ScreenShotService {
  computeUrlToScreen = (
    host: string,
    templateId: string,
    requestQuery: Record<string, string>,
  ) => {
    const urlSearchParams = new URLSearchParams();
    Object.entries(requestQuery).map(([key, value]) => {
      urlSearchParams.set(key, value as string);
    });
    const previewUrlToFetch =
      //   'https://google.com' ||
      `https://${host}${ROUTES.PREVIEW_TEMPLATE_ID(
        templateId,
      )}?${encodeURIComponent(urlSearchParams.toString())}`;
    return previewUrlToFetch;
  };

  screenElementToImage = async (urlToFetch: string) => {
    const screenshotApiUrl = `${SCREENSHOT_REMOTE_URL}/api/img?selector=${DOWNLOAD_SELECTOR}&url=${urlToFetch}`;
    console.log({ urlToFetch, screenshotApiUrl });
    const result = await fetch(screenshotApiUrl).then((res) => res.body);
    return result;
  };

  computeUrlAndFetch = async (
    host: string,
    templateId: string,
    requestQuery: Record<string, string>,
  ) => {
    const urlToFetch = this.computeUrlToScreen(host, templateId, requestQuery);
    return await this.screenElementToImage(urlToFetch);
  };
}

export const screenShotService = new ScreenShotService();
