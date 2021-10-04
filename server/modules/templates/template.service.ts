import { Template } from 'src/modules/templates/models/template.model';
import {
  CloudinaryService,
  cloudinaryService,
} from '../cloudinary/cloudinaryService';
import {
  ScreenShotService,
  screenShotService,
} from '../screenshot/screenshotService';
import { templateDbService, TemplateDbService } from './template.dbService';

class TemplateService {
  constructor(
    private templateDbService: TemplateDbService,
    private cloudinaryService: CloudinaryService,
    private screenshotService: ScreenShotService,
  ) {}
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
    await this.templateDbService.updateOneFullAction(template._id, {
      $set: { publishedVersion: publishedTemplateData, publicationDate },
      $inc: { version: 1 },
      $push: {
        history: {
          version: (template.version || 0) + 1,
          data: publishedTemplateData,
          publicationDate,
        },
      },
    });
    return await this.findOneById(template._id);
  };

  updateTemplateScreenshot = async (template: Template) => {
    try {
      const screenshotImage = await this.screenshotService.computeUrlAndFetch(
        template._id,
        Template.generateDefaultQueryVariables(template),
      );
      const result = await this.cloudinaryService.upload_stream(
        screenshotImage,
        { folder: 'templates_published' },
      );
      const imageUrl = result.secure_url;
      await this.templateDbService.updateOneFullAction(
        template._id,
        {
          $set: {
            imageUrl,
            'history.$[element].imageUrl': imageUrl,
          },
        },
        { arrayFilters: [{ 'element.version': template.version }] },
      );
    } catch (e) {
      console.error('************ ERROR DURING SCREENSHOT UPDATE ************');
      console.error(e);
    }
  };
}

export const templateService = new TemplateService(
  templateDbService,
  cloudinaryService,
  screenShotService,
);
