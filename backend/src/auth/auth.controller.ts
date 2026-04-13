import {
  ApiResponse,
  ApiTags,
  ApiOperation,
  ApiConflictResponse,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  Controller,
  Post,
  Patch,
  Body,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { LoginDTO } from '../users/dtos/login.dto';
import { CreateUserDTO } from '../users/dtos/create-user.dto';
import { AuthService } from './auth.service';
import type { Response } from 'express';
import { AuthGuard } from './auth.guard';
import { EmailChangeDTO } from '../users/dtos/email-change.dto';
import { PasswordChangeDTO } from '../users/dtos/password-change.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private clearCookie(res: Response) {
    res.cookie('access_token', '', {
      httpOnly: true,
      expires: new Date(0),
      path: '/',
    });
  }

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
    this.clearCookie(res);
    return { message: 'User logged out successfully' };
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch('change-email')
  @ApiOperation({ summary: 'User email change' })
  @ApiResponse({ status: 200, description: 'Email changed successfully' })
  @ApiUnauthorizedResponse({ description: 'Incorrect password' })
  @ApiConflictResponse({ description: 'Email is already taken' })
  async changeEmail(
    @Req() req: any,
    @Body() emailChangeDTO: EmailChangeDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userId = req.user.sub;
    await this.authService.changeEmail(userId, emailChangeDTO);
    this.clearCookie(res);
    return { message: 'Email changed successfully' };
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch('change-password')
  @ApiOperation({ summary: 'User password change' })
  @ApiResponse({ status: 200, description: 'Password changed successfully' })
  @ApiUnauthorizedResponse({ description: 'Incorrect password' })
  async changePassword(
    @Req() req: any,
    @Body() passwordChangeDTO: PasswordChangeDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userId = req.user.sub;
    await this.authService.changePassword(userId, passwordChangeDTO);
    this.clearCookie(res);
    return { message: 'Password changed successfully' };
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
