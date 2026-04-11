import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Movie } from '../../movies/entities/movies.entity';

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

  @ManyToOne(() => Movie)
  @JoinColumn({ name: 'movie_id' })
  movie!: Movie;

  @Column({ length: 50, nullable: true })
  title!: string;

  @Column({ type: 'text', nullable: true })
  body!: string;

  @Column()
  rating!: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at!: Date;
}
