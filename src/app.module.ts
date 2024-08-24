import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './common/guard/auth.guard';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'user', method: RequestMethod.ALL });
  }
}
