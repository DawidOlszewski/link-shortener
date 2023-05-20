import { Model } from 'objection';

export class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'username'],

      properties: {
        id: { type: 'integer' }, //TODO: uuid
        username: { type: 'string' },
        email: { type: 'string' },
        active: { type: 'boolean', default: false },
      },
    };
  }
}
