import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersControllers } from './users.controllers';

@Module({
  controllers: [UsersControllers],
  providers: [UsersService],
})
export class UsersModule {}
