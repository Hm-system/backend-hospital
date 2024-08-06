import { registerAs } from '@nestjs/config';

export default registerAs('api-key', () => ({
  apolloApiKey: process.env.APOLLO_API_KEY,
}));
