import { Injectable, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App,
  ) {}

  // get firebase user by uid
  async getUser(uid: string): Promise<admin.auth.UserRecord> {
    return this.firebaseAdmin.auth().getUser(uid);
  }
}
