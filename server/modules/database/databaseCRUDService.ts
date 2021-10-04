import { ObjectId } from 'bson';
import { UpdateFilter, UpdateOptions } from 'mongodb';
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
    return (await this.getCollection()).findOne<T>({
      _id: new ObjectId(itemId),
    });
  };

  updateOne = async (
    _id: string | ObjectId,
    { _id: _removed, ...data }: Partial<T> & { _id?: string },
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

  updateOneFullAction = async (
    _id: string | ObjectId,
    updateData: UpdateFilter<T>,
    updateOptions: UpdateOptions = {},
  ) => {
    return (await this.getCollection()).updateOne(
      {
        _id: new ObjectId(_id),
      },
      updateData,
      updateOptions,
    );
  };
}
