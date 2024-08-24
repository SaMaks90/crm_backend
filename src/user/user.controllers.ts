import {
  Body,
  Controller,
  Get,
  Query,
  Post,
  Delete,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { Public } from '../common/decorator/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Get()
  async getUser(@Query('email') email: string): Promise<UserModel | null> {
    try {
      return this.userService.getUser({ email });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Public()
  @Post()
  async createUser(@Body() data: UserModel): Promise<UserModel> {
    try {
      const user = await this.userService.getUser({ email: data.email });

      if (user) {
        throw new HttpException(
          'This user was created.',
          HttpStatus.BAD_REQUEST,
        );
      }

      return this.userService.createUser(data);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete()
  async deleteUser(@Query('email') email: string): Promise<UserModel> {
    try {
      return this.userService.deleteUser({ email });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put()
  async updateUser(
    @Query('email') email: string,
    @Body() data: UserModel,
  ): Promise<UserModel> {
    try {
      return this.userService.updateUser({ where: { email }, data: data });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
