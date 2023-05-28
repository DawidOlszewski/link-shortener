import { Model } from 'objection';

export class User extends Model {
  id!: string;
  username!: string;
  email!: string;
  active!: boolean;

  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'username'],

      properties: {
        id: { type: 'string' },
        username: { type: 'string' },
        email: { type: 'string' },
        active: { type: 'boolean', default: false },
      },
    };
  }
}
