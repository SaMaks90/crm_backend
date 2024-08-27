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
  Req,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { Public } from '../common/decorator/public.decorator';
import { Request } from 'express';
import { IUser, IUserReturn } from './user.type';
import { excludeKeyInObject } from '../common/utils/exclude-key-in-object';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(@Req() req: Request): Promise<IUserReturn | any | null> {
    try {
      const userId = req['user'].sub;
      const user = await this.userService.getUser({ id: userId });
      return excludeKeyInObject(user, ['token', 'password']);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Public()
  @Post()
  async createUser(@Body() data: UserModel): Promise<IUserReturn | any> {
    try {
      const user = await this.userService.getUser({ email: data.email });

      if (user) {
        throw new HttpException(
          'This user was created.',
          HttpStatus.BAD_REQUEST,
        );
      }
      const newUser = await this.userService.createUser(data);
      return excludeKeyInObject(newUser, ['token', 'password']);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete()
  async deleteUser(@Req() req: Request): Promise<IUserReturn | any> {
    try {
      const userId = req['user'].sub;
      const user = await this.userService.deleteUser({ id: userId });
      return excludeKeyInObject(user, ['token', 'password']);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put()
  async updateUser(
    @Body() data: UserModel,
    @Req() req: Request,
  ): Promise<IUserReturn | any> {
    try {
      const userId = req['user'].sub;
      const user = await this.userService.updateUser({
        where: { id: userId },
        data: data,
      });

      return excludeKeyInObject(user, ['token', 'password']);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
