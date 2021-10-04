import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { COLLECTIONS_TYPE } from 'server/modules/database/COLLECTIONS';
import { DataBaseCrudService } from 'server/modules/database/databaseCRUDService';
import { ApiResponseSuccess } from 'server/shared/ApiResponseFormat';
import {
  basicConnexionHandler,
  computeDefaultFilter,
  computeDefaultInsertFields,
} from 'server/shared/config/apiRoutesConfig';
import { NextApiRequestWithUserInfo } from 'server/shared/isAuthenticated';

const apiRoute = nextConnect();

apiRoute.use(basicConnexionHandler);

apiRoute.post(async (req: NextApiRequestWithUserInfo, res: NextApiResponse) => {
  const collection = req.query.collection as string;
  const data = req.body;

  const defaultFields = computeDefaultInsertFields({
    connectedUser: req.connectedUser,
  });

  const itemToInsert = { ...data, ...defaultFields };
  const insertedValue = await new DataBaseCrudService(collection).insertOne(
    itemToInsert,
  );
  res.json(
    ApiResponseSuccess({ ...itemToInsert, _id: insertedValue.insertedId }),
  );
});

apiRoute.get(async (req: NextApiRequestWithUserInfo, res: NextApiResponse) => {
  const collection = req.query.collection as COLLECTIONS_TYPE;
  const filter = computeDefaultFilter({
    connectedUser: req.connectedUser,
    collection,
    action: 'getMany',
  });

  const arrayResult = await new DataBaseCrudService(collection).getAll(filter);
  res.json(ApiResponseSuccess(arrayResult));
});

export default apiRoute;
