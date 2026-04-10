import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), AuthModule],
  exports: [ReviewsService],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
