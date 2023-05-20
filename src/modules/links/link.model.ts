import { User } from '@users/user.model';
import { Model } from 'objection';

export class Link {
  static get tableName() {
    return 'links';
  }

  static get relationMappings() {
    return {
      createdBy: {
        relation: Model.HasManyRelation,
        modelClass: User,
        join: {
          from: 'link.createdById',
          to: 'user.id',
        },
      },
    };
  }
}
