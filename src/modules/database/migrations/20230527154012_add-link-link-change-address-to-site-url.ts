import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('links', (tb) => {
    tb.string('link');
    tb.renameColumn('address', 'siteUrl');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('links', (tb) => {
    tb.dropColumn('link');
    tb.renameColumn('siteUrl', 'address');
  });
}
