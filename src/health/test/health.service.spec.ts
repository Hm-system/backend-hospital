import { Test, TestingModule } from '@nestjs/testing';
import { HealthService } from './../health.service';
import { DataSource } from 'typeorm';

// creae a mock class for DataSource
class MockDataSource {
  query = jest.fn();
}

describe('HealthService', () => {
  let service: HealthService;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthService,
        { provide: DataSource, useClass: MockDataSource },
      ],
    }).compile();

    service = module.get<HealthService>(HealthService);
    dataSource = module.get<DataSource>(DataSource);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return OK if database connection is successful', async () => {
    (dataSource.query as jest.Mock).mockResolvedValueOnce([]);
    const result = await service.checkHealth();
    expect(result).toEqual({
      status: 'OK',
      message: 'All systems are operational',
    });
  });

  it('should return ERROR if database connection fails', async () => {
    (dataSource.query as jest.Mock).mockRejectedValueOnce(
      new Error('Database connection failed'),
    );
    const result = await service.checkHealth();
    expect(result).toEqual({
      status: 'ERROR',
      message: 'Database connection failed',
    });
  });
});
