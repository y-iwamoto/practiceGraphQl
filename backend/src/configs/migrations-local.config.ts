import { DataSource, DataSourceOptions } from 'typeorm';

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_DATABASE || 'db',
  migrations: ['src/db/migrations/*{.ts,.js}'],
  entities: ['src/**/*.entity{.ts,.js}'],
  logging: process.env.DB_LOG === 'true',
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
