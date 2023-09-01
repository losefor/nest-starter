import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { PrismaModule } from './prisma/prisma.module';
import { WinstonModule } from 'nest-winston';

@Module({
  imports: [
    WinstonModule.forRoot({}),
    ConfigModule.forRoot(),
    AuthModule,
    PrismaModule,
    CommonModule,
  ],
})
export class AppModule {}
