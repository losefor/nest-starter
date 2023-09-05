import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async login(data: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: data.username,
      },
    });

    if (!user) {
      throw new ForbiddenException('Access Denied');
    }

    const passwordMatches = await bcrypt.compare(data.password, user.password);
    if (!passwordMatches) {
      throw new ForbiddenException('Access Denied');
    }

    delete user.password;
    return {
      tokens: await this.getTokens(user),
      user,
    };
  }

  async getTokens(user: User) {
    const jwtPayload = {
      id: user.id,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('ACCESS_TOKEN_SECRET'),
        expiresIn: '1d',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('REFRESH_TOKEN_SECRET'),
        expiresIn: '1d',
      }),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }
}
