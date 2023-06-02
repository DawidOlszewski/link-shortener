import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('devices', (tb) =>
    tb.string('ip').alter().notNullable(),
  );
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('devices', (tb) =>
    tb.string('ip').alter().nullable(),
  );
}
