import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('t_reviews')
export class Review {
  @PrimaryGeneratedColumn()
  review_id!: number;

  @Column()
  user_id!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column()
  movie_id!: number;

  @Column({ length: 50, nullable: true })
  title!: string;

  @Column({ type: 'text', nullable: true })
  body!: string;

  @Column()
  rating!: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at!: Date;
}
