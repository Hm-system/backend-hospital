import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import serverConfig from 'config/server.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { LoggerModule } from 'nestjs-pino';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { schema } from './graphql/schema-merge';
import apiConfig from 'config/api.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import dataSource from './database/data-source';
import { HealthModule } from './health/health.module';
import { FirebaseModule } from './firebase/firebase.module';
import { UserModule } from './user/user.module';

const envFile = process.env.NODE_ENV
  ? `.env.${process.env.NODE_ENV}`
  : '.env.development';

@Module({
  imports: [
    // config module
    ConfigModule.forRoot({
      isGlobal: true,
      load: [serverConfig, apiConfig],
      envFilePath: [envFile],

      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .required(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    // logger module
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.LOG_LEVEL || 'info',
        redact: [
          'req.headers.authorization',
          'req.body.password',
          'res.headers["set-cookie"]',
        ],
      },
    }),
    // graphql module
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      driver: ApolloDriver,
      useFactory: async (configService: ConfigService) => ({
        driver: ApolloDriver,
        schema,
        playground: true,
        installSubscriptionHandlers: true,
        introspection: true,
        engine: {
          apiKey: configService.get<string>('api.apolloApiKey'),
        },
      }),
    }),
    // typeorm module
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        ...dataSource.options,
      }),
      dataSourceFactory: async () => dataSource,
    }),
    HealthModule,
    FirebaseModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
