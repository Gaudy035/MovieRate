import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from '@nestjs/class-transformer';

@Entity('t_users')
export class User {
  @PrimaryGeneratedColumn()
  user_id!: number;

  @Column({ unique: true, length: 50 })
  username!: string;

  @Column({ unique: true, length: 255 })
  email!: string;

  @Column({ length: 255 })
  @Exclude({ toPlainOnly: true })
  password!: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at!: Date;
}
