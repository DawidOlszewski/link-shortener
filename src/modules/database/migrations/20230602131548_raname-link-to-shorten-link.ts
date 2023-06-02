import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('links', (tb) => {
    tb.renameColumn('link', 'shortenedUrl');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('links', (tb) => {
    tb.renameColumn('shortenedUrl', 'link');
  });
}
