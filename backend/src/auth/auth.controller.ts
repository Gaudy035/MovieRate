import {
  ApiResponse,
  ApiTags,
  ApiOperation,
  ApiConflictResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Controller, Post, Body, Res } from '@nestjs/common';
import { LoginDTO } from '../users/dtos/login.dto';
import { CreateUserDTO } from '../users/dtos/create-user.dto';
import { AuthService } from './auth.service';
import type { Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registers new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiConflictResponse({ description: 'Email or username is already taken' })
  register(
    @Body() createUserDto: CreateUserDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'User logged in' })
  @ApiUnauthorizedResponse({ description: 'Invalid email or password' })
  login(@Body() loginDto: LoginDTO, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(loginDto);
  }

  private setCookie(res: Response, token: string) {
    res.cookie('access_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24,
    });
  }
}
