import { COLLECTIONS_TYPE } from 'server/modules/database/COLLECTIONS';
import { User } from 'server/modules/users/user.model';
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
  },
};

type Filters = {
  shouldBeCreator?: boolean;
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
