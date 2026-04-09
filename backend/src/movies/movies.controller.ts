import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async getMovies(@Query('title') title?: string) {
    if (title) {
      return this.moviesService.findByTitle(title);
    } else {
      return this.moviesService.findAll();
    }
  }

  @Get(':movie_id')
  async getById(@Param('movie_id', ParseIntPipe) movie_id: number) {
    return this.moviesService.findById(movie_id);
  }
}
