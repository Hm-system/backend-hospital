import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// This is the base entity that all other entities will extend from. It contains the id, createdAt, and updatedAt fields.
export class BaseEntity {
  @ApiProperty({
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    description: 'Unique identifier of the user',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: '2021-09-01T00:00:00.000Z',
    description: 'Date of creation of the user',
  })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    example: '2021-09-01T00:00:00.000Z',
    description: 'Date of the last update of the user',
  })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
