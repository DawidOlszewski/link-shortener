import { knexSnakeCaseMappers } from 'objection';

const dbConfig = {
  client: 'sqlite3',
  connection: './example.sqlite',
  migrations: {
    directory: 'migrations',
  },
  useNullAsDefault: true,
  ...knexSnakeCaseMappers(),
};

export default dbConfig;
