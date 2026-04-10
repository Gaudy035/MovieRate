import { Movie } from './entities/movies.entity';
import { Injectable } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewsService } from '../reviews/reviews.service';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    private readonly reviewsService: ReviewsService,
  ) {}

  async findAll(): Promise<Movie[]> {
    const movies = await this.movieRepository.find({
      order: {
        created_at: 'DESC',
      },
    });

    await Promise.all(
      movies.map(async (movie) => {
        const avg = await this.reviewsService.getAvg(movie.movie_id);
        movie.average_rating = avg;
      }),
    );

    return movies;
  }

  async findById(movie_id: number): Promise<Movie | null> {
    let movie = await this.movieRepository.findOne({ where: { movie_id } });
    if (movie) {
      const avg = await this.reviewsService.getAvg(movie.movie_id);
      movie.average_rating = avg;
    }
    return movie;
  }

  async findByTitle(title: string): Promise<Movie[]> {
    const movies = await this.movieRepository.find({
      where: { title: ILike(`%${title}%`) },
      order: { title: 'DESC' },
    });

    await Promise.all(
      movies.map(async (movie) => {
        const avg = await this.reviewsService.getAvg(movie.movie_id);
        movie.average_rating = avg;
      }),
    );

    return movies;
  }
}
