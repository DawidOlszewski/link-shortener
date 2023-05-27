import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('devices', (table) => {
    table.uuid('id', { primaryKey: true });
    table.string('ip').unique();
    table.string('mac').unique();
    table.uuid('userId').references('id').inTable('users');
  });

  await knex.schema.createTable('visits', (table) => {
    table.uuid('id', { primaryKey: true });
    table.uuid('linkId').references('id').inTable('links').notNullable();
    table.uuid('deviceId').references('id').inTable('devices').notNullable();
    table.string('location');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('visits');
  await knex.schema.dropTableIfExists('devices');
}
