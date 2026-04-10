import {
  IsString,
  IsNumber,
  MaxLength,
  IsInt,
  IsOptional,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddReviewDTO {
  @ApiProperty({ description: 'Movie ID' })
  @IsInt()
  movie_id!: number;

  @ApiPropertyOptional({ example: 'review title', description: 'Review title' })
  @IsOptional()
  @IsString()
  @MaxLength(50, { message: 'Title acnt exceed 50 characters' })
  title!: string;

  @ApiPropertyOptional({ description: 'Review body' })
  @IsOptional()
  @IsString()
  body!: string;

  @ApiProperty({ example: 5, description: 'Rating score (1-10)' })
  @IsNumber()
  @Min(1)
  @Max(10)
  rating!: number;
}
