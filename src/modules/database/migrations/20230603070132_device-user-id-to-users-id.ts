import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('devices', (tb) => {
    tb.dropColumn('userId');
    tb.string('usersId');
  });
} //losing uuids here

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('devices', (tb) => {
    tb.dropColumn('usersId');
    tb.uuid('userId').references('id').inTable('users');
  });
}
