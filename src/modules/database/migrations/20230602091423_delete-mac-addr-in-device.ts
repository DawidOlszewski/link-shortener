import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('devices', (tb) => {
    tb.dropColumn('mac');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('devices', (tb) => {
    tb.string('mac');
  });
}
