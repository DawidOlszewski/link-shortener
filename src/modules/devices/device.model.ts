import { User } from '@users/user.model';
import { Model } from 'objection';

export class Device extends Model {
  static get tableName() {
    return 'devices';
  }

  static get relationalMapping() {
    return {
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'device.userId',
          to: 'user.id',
        },
      },
    };
  }
}
