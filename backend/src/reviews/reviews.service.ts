import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { AddReviewDTO } from './dtos/add-review.dto';
import { UsersService } from '../users/users.service';
import { GetReviewDTO } from './dtos/get-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,
    private readonly usersService: UsersService,
  ) {}

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

  async getReviews(movie_id: number): Promise<GetReviewDTO[]> {
    const reviews = await this.reviewsRepository.find({
      where: { movie_id },
      relations: ['user'],
      order: { created_at: 'DESC' },
    });

    return reviews.map((review) => {
      const output: GetReviewDTO = {
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
