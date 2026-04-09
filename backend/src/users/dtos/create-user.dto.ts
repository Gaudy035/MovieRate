import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({
    example: 'User123',
    description: 'Unique username',
  })
  @IsString()
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  username!: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Unique email address',
  })
  @IsEmail({}, { message: 'Enter a a valid email' })
  email!: string;

  @ApiProperty({
    example: 'Password123',
    description: 'Password',
    format: 'password',
  })
  @IsString()
  @MinLength(8, { message: 'password must be at least 8 characters' })
  password!: string;
}
