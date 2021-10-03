import { Template } from 'src/modules/templates/models/template.model';
import { COLLECTIONS } from '../database/COLLECTIONS';
import { DataBaseCrudService } from '../database/databaseCRUDService';

export class TemplateDbService extends DataBaseCrudService<Template> {
  constructor() {
    super(COLLECTIONS.TEMPLATES);
    // this.collection = collection;
  }
}

export const templateDbService = new TemplateDbService();
