import { Movie } from './movies.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async findall(): Promise<Movie[]> {
    return await this.movieRepository.find({
      order: {
        created_at: 'DESC',
      },
    });
  }
}
