import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { templateService } from 'server/modules/templates/template.service';
import {
  authenticationHandler,
  NextApiRequestWithUserInfo,
} from 'server/shared/isAuthenticated';
import { Template } from 'src/modules/templates/models/template.model';

const apiRoute = nextConnect();

apiRoute.use(authenticationHandler);
apiRoute.use(async (req: NextApiRequestWithUserInfo, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const user = req.connectedUser;
    const templateId = req.query.templateId as string;
    const templateToPublish = await templateService.findOneById(templateId);

    if (!templateToPublish) {
      throw Error('No template found');
    }
    if (templateToPublish?.creatorId !== (user.id as string)) {
      res
        .status(401)
        .json({ error: 'You don t have the right to publish this template' });
      return;
    }

    let templateUpdated: Template;
    try {
      const templateUpdated = await templateService.publishTemplate(
        templateToPublish,
        req.headers.host,
      );
      res.send({ result: templateUpdated });
    } catch (e) {
      console.error(e);
      res.status(400).json({ error: 'Error occured contact admin please' });
      return;
    }
    templateService.updateTemplateScreenshot(templateUpdated);
  } else {
    res.status(400).send('Error');
  }
});
export default apiRoute;
