import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('links', (tb) => {
    tb.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now());
  });

  await knex.schema.alterTable('users', (tb) => {
    tb.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now());
  });

  await knex.schema.alterTable('visits', (tb) => {
    tb.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now());
  });

  await knex.schema.alterTable('devices', (tb) => {
    tb.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('links', (tb) => {
    tb.dropColumn('createdAt');
  });

  await knex.schema.alterTable('users', (tb) => {
    tb.dropColumn('createdAt');
  });

  await knex.schema.alterTable('visits', (tb) => {
    tb.dropColumn('createdAt');
  });

  await knex.schema.alterTable('devices', (tb) => {
    tb.dropColumn('createdAt');
  });
}
