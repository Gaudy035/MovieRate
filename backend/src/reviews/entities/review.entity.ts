import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('t_reviews')
export class Review {
  @PrimaryGeneratedColumn()
  review_id!: number;

  @Column()
  user_id!: number;

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
