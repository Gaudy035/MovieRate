import {
  ApiResponse,
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { AddReviewDTO } from './dtos/add-review.dto';
import { ReviewsService } from './reviews.service';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get(':movie_id')
  @ApiOperation({ summary: 'Returns all reviews for the movie' })
  @ApiResponse({ status: 200, description: 'Returns reviews' })
  async getByMovieId(@Param('movie_id', ParseIntPipe) movie_id: number) {
    return this.reviewsService.getReviews(movie_id);
  }

  //   @Get('avg/:movie_id')
  //   async getAvg(@Param('movie_id', ParseIntPipe) movie_id: number) {
  //     return this.reviewsService.getAvg(movie_id);
  //   }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('add')
  @ApiOperation({ summary: 'Adds new review' })
  @ApiResponse({ status: 201 })
  async addReview(@Req() req: any, @Body() reviewDTO: AddReviewDTO) {
    const userId = req.user.sub;
    return this.reviewsService.addReview(userId, reviewDTO);
  }
}
