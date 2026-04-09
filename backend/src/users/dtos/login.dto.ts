import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Users email address',
  })
  @IsEmail({}, { message: 'Enter a valid email' })
  email!: string;

  @ApiProperty({
    example: 'password123',
    description: 'User password',
    format: 'password',
  })
  @IsString()
  password!: string;
}
