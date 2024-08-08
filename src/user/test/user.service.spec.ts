import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
// import * as admin from 'firebase-admin';
import {
  InternalServerErrorException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';

const mockFirebaseAdmin = {
  auth: jest.fn().mockReturnThis(),
  createUser: jest.fn(),
  verifyIdToken: jest.fn(),
};
describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'FIREBASE_ADMIN',
          useValue: mockFirebaseAdmin,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a user record when createUser is called', async () => {
    const mockUserRecord = { uid: '123', email: 'test@example.com' }; // mock user record

    mockFirebaseAdmin.createUser.mockResolvedValue(mockUserRecord); // mock the return value of createUser

    const createUserDto = { email: 'test@example.com', password: 'password' }; // mock create user dto

    const result = await service.createUser(createUserDto); // call createUser

    expect(result).toEqual(mockUserRecord); // assert the result
    expect(mockFirebaseAdmin.createUser).toHaveBeenCalledWith(createUserDto); // assert the createUser method was called with the create user dto
  });

  it('should throw a conflict error when email already exists', async () => {
    mockFirebaseAdmin.createUser.mockRejectedValue({
      code: 'auth/email-already-exists',
    });

    const createUserDto = { email: 'test@example.com', password: 'password' };

    await expect(service.createUser(createUserDto)).rejects.toThrow(
      ConflictException,
    );
    expect(mockFirebaseAdmin.createUser).toHaveBeenCalledWith(createUserDto);
  });

  it('should throw a badrequest exception for an invalid email', async () => {
    mockFirebaseAdmin.createUser.mockRejectedValue({
      code: 'auth/invalid-email',
    });

    const createUserDto = { email: 'invalid-email', password: 'password' };

    await expect(service.createUser(createUserDto)).rejects.toThrow(
      BadRequestException,
    );
    expect(mockFirebaseAdmin.createUser).toHaveBeenCalledWith(createUserDto);
  });

  it('should throw InternalServerErrorException for other errors', async () => {
    mockFirebaseAdmin.createUser.mockRejectedValue(new Error('Unknown error'));

    const createUserDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    await expect(service.createUser(createUserDto)).rejects.toThrow(
      InternalServerErrorException,
    );
    expect(mockFirebaseAdmin.createUser).toHaveBeenCalledWith(createUserDto);
  });

  it('should return the verified user from the token', async () => {
    const mockDecodedToken = { uid: '123', email: 'test@example.com' }; // mock user record

    mockFirebaseAdmin.verifyIdToken.mockResolvedValue(mockDecodedToken);

    const createGoogleUserDto = { token: 'valid-token' };

    const result = await service.verifyGoogleToken(createGoogleUserDto);

    expect(result).toEqual(mockDecodedToken);
    expect(mockFirebaseAdmin.verifyIdToken).toHaveBeenCalledWith('valid-token');
  });

  it('should return BadRequestException for a invalid google token', async () => {
    const createGoogleUserDto = { token: 'invalid-token' };

    mockFirebaseAdmin.verifyIdToken.mockRejectedValue(
      new Error('Invalid Google token'),
    );

    await expect(
      service.verifyGoogleToken(createGoogleUserDto),
    ).rejects.toThrow(BadRequestException);
    expect(mockFirebaseAdmin.verifyIdToken).toHaveBeenCalledWith(
      'invalid-token',
    );
  });
});
