import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { hashing } from '../common/utils/hashing-data';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private logger = new Logger('User service');

  async getUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
    return user;
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const hashPassword: string = await hashing(data.password);
    const user = { ...data, password: hashPassword };
    return await this.prisma.user.create({
      data: user,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    return await this.prisma.user.update({
      where: params.where,
      data: params.data,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return await this.prisma.user.delete({
      where,
    });
  }
}
