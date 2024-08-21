import { Module } from '@nestjs/common';
import { Logging } from './common/providers/logging/logging';
// import { ModelsModule } from './common/models/models.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from '@common/interceptors/logging/logging.interceptor';
import { TransformInterceptor } from '@common/interceptors/transform/transform.interceptor';
import { AllExceptionFilter } from '@common/exceptions/customExceptionFilter';
import { ApiModule } from './modules/api.module';
import { UserModule } from '@modules/user/user.module';
import { Caching } from './common/providers/caching/caching';
import { CachingModule } from './common/providers/caching/caching.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ModelsModule } from '@common/models/models.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ModelsModule,
    UserModule,
    ApiModule,
    CachingModule,
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        requireTLS: true,
        secure: false,
        auth: {
          user: process.env.EMAIL_ACCOUNT,
          pass: process.env.EMAIL_PASSWORD,
        },
        logger: true,
      },
      template: {
        dir: join(__dirname, './shared/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],

  providers: [
    Logging,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    Caching,
  ],
})
export class AppModule {}
