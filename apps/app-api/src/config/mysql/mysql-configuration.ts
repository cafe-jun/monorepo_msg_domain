import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.DB_MYSQL_HOST,
  port: process.env.DB_MYSQL_PORT,
  username: process.env.DB_MYSQL_USERNAME,
  password: process.env.DB_MYSQL_PASSWORD,
  database: process.env.DB_MYSQL_DB_SCHEMA,
}));
