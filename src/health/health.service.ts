import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class HealthService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async checkDatabase(): Promise<boolean> {
    try {
      await this.dataSource.query('SELECT 1'); // Simple query to test connection
      return true;
    } catch (error) {
      console.error('Database connection failed', error);
      return false;
    }
  }

  async checkHealth(): Promise<{ status: string; message: string }> {
    const dbStatus = await this.checkDatabase();
    if (dbStatus) {
      return { status: 'OK', message: 'All systems are operational' };
    } else {
      return { status: 'ERROR', message: 'Database connection failed' };
    }
  }
}
