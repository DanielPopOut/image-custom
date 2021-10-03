import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { DataBaseCrudService } from '../../../../server/modules/database/databaseCRUDService';
import { ApiResponseSuccess } from '../../../../server/shared/ApiResponseFormat';

const apiRoute = nextConnect();

apiRoute.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const collection = req.query.collection as string;
  const data = req.body;

  const insertedValue = await new DataBaseCrudService(collection).insertOne(
    data,
  );
  res.json(ApiResponseSuccess({ ...data, _id: insertedValue.insertedId }));
});

apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const collection = req.query.collection as string;

  const arrayResult = await new DataBaseCrudService(collection).getAll({});
  res.json(ApiResponseSuccess(arrayResult));
});

export default apiRoute;
