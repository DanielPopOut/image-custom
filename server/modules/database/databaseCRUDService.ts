import { ObjectId } from 'bson';
import { getDb } from './database';

export class DataBaseCrudService<T> {
  collection: string;
  constructor(collection: string) {
    this.collection = collection;
  }

  getCollection = async () => {
    return (await getDb()).collection(this.collection);
  };

  getAll = async (filter: Partial<T>) => {
    return (await this.getCollection()).find(filter).toArray();
  };

  insertOne = async (data: T) => {
    return (await this.getCollection()).insertOne(data);
  };

  getOneById = async (itemId: string) => {
    return (await this.getCollection()).findOne({ _id: new ObjectId(itemId) });
  };

  updateOne = async (
    _id,
    { _id: _removed, ...data }: Partial<T> & { _id: string },
    upsert?: boolean,
  ) => {
    return (await this.getCollection()).updateOne(
      {
        _id: new ObjectId(_id),
      },
      { $set: data },
      { upsert: upsert },
    );
  };
}
