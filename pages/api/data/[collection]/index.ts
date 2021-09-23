import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { DataBaseCrudService } from '../../../../server/modules/database/databaseCRUDService';

const apiRoute = nextConnect();

apiRoute.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const collection = req.query.collection as string;
  const data = req.body;

  const insertedValue = await new DataBaseCrudService(collection).insertOne(
    data,
  );
  res.json({ ...data, _id: insertedValue.insertedId });
});

export default apiRoute;
