import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @ApiOperation({ summary: 'Returns all movies OR filters by title' })
  @ApiQuery({
    required: false,
    name: 'title',
    description: 'Filters movies by title',
  })
  @ApiResponse({ status: 200, description: 'Returns a list of movies' })
  async getMovies(@Query('title') title?: string) {
    if (title) {
      return this.moviesService.findByTitle(title);
    } else {
      return this.moviesService.findAll();
    }
  }

  @Get(':movie_id')
  @ApiOperation({ summary: 'Returns a movie with matching ID' })
  @ApiResponse({ status: 200, description: 'Returns a movie' })
  @ApiResponse({ status: 404, description: 'Movie not found' })
  async getById(@Param('movie_id', ParseIntPipe) movie_id: number) {
    return this.moviesService.findById(movie_id);
  }
}
