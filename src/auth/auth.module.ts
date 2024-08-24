import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';
import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, UserService, PrismaService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
