import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AnonymousStrategy } from './strategies/anonymous.strategy';

@Module({
  imports: [JwtModule.register({}), ConfigModule, PassportModule],
  providers: [AuthService, JwtStrategy, AnonymousStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
