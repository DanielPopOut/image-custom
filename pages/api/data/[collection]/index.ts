import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { COLLECTIONS_TYPE } from 'server/modules/database/COLLECTIONS';
import { DataBaseCrudService } from 'server/modules/database/databaseCRUDService';
import { ApiResponseSuccess } from 'server/shared/ApiResponseFormat';
import {
  apiRoutesConfig,
  computeDefaultFilter,
} from 'server/shared/config/apiRoutesConfig';
import {
  authenticationHandler,
  NextApiRequestWithUserInfo,
} from 'server/shared/isAuthenticated';

const apiRoute = nextConnect();

apiRoute.use(
  async (req: NextApiRequestWithUserInfo, res: NextApiResponse, next) => {
    const collection = req.query.collection as string;
    const defaultConfig = apiRoutesConfig[collection]?.default;
    if (defaultConfig?.shouldBeConnected) {
      authenticationHandler(req, res, next);
      return;
    }
    next();
  },
);

apiRoute.post(async (req: NextApiRequestWithUserInfo, res: NextApiResponse) => {
  const collection = req.query.collection as string;
  const data = req.body;

  const insertedValue = await new DataBaseCrudService(collection).insertOne(
    data,
  );
  res.json(ApiResponseSuccess({ ...data, _id: insertedValue.insertedId }));
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
