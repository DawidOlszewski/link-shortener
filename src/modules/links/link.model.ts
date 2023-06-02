import { User } from '@users/user.model';
import Objection, { Model } from 'objection';
import { Visit } from './visit.model';

export class Link extends Model {
  id!: string;
  createdById!: string;
  siteUrl!: string;
  shortenedUrl!: string;
  isActive!: boolean;
  expirationDate!: Date;
  createdBy?: User;
  visits?: Visit[];

  get visitsCount() {
    return this.visits?.length;
  }

  static get tableName() {
    return 'links';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['createdById', 'siteUrl', 'shortenedUrl'],

      properties: {
        id: { type: 'string' },
        createdById: { type: 'string' },
        createdAt: { type: ['string', 'null'] }, //TODO: del null
        siteUrl: { type: 'string' },
        shortenedUrl: { type: 'string' },
        isActive: { type: 'boolean', default: true },
        expirationDate: { type: ['string', 'null'] },
      },
    };
  }

  static modifiers = {
    searchByCreator(
      query: Objection.QueryBuilder<Link, Link[]>,
      createdBy: User,
    ) {
      query.where({ createdById: createdBy.id });
    },
  };

  static get virtualAttributes() {
    return ['visitsCount'];
  }

  static get relationMappings() {
    return {
      createdBy: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'links.createdById',
          to: 'users.id',
        },
      },
      visits: {
        relation: Model.HasManyRelation,
        modelClass: Visit,
        join: {
          from: 'links.id',
          to: 'visits.linkId',
        },
      },
    };
  }
}
