import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PasswordChangeDTO {
  @ApiProperty({
    format: 'password',
    description: 'New email adddress',
  })
  @IsString()
  new_password!: string;

  @ApiProperty({ description: 'User password', format: 'password' })
  @IsString()
  password!: string;
}
