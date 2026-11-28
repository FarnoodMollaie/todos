import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import type { Request, Response } from 'express';
import { clearAuthCookies, setAuthCookies } from './utils/auth-cookies.js';
import { CurrentUser } from './decorators/current-user.decorator.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser('sub') userId: string) {
    return this.authService.getMe(userId);
  }
  @Post('register')
  register(@Body() body: { email: string; password: string }) {
    return this.authService.register(body);
  }
  @Post('login')
  @HttpCode(200)
  async login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authService.login(body);

    setAuthCookies(response, tokens);

    return { message: 'Logged in successfully' };
  }
  @Post('refresh')
  @HttpCode(200)
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    // 1. Extract refresh cookie
    const refresh_token = request.cookies?.refresh_token;
    // 2. Check if it exists
    if (!refresh_token) {
      throw new UnauthorizedException('Invalid Request!');
    }
    // 3. Call AuthService.refresh()
    const tokens = await this.authService.refresh(refresh_token);
    // 4. Set new cookies
    setAuthCookies(response, tokens);
    // 5. Return success message
    return { message: 'Tokens refreshed successfully' };
  }
  @Post('logout')
  @HttpCode(200)
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies?.refresh_token;

    await this.authService.logout(refreshToken);

    clearAuthCookies(response);

    return { message: 'Logout successful' };
  }
}
