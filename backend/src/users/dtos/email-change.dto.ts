import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmailChangeDTO {
  @ApiProperty({
    example: 'user@example.com',
    description: 'New email adddress',
  })
  @IsEmail({}, { message: 'Enter a valid email' })
  new_email!: string;

  @ApiProperty({ description: 'User password', format: 'password' })
  @IsString()
  password!: string;
}
