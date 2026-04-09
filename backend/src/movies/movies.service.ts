import { Movie } from './entities/movies.entity';
import { Injectable } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async findAll(): Promise<Movie[]> {
    return this.movieRepository.find({
      order: {
        created_at: 'DESC',
      },
    });
  }

  async findById(movie_id: number): Promise<Movie | null> {
    return this.movieRepository.findOne({ where: { movie_id } });
  }

  async findByTitle(title: string): Promise<Movie[]> {
    return this.movieRepository.find({
      where: { title: ILike(`%${title}%`) },
      order: { title: 'DESC' },
    });
  }
}
