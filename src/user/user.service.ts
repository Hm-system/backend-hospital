import {
  Injectable,
  Inject,
  InternalServerErrorException,
  ConflictException,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateUserDto, CreateGoogleUserDto } from './dto/create-user.dto';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App,
  ) {}

  // sigin with email and password
  async createUser(createUserDto: CreateUserDto): Promise<UserRecord> {
    try {
      const userRecord = await this.firebaseAdmin
        .auth()
        .createUser(createUserDto);
      return userRecord; // Return user ID or any other confirmation
    } catch (error) {
      console.error('Error creating user', error);
      // Check for specific Firebase error codes
      if (error.code === 'auth/email-already-exists') {
        this.logger.warn('Email already exists', error.stack);
        throw new ConflictException(
          'Email address already in use. Please use a different email address',
        );
      } else if (error.code === 'auth/invalid-email') {
        this.logger.warn('Invalid email address', error.stack);
        throw new BadRequestException('Invalid email address');
      } else {
        // Handle other errors
        this.logger.error('Error creating user', error.stack);
        throw new InternalServerErrorException('Failed to create user');
      }
    }
  }

  // verify google token
  async verifyGoogleToken(createGoogleUserDto: CreateGoogleUserDto) {
    // if (typeof token !== 'string') {
    //     throw new Error('Token must be a string');
    // }

    try {
      // console.log('token from service', token);
      const decodedToken = await this.firebaseAdmin
        .auth()
        .verifyIdToken(createGoogleUserDto.token);
      console.log('decodedToken', decodedToken);
      return decodedToken;
    } catch (error) {
      console.error('Error verifying Google token', error);
      throw new BadRequestException('Invalid Google token');
    }
  }
}
