import { NextApiResponse } from 'next';
import { COLLECTIONS_TYPE } from 'server/modules/database/COLLECTIONS';
import { User } from 'server/modules/users/user.model';
import {
  authenticationHandler,
  NextApiRequestWithUserInfo,
} from '../isAuthenticated';
import { ACTION_TYPES } from './ACTION_TYPES';

export const apiRoutesConfig: Partial<
  Record<
    COLLECTIONS_TYPE,
    {
      default: { shouldBeConnected?: boolean };
    } & Partial<Record<ACTION_TYPES, Filters>>
  >
> = {
  templates: {
    default: { shouldBeConnected: true },
    getMany: {
      shouldBeCreator: true,
    },
    updateOne: {
      fieldsToUpdate: ['page', 'elements'],
    },
  },
};

type Filters = {
  shouldBeCreator?: boolean;
  fieldsToUpdate?: string[];
};

export const computeDefaultFilter = ({
  connectedUser,
  collection,
  action,
}: {
  connectedUser?: User;
  collection: COLLECTIONS_TYPE;
  action: ACTION_TYPES;
}) => {
  const filterParams = apiRoutesConfig[collection]?.[action];
  const filter: { creatorId?: string } = {};
  if (filterParams.shouldBeCreator) {
    if (!connectedUser?.id) {
      const errorMessage = `No connected user on collection ${collection} - action ${action}`;
      console.error(errorMessage);
      throw Error(errorMessage);
    }
    filter.creatorId = connectedUser?.id; //fake default value for security
  }
  return filter;
};

export const computeDefaultInsertFields = ({
  connectedUser,
  collection,
  action,
}: {
  connectedUser?: User;
  collection?: COLLECTIONS_TYPE;
  action?: ACTION_TYPES;
}) => {
  let defaultInsertFields: { dateCreation: string; creatorId?: string } = {
    dateCreation: new Date().toISOString(),
  };
  if (connectedUser) {
    defaultInsertFields.creatorId = connectedUser.id;
  }
  return defaultInsertFields;
};

export const computeDefaultUpdateFields = ({
  connectedUser,
  collection,
  elementToUpdate,
}: {
  connectedUser?: User;
  collection?: COLLECTIONS_TYPE;
  elementToUpdate?: Record<string, string>;
}) => {
  const updateFilters = apiRoutesConfig[collection]?.updateOne;
  if (updateFilters.fieldsToUpdate) {
    return updateFilters.fieldsToUpdate.reduce((finalObj, field) => {
      finalObj[field] = elementToUpdate[field];
      return finalObj;
    }, {});
  }
};

export const basicConnexionHandler = async (
  req: NextApiRequestWithUserInfo,
  res: NextApiResponse,
  next,
) => {
  const collection = req.query.collection as string;
  const defaultConfig = apiRoutesConfig[collection]?.default;
  if (defaultConfig?.shouldBeConnected) {
    authenticationHandler(req, res, next);
    return;
  }
  next();
};
