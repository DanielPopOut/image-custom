import { ObjectId } from 'bson';

export class User {
  _id: ObjectId;
  id: string;
  name?: string | null;
  email: string | null;
  image?: string | null;
  templateIds?: string[];
}
