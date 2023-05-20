import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.uuid('id', { primaryKey: true });
    table.string('username').notNullable();
    table.string('email').unique();
  });

  await knex.schema.createTable('links', (table) => {
    table.uuid('id', { primaryKey: true });
    table.uuid('createdById').references('id').inTable('users').notNullable();
    table.timestamp('createdAt', { precision: 6, useTz: true });
    table.string('address').unique();
    table.boolean('isActive').notNullable();
    table.timestamp('expirationDate', { useTz: true });
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('links');
  await knex.schema.dropTableIfExists('users');
}
