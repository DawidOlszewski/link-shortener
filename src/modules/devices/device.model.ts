import { User } from '@users/user.model';
import { Model } from 'objection';

export class Device extends Model {
  id!: string;
  ip!: string;
  userId?: string;
  owner?: User;

  static get tableName() {
    return 'devices';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['ip'],
      properties: {
        id: { type: 'string' },
        ip: { type: 'string' },
        userId: { type: ['string', 'null'] },
      },
    };
  }

  static get relationalMapping() {
    return {
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'devices.userId',
          to: 'user.id',
        },
      },
    };
  }
}
