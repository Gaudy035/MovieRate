import { Controller, Get } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesCotroller {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('getAll')
  async getMovies() {
    return await this.moviesService.findall();
  }
}
