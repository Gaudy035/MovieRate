import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetReviewDTO {
  @ApiProperty({ description: 'Review ID' })
  review_id!: number;

  @ApiProperty({ description: 'Review author' })
  username!: string;

  // @ApiProperty({ description: 'Reviewed movie title' })
  // movie_title!: string;

  @ApiPropertyOptional({ description: 'Review title' })
  title?: string;

  @ApiPropertyOptional({ description: 'Review body' })
  body?: string;

  @ApiProperty({ description: 'Review rating' })
  rating!: number;

  @ApiProperty({ description: 'Date of creation' })
  created_at!: Date;
}
