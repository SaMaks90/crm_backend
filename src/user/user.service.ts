import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { hashing } from '../common/utils/hashing-data';
import { IUser } from './user.type';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<IUser | null> {
    const user: IUser = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
    return user;
  }

  async createUser(data: Prisma.UserCreateInput): Promise<IUser> {
    const hashPassword: string = await hashing(data.password);
    const user = { ...data, password: hashPassword };
    return await this.prisma.user.create({
      data: user,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<IUser> {
    return await this.prisma.user.update({
      where: params.where,
      data: { ...params.data, updated_on: new Date().toISOString() },
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<IUser> {
    return await this.prisma.user.delete({
      where,
    });
  }
}
