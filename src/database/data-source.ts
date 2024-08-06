import { DataSource, DataSourceOptions } from "typeorm";
import { getEnv } from "src/utils/config.utils";


const isDevelopment = getEnv('NODE_ENV') === 'development';

const config: DataSourceOptions = {
    type: 'postgres',
    url: getEnv('DATABASE_URL'),
    synchronize: isDevelopment,
    logging: isDevelopment,
    ssl: isDevelopment ? false : { rejectUnauthorized: true },
    entities: [__dirname + '/database/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/database/migrations/**/*{.ts,.js}'],
    extra: {
        max: 10,
        min: 1,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 20000

    }
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
