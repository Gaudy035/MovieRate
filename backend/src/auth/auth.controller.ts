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
  async register(
    @Body() createUserDto: CreateUserDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.register(createUserDto);
    this.setCookie(res, result.access_token);
    return { message: 'User registered successfully' };
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'User logged in' })
  @ApiUnauthorizedResponse({ description: 'Invalid email or password' })
  async login(
    @Body() loginDto: LoginDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(loginDto);
    this.setCookie(res, result.access_token);
    return { message: 'User logged in successfully' };
  }

  @Post('logout')
  @ApiOperation({ summary: 'User logout' })
  @ApiResponse({ status: 200, description: 'User logged out' })
  async logout(@Res({ passthrough: true }) res: Response) {
    res.cookie('access_token', '', {
      httpOnly: true,
      expires: new Date(0),
      path: '/',
    });
    return { message: 'User logged out successfully' };
  }

  private setCookie(res: Response, token: string) {
    res.cookie('access_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    });
  }
}
