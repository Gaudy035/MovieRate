import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  username!: string;

  @IsEmail({}, { message: 'Enter a a valid email' })
  email!: string;

  @IsString()
  @MinLength(8, { message: 'password must be at least 8 characters' })
  password!: string;
}
