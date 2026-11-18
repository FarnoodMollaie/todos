import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service.js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async register(body: { email: string; password: string }) {
    const { email, password } = body;
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await this.usersService.create(email, passwordHash);

    return {
      id: user._id.toString(),
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
    const token = await this.jwtService.signAsync({
      sub: user._id.toString(),
      email: user.email,
    });
    return { access_token: token };
  }
}
