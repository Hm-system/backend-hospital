import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  apolloApiKey: process.env.APOLLO_API_KEY,
}));