import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { DataBaseCrudService } from '../../../../server/modules/database/databaseCRUDService';
import {
  ApiResponseError,
  ApiResponseSuccess,
} from '../../../../server/shared/ApiResponseFormat';

const apiRoute = nextConnect();

apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const collection = req.query.collection as string;
  const elementId = req.query.elementId as string;
  try {
    const elementFound = await new DataBaseCrudService(collection).getOneById(
      elementId,
    );
    res.json(ApiResponseSuccess(elementFound));
  } catch (e) {
    console.error(e);
    res.status(400).json(ApiResponseError(e.message));
  }
});

apiRoute.put(async (req: NextApiRequest, res: NextApiResponse) => {
  const collection = req.query.collection as string;
  const elementId = req.query.elementId as string;
  const data = req.body;
  await new DataBaseCrudService(collection).updateOne(
    elementId,
    data,
    !!(req.query.upsert as string),
  );
  const updatedObject = await new DataBaseCrudService(collection).getOneById(
    elementId,
  );
  res.json(ApiResponseSuccess(updatedObject));
});

export default apiRoute;
