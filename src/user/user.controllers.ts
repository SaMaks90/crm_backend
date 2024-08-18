import {
  Body,
  Controller,
  Get,
  Query,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(@Query('email') email: string): Promise<UserModel | null> {
    return this.userService.getUser({ email });
  }

  @Post()
  async createUser(@Body() data: UserModel): Promise<UserModel> {
    return this.userService.createUser(data);
  }

  @Delete()
  async deleteUser(@Query('email') email: string): Promise<UserModel> {
    return this.userService.deleteUser({ email });
  }

  @Put()
  async updateUser(
    @Query('email') email: string,
    @Body() data: UserModel,
  ): Promise<UserModel> {
    return this.userService.updateUser({ where: { email }, data: data });
  }
}
