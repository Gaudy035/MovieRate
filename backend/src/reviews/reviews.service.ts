import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { AddReviewDTO } from './dtos/add-review.dto';
import { GetReviewDTO } from './dtos/get-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,
  ) {}

  async getAvg(movie_id: number): Promise<number | null> {
    const avg = await this.reviewsRepository.average('rating', { movie_id });
    return avg ? Number(avg) : null;
  }

  async addReview(
    user_id: number,
    addReviewDTO: AddReviewDTO,
  ): Promise<Review> {
    try {
      const newReview = this.reviewsRepository.create({
        user_id: user_id,
        ...addReviewDTO,
      });
      return await this.reviewsRepository.save(newReview);
    } catch (error: any) {
      if (error.code === '23505') {
        throw new ConflictException('You have already reviewed this movie');
      }
      throw error;
    }
  }

  async getReviews(movie_id: number): Promise<GetReviewDTO[]> {
    const reviews = await this.reviewsRepository.find({
      where: { movie_id },
      relations: ['user'],
      order: { created_at: 'DESC' },
    });

    return reviews.map((review) => {
      const output: GetReviewDTO = {
        review_id: review.review_id,
        username: review.user.username,
        title: review.title,
        body: review.body,
        rating: review.rating,
        created_at: review.created_at,
      };
      return output;
    });
  }
}
