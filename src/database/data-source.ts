import { DataSource, DataSourceOptions } from 'typeorm';
import { getEnv } from 'src/utils/config.utils';
import { join } from 'path';

const isDevelopment = getEnv('NODE_ENV') === 'development';
console.log('isDevelopment', isDevelopment);
console.log('__dirname', __dirname);
console.log(join(__dirname, '../**/*.entity{.ts,.js}'));
const config: DataSourceOptions = {
  type: 'postgres',
  url: getEnv('DATABASE_URL'),
  synchronize: isDevelopment,
  logging: isDevelopment,
  ssl: isDevelopment ? false : { rejectUnauthorized: true },
  entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  extra: {
    max: 10,
    min: 1,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 20000,
  },
};

const dataSource = new DataSource(config); // Create a new data source

// Initialize the data source
export async function initializeDataSource() {
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }
  return dataSource;
}

export default dataSource;
