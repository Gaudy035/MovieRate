import { IsEmail, IsString } from 'class-validator';

export class LoginDTO {
  @IsEmail({}, { message: 'Enter a valid email' })
  email!: string;

  @IsString()
  password!: string;
}
