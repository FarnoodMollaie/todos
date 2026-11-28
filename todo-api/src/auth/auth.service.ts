import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service.js';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { createHash, randomUUID } from 'node:crypto';

function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateTokens(userId: string, email: string) {
    const accessToken = await this.jwtService.signAsync(
      {
        sub: userId,
        email,
        type: 'access',
      },
      {
        expiresIn: '15m',
      },
    );

    const refreshToken = await this.jwtService.signAsync(
      {
        sub: userId,
        type: 'refresh',
        jti: randomUUID(),
      },
      {
        secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      },
    );

    return { accessToken, refreshToken };
  }

  async register(body: { email: string; password: string }) {
    const { email, password } = body;
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await this.usersService.create(email, passwordHash);

    return {
      isSuccess: true,
      email: user.email,
    };
  }
  async login(body: { email: string; password: string }) {
    const { email, password } = body;
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const matches = await bcrypt.compare(password, user.passwordHash);
    if (!matches) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const userId = user._id.toString();

    const tokens = await this.generateTokens(userId, user.email);

    await this.usersService.saveRefreshTokenHash(
      userId,
      hashToken(tokens.refreshToken),
    );

    return tokens;
  }
  async refresh(refreshToken: string) {
    let payload: { sub: string; type: string };

    try {
      payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (payload.type !== 'refresh' || typeof payload.sub !== 'string') {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.usersService.findById(payload.sub);

    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const tokens = await this.generateTokens(user._id.toString(), user.email);

    const updatedUser = await this.usersService.rotateRefreshTokenHash(
      user._id.toString(),
      hashToken(refreshToken),
      hashToken(tokens.refreshToken),
    );

    if (!updatedUser) {
      throw new UnauthorizedException('Refresh token expired or revoked');
    }

    return tokens;
  }
  async getMe(userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User no longer exists');
    }

    return {
      id: user._id.toString(),
      email: user.email,
    };
  }
  async logout(refreshToken?: string) {
    if (!refreshToken) return;

    let payload: { sub: string; type: string };

    try {
      payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
      });
    } catch {
      return;
    }

    if (payload.type !== 'refresh' || typeof payload.sub !== 'string') {
      return;
    }

    await this.usersService.revokeRefreshTokenHash(
      payload.sub,
      hashToken(refreshToken),
    );
  }
}
