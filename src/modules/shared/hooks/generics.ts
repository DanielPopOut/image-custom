import { useAsyncFn } from 'react-use';
import { ApiResponseFormat } from '../../../../server/shared/ApiResponseFormat';

const BASIC_ROUTES = {
  CREATE: (collection: string) => `/api/data/${collection}`,
  GET_MANY: (collection: string) => `/api/data/${collection}`,
  READ: (collection: string, elementId: string) =>
    `/api/data/${collection}/${elementId}`,
  UPDATE: (collection: string, elementId: string) =>
    `/api/data/${collection}/${elementId}`,
  UPSERT: (collection: string, elementId: string) =>
    `/api/data/${collection}/${elementId}?upsert=true`,
  DELETE: (collection: string, elementId: string) =>
    `/api/data/${collection}/${elementId}`,
};

export const useGenericCreate = <T>(collection: string) => {
  return useAsyncFn((data) => {
    return fetch(BASIC_ROUTES.CREATE(collection), {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    }).then((data) => basicResultHandler<T>(data)) as Promise<T>;
  }, null);
};

export const useGenericRead = <T>(collection: string) => {
  return useAsyncFn((elementId: string) => {
    return fetch(BASIC_ROUTES.READ(collection, elementId), {
      method: 'GET',
    }).then((data) => basicResultHandler<T>(data)) as Promise<T>;
  }, null);
};

export const useGenericUpdate = <T>(collection: string) => {
  return useAsyncFn((elementId: string, data) => {
    return fetch(BASIC_ROUTES.UPDATE(collection, elementId), {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    }).then((data) => basicResultHandler<T>(data)) as Promise<T>;
  }, null);
};

export const useGenericUpsert = <T>(collection: string) => {
  return useAsyncFn((elementId: string, data) => {
    return fetch(BASIC_ROUTES.UPSERT(collection, elementId), {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    }).then((data) => basicResultHandler<T>(data)) as Promise<T>;
  }, null);
};

export const useGenericDelete = <T>(collection: string) => {
  return useAsyncFn((elementId: string) => {
    return fetch(BASIC_ROUTES.DELETE(collection, elementId), {
      method: 'DELETE',
    }).then((data) => basicResultHandler<T>(data)) as Promise<T>;
  }, null);
};

export const useGenericGetAll = <T>(collection: string) => {
  return useAsyncFn(
    () => {
      return fetch(BASIC_ROUTES.GET_MANY(collection)).then((data) =>
        basicResultHandler<T[]>(data),
      ) as Promise<T[]>;
    },
    null,
    { value: [], loading: false },
  );
};

const basicResultHandler = async <T>(res: Response): Promise<T> => {
  if (res.status >= 400) {
    let resData = 'unknown error';
    try {
      resData = await res.json();
    } catch (error) {
      resData = await res.text();
      console.error({ e: error, resData });
      throw Error('unknown error not in json format');
    }
    console.error(resData);
    throw Error(JSON.stringify(resData));
  }
  const result = (await res.json()) as ApiResponseFormat<T>;
  if (result.success === false) {
    console.error({ error: 'received result with bad formatting', ...result });
    throw Error(result.error || 'no success but no error');
  }
  return result.data;
};
