import { Template } from 'src/modules/templates/models/template.model';
import { templateDbService, TemplateDbService } from './template.dbService';

class TemplateService {
  constructor(private templateDbService: TemplateDbService) {}
  findOneById = async (templateId: string) => {
    const template = await this.templateDbService.getOneById(templateId);
    return template;
  };

  publishTemplate = async (template: Template, host?: string) => {
    const publicationDate = new Date().toISOString();
    const publishedTemplateData = {
      elements: template.elements,
      page: template.page,
    };
    await this.templateDbService.updateOneFullAction(
      template._id,
      {
        $set: { publishedVersion: publishedTemplateData, publicationDate },
        $inc: { version: 1 },
        $push: {
          history: {
            version: (template.version || 0) + 1,
            data: publishedTemplateData,
            publicationDate,
          },
        },
      },
      false,
    );
    return await this.findOneById(template._id);
  };
}

export const templateService = new TemplateService(templateDbService);
