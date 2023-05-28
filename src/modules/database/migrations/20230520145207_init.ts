import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  await knex.schema.createTable('users', (table) => {
    table
      .uuid('id', { primaryKey: true })
      .defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('username').notNullable();
    table.string('email');
  });

  await knex.schema.createTable('links', (table) => {
    table
      .uuid('id', { primaryKey: true })
      .defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('createdById').references('id').inTable('users').notNullable();
    table.timestamp('createdAt', { precision: 6, useTz: true });
    table.string('address');
    table.boolean('isActive').notNullable();
    table.timestamp('expirationDate', { useTz: true });
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('links');
  await knex.schema.dropTableIfExists('users');

  await knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"');
}
