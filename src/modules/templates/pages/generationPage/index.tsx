import { Template } from '../../models/template.model';
import { UpdateTemplateWithParams } from './UpdateTemplateWithParams';

export const GeneratorPage = ({ initialData }: { initialData: Template }) => {
  return <UpdateTemplateWithParams template={initialData} />;
};
