import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('t_movies')
export class Movie {
  @PrimaryGeneratedColumn()
  movie_id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  poster_url!: string;

  @Column()
  release_year!: number;

  @Column()
  duration!: number;

  @CreateDateColumn()
  created_at!: Date;

  average_rating?: number | null;
}
