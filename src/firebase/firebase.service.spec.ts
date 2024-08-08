import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseService } from './firebase.service';

const mockFirebaseAdmin = {
  auth: jest.fn().mockReturnThis(),
  getUser: jest.fn(),
};

describe('FirebaseService', () => {
  let service: FirebaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FirebaseService,
        { provide: 'FIREBASE_ADMIN', useValue: mockFirebaseAdmin },
      ],
    }).compile();

    service = module.get<FirebaseService>(FirebaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a user record when getUser is called', async () => {
    const mockUid = 'user123';
    const mockUserRecord = { uid: mockUid, email: 'user@example.com' };

    mockFirebaseAdmin.getUser.mockResolvedValue(mockUserRecord);

    const userRecord = await service.getUser(mockUid);

    expect(userRecord).toEqual(mockUserRecord);
    expect(mockFirebaseAdmin.getUser).toHaveBeenCalledWith(mockUid);
  });

  it('should throw an error when getUser is called with an invalid uid', async () => {
    const mockUid = 'invalidUid';
    const mockError = new Error('User not found');

    mockFirebaseAdmin.getUser.mockRejectedValue(mockError);

    await expect(service.getUser(mockUid)).rejects.toThrow(mockError);
  });
});
