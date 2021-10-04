import { useAsyncFn } from 'react-use';
import { API_ROUTES } from 'src/modules/shared/routes/ROUTES';
import {
  basicResultHandler,
  useGenericCreate,
  useGenericGetAll,
  useGenericRead,
  useGenericUpdate,
} from '../../shared/hooks/generics';
import { Template } from '../models/template.model';

export const useCreateTemplate = () => useGenericCreate<Template>('templates');
export const useGetTemplate = () => useGenericRead<Template>('templates');
export const useUpdateTemplate = () => useGenericUpdate<Template>('templates');
export const useGetAllTemplates = () => useGenericGetAll<Template>('templates');
export const usePublishTemplate = () => {
  return useAsyncFn((elementId: string) => {
    return fetch(API_ROUTES.PUBLISH_TEMPLATE(elementId)).then((data) =>
      basicResultHandler(data),
    );
  });
};
