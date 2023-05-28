import { User } from '@users/user.model';
import { Model } from 'objection';

export class Link extends Model {
  id!: string;
  createdById!: string;
  siteUrl!: string;
  link!: string;
  isActive!: boolean;
  expirationDate!: Date;
  createdBy?: User;

  static get tableName() {
    return 'links';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['createdById', 'siteUrl', 'link'],

      properties: {
        id: { type: 'string' },
        createdById: { type: 'string' },
        createdAt: { type: 'string' }, //format: 'date-time'
        siteUrl: { type: 'string' },
        link: { type: 'string' },
        isActive: { type: 'boolean', default: true },
        expirationDate: { type: 'string' }, //format: 'date-time'
      },
    };
  }

  static get relationMappings() {
    return {
      createdBy: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'link.createdById',
          to: 'user.id',
        },
      },
    };
  }
}
