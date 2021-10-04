import { templateService } from 'server/modules/templates/template.service';
import {
  ApiResponseError,
  ApiResponseSuccess,
} from 'server/shared/ApiResponseFormat';

export default async (req, res) => {
  const elementId = req.query.templateId as string;
  try {
    const elementFound = await templateService.findOneById(elementId);
    res.json(ApiResponseSuccess(elementFound));
  } catch (e) {
    console.error(e);
    res.status(400).json(ApiResponseError(e.message));
  }
};
