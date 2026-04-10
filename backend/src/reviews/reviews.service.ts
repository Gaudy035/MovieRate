import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { AddReviewDTO } from './dtos/add-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,
  ) {}

  async getReviews(movie_id: number): Promise<Review[]> {
    return this.reviewsRepository.find({
      where: { movie_id },
      order: { created_at: 'DESC' },
    });
  }

  async getAvg(movie_id: number): Promise<number | null> {
    const avg = await this.reviewsRepository.average('rating', { movie_id });
    return avg ? Number(avg) : null;
  }

  async addReview(
    user_id: number,
    addReviewDTO: AddReviewDTO,
  ): Promise<Review> {
    const newReview = this.reviewsRepository.create({
      user_id: user_id,
      ...addReviewDTO,
    });

    return await this.reviewsRepository.save(newReview);
  }
}
