import {
  useGenericCreate,
  useGenericRead,
  useGenericUpsert,
} from '../../shared/hooks/generics';
import { Template } from '../models/template.model';

export const useCreateTemplate = () => useGenericCreate<Template>('templates');
export const useGetTemplate = () => useGenericRead<Template>('templates');
export const useUpsertTemplate = () => useGenericUpsert<Template>('templates');
