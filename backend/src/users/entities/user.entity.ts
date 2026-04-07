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

  @Column({ unique: true })
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password!: string;

  @CreateDateColumn()
  created_at!: Date;
}
