import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import cors from '@fastify/cors';
import { HealthService } from './health/health.service';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const logger = app.get(Logger);

  // Register the global exception filter
  app.useGlobalFilters(new AllExceptionsFilter());

  // Register the logger
  app.useLogger(logger);

  app.useGlobalPipes(
    new ValidationPipe({
      // transform: true,
      // whitelist: true,
      // forbidNonWhitelisted: true,
    }),
  );

  // Initialize the health service
  const healthService = app.get(HealthService);
  const health = await healthService.checkHealth();

  if (health.status === 'ERROR') {
    logger.error('Server failed to start', health.message);
    process.exit(1);
  }

  // Configure CORS
  app.register(cors, {
    origin: ['https://studio.apollographql.com', '*'], // Allow Apollo Studio and any other origins
    credentials: true, // Allow cookies to be sent and received
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  });

  app.setGlobalPrefix('api/v1', {
    exclude: ['/', 'status', 'api', 'api/v1', 'api/docs'],
  });

  // set up swagger
  const config = new DocumentBuilder()
    .setTitle('Hospital System API')
    .setDescription('API documentation for the Hospital Management System')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = app.get<ConfigService>(ConfigService).get<number>('server.port');

  const nodeEnv = app
    .get<ConfigService>(ConfigService)
    .get<string>('server.nodeEnv');

  await app.listen(port, '0.0.0.0');

  logger.log({
    message: 'server started',
    port,
    nodeEnv,
    serverUrl: `http://localhost:${port}/api/v1`,
    swaggerUrl: `http://localhost:${port}/api/docs`,
    apolloUrl: `http://localhost:${port}/graphql`,
  });
}
bootstrap();
