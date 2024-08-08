import { Column } from 'typeorm';

export class ContactDetails {
  @Column({ type: 'varchar', length: 20, nullable: false })
  phone_number: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  alternate_phone_number: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  emergency_contact_name: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  emergency_contact_relationship: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  emergency_contact_number: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'text', nullable: true })
  office_address: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  alternate_email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  linkedin_profile: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  telegram_handle: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  personal_website: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  whatsapp_number: string;

  @Column({ type: 'boolean', nullable: true })
  prefers_email: boolean;

  @Column({ type: 'varchar', length: 50, nullable: true })
  preferred_contact_time: string;
}
