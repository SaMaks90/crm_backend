import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  HttpCode,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from './interfaces/user';
import { CreateUserDto, UpdateUserDto } from './dto';

@Controller('users')
export class UsersControllers {
  constructor(private UsersService: UsersService) {}

  @Get()
  @HttpCode(200)
  async findByEmail(@Query('email') email): Promise<IUser | null> {
    return this.UsersService.findUserByEmail(email);
  }

  @Post()
  @HttpCode(204)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    const user = { ...createUserDto, id: '2222', isVerification: false };
    this.UsersService.createUser(user);
  }

  @Put()
  @HttpCode(200)
  async updateUser(
    @Query('email') email: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<IUser> {
    return this.UsersService.updateUser(email, updateUserDto);
  }

  @Delete()
  @HttpCode(204)
  async deleteUser(@Query('email') email: string): Promise<void> {
    this.UsersService.deleteUser(email);
  }
}
