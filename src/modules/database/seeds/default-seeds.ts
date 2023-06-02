import { User } from '@users/user.model';
import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('visits').del();
  await knex('links').del();
  await knex('devices').del();
  await knex('users').del();

  // Inserts seed entries
  const [user] = (await knex('users')
    .insert({ email: 'dawid@gmail.com', username: 'DawidO', active: true })
    .returning('*')) as User[];
  await knex('links').insert({
    createdById: user.id,
    siteUrl: 'https://www.google.com/',
    shortenedUrl: 'gg',
    is_active: true,
  });
}
