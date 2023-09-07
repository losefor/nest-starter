import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { PrismaModule } from './prisma/prisma.module';
import { UploadsModule } from './uploads/uploads.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { CaslModule } from './casl/casl.module';
import { UsersModule } from './users/users.module';
import { PermissionsModule } from './permissions/permissions.module';
import { LoggerModule } from 'nestjs-pino';
import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n';
import * as path from 'path';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      typesOutputPath: path.join(
        __dirname,
        '../src/common/generated/i18n.generated.ts',
      ),
      resolvers: [AcceptLanguageResolver],
    }),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty' }
            : undefined,
      },
    }),
    ConfigModule.forRoot(),
    AuthModule,
    PrismaModule,
    CommonModule,
    UploadsModule,
    CaslModule,
    UsersModule,
    PermissionsModule,
  ],
})
export class AppModule {}
