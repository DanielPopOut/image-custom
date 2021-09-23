import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { DataBaseCrudService } from '../../../../server/modules/database/databaseCRUDService';

const apiRoute = nextConnect();

apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const collection = req.query.collection as string;
  const elementId = req.query.elementId as string;

  const elementFound = await new DataBaseCrudService(collection).getOneById(
    elementId,
  );
  res.json(elementFound);
});

apiRoute.put(async (req: NextApiRequest, res: NextApiResponse) => {
  const collection = req.query.collection as string;
  const elementId = req.query.elementId as string;
  const data = req.body;
  const elementFound = await new DataBaseCrudService(collection).updateOne(
    elementId,
    data,
    !!(req.query.upsert as string),
  );
  res.json(elementFound);
});

export default apiRoute;
