import {
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
