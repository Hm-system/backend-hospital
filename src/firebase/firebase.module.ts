import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FirebaseService } from './firebase.service';
import * as admin from 'firebase-admin';

@Global()
@Module({
  imports: [ConfigModule], // Import the ConfigModule
  providers: [
    {
      provide: 'FIREBASE_ADMIN', // The name of the provider
      useFactory: async (configService: ConfigService) => {
        const fireBaseServiceAccount = configService.get<string>(
          'api.fireBaseServiceAccount',
        );
        const serviceAccount = JSON.parse(fireBaseServiceAccount); // Parse the service account JSON string
        return admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          databaseURL: configService.get<string>('api.fireBaseDatabaseUrl'),
        });
      },
      inject: [ConfigService], // Inject the ConfigService
    },
    FirebaseService,
  ],
  exports: ['FIREBASE_ADMIN'],
})
export class FirebaseModule {}
