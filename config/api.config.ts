import { registerAs } from '@nestjs/config';

export default registerAs('api', () => ({
  apolloApiKey: process.env.APOLLO_API_KEY,
  fireBaseServiceAccount: process.env.FIREBASE_SERVICE_ACCOUNT,
  fireBaseDatabaseUrl: process.env.FIREBASE_DATABASE_URL,
}));
