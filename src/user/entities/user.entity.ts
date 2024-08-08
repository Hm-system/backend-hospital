import { Entity, Column } from 'typeorm';
import { BaseEntity as Base } from '../../database/base.entity';
import { ContactDetails } from './contact_details.entity';

export enum GENDER {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum ROLE {
  ADMIN = 'admin',
  MANAGER = 'manager',
  IT = 'IT',
  PATIENT = 'patient',
  DOCTOR = 'doctor',
  NURSE = 'nurse',
  PHARMACIST = 'pharmacist',
  LABORATORIST = 'laboratorist',
  RECEPTIONIST = 'receptionist',
  ACCOUNTANT = 'accountant',
}

@Entity({ name: 'users' })
export class User extends Base {
  @Column({ name: 'first_name', type: 'varchar', length: 100, nullable: false })
  first_name: string;

  @Column({ name: 'last_name', type: 'varchar', length: 100, nullable: false })
  last_name: string;

  @Column({ name: 'firebase_uid', type: 'char', length: 36, nullable: false })
  firebase_uid: string;

  @Column({ name: 'date_of_birth', type: 'date', nullable: false })
  date_of_birth: Date;

  @Column({
    type: 'enum',
    enum: GENDER,
    nullable: false,
  })
  gender: GENDER;

  @Column({
    type: 'enum',
    enum: ROLE,
    default: ROLE.PATIENT,
    nullable: false,
  })
  role: ROLE;

  @Column({
    name: 'is_email_verified',
    type: 'boolean',
    default: false,
    nullable: false,
  })
  is_email_verified: boolean;

  @Column({ name: 'profile_picture', type: 'text', nullable: true })
  profile_picture: string;

  @Column({ name: 'device_token', type: 'varchar', length: 20, nullable: true })
  device_token: string;

  @Column(() => ContactDetails, { prefix: 'contact_' })
  contact_details: ContactDetails;
}
