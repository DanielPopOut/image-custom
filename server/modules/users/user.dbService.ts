import { User } from 'next-auth';
import { COLLECTIONS } from '../database/COLLECTIONS';
import { DataBaseCrudService } from '../database/databaseCRUDService';

export class UserDbService extends DataBaseCrudService<User> {
  constructor() {
    super(COLLECTIONS.USERS);
    // this.collection = collection;
  }
}

export const userDbService = new UserDbService();
